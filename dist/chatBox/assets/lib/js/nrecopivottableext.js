// 
// NReco PivotTable Extensions
// Author: Vitaliy Fedorchenko
// 
// Copyright (c) nrecosite.com - All Rights Reserved
// THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY 
// KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
// PARTICULAR PURPOSE.
//
(function () {
	var $;

	$ = jQuery;

	var applyDrillDownHandler = function (wrapper, pvtData, tElem) {
		if (typeof wrapper.options.drillDownHandler != "function")
			return;
		$(tElem).addClass('pvtValDrillDown').on("click", "td.pvtVal,td.pvtTotal", function () {
			var cssClasses = $(this).attr('class').split(' ');
			var colIdx = -1, rowIdx = -1;
			if ($.inArray("pvtVal", cssClasses) >= 0) {
				$.each(cssClasses, function () {
					if (this.indexOf('row') == 0) rowIdx = parseInt(this.substring(3));
					if (this.indexOf('col') == 0) colIdx = parseInt(this.substring(3));
				});
			}
			if ($.inArray("rowTotal", cssClasses) >= 0) {
				var dataFor = $(this).attr('data-for');
				rowIdx = parseInt(dataFor.substring(3));
			}
			if ($.inArray("colTotal", cssClasses) >= 0) {
				var dataFor = $(this).attr('data-for');
				colIdx = parseInt(dataFor.substring(3));
			}
			var dataFilter = {};
			if (colIdx >= 0) {
				for (var cAttrIdx = 0; cAttrIdx < pvtData.colAttrs.length; cAttrIdx++) {
					var colKeys = pvtData.getColKeys();
					var cValues = colKeys[colIdx];
					dataFilter[pvtData.colAttrs[cAttrIdx]] = cValues[cAttrIdx];
				}
			}
			if (rowIdx >= 0) {
				for (var rAttrIdx = 0; rAttrIdx < pvtData.rowAttrs.length; rAttrIdx++) {
					var rowKeys = pvtData.getRowKeys();
					var rValues = rowKeys[rowIdx];
					dataFilter[pvtData.rowAttrs[rAttrIdx]] = rValues[rAttrIdx];
				}
			}
			wrapper.options.drillDownHandler(dataFilter);
		});
	};

	var sortDataByCol = function (pvtData, sortByColIdx, ascDesc) {
		var sortRowVals = [];
		var rowKey, colKey, aggregator, i;

		pvtData.sorted = false; // flush row/col order
		var rowKeys = pvtData.getRowKeys();
		var colKeys = pvtData.getColKeys();

		for (i in rowKeys) {
			rowKey = rowKeys[i];
			colKey = sortByColIdx != null ? colKeys[sortByColIdx] : [];
			aggregator = pvtData.getAggregator(rowKey, colKey);
			sortRowVals.push({ val: aggregator.value(), key: rowKey });
		}
		sortRowVals.sort(function (a, b) {
			return ascDesc * $.pivotUtilities.naturalSort(a.val, b.val);
		});
		pvtData.rowKeys = [];
		for (i = 0; i < sortRowVals.length; i++)
			pvtData.rowKeys.push(sortRowVals[i].key);
		pvtData.sorted = true;
	};

	var sortDataByRow = function (pvtData, sortByRowIdx, ascDesc) {
		var sortColVals = [];
		var rowKey, colKey, aggregator, i;

		pvtData.sorted = false; // flush row/col order
		var rowKeys = pvtData.getRowKeys();
		var colKeys = pvtData.getColKeys();

		for (i in colKeys) {
			colKey = colKeys[i];
			rowKey = sortByRowIdx != null ? rowKeys[sortByRowIdx] : [];
			aggregator = pvtData.getAggregator(rowKey, colKey);
			sortColVals.push({ val: aggregator.value(), key: colKey });
		}
		sortColVals.sort(function (a, b) {
			return ascDesc * $.pivotUtilities.naturalSort(a.val, b.val);
		});
		pvtData.colKeys = [];
		for (i = 0; i < sortColVals.length; i++)
			pvtData.colKeys.push(sortColVals[i].key);
		pvtData.sorted = true;
	};

	var applySortHandler = function (wrapper, pvtData, opts, tElem, refreshTable) {
		var applyAscDescClass = function ($elem, direction) {
			$elem.addClass(direction == "desc" ? "pvtSortDesc" : "pvtSortAsc");
		};
		var applySort = function (keys, labels, optSortKey, doSort) {
			labels.click(function () {
				var $lbl = $(this);
				var keyIdx = $lbl.data('key_index');
				var key = keys[keyIdx];

				if ($lbl.hasClass("pvtSortAsc")) {
					doSort(pvtData, keyIdx, -1);
					opts.sort = {direction: "desc"};
					opts.sort[optSortKey] = key;
				} else if ($lbl.hasClass("pvtSortDesc")) {
					pvtData.sorted = false;
					opts.sort = null;
				} else {
					doSort(pvtData, keyIdx, 1);
					opts.sort = {direction: "asc"};
					opts.sort[optSortKey] = key;
				}
				refreshTable();
			}).each(function () {
				if (opts.sort && opts.sort[optSortKey]) {
					var $lbl = $(this);
					var key = keys[$lbl.data('key_index')];
					if (key.join('_') == opts.sort[optSortKey].join('_')) {
						applyAscDescClass($lbl, opts.sort.direction);
					}
				}
			});
		};
		var markSortableLabels = function (keys, $labels) {
			var i = 0;
			$labels.each(function () {
				var $lbl = $(this);
				var lblText = $.trim( $lbl.text() );
				var k = keys[i];
				if (k!=null && k.length>0 && k[k.length - 1] == lblText) {
					$lbl.addClass("pvtSortable").data('key_index', i);
					i++;
					return;
				}
			});
		};
		if (wrapper.options.sortByColumnsEnabled) {
			var colKeys = pvtData.getColKeys();
			markSortableLabels(colKeys, $(tElem).find('.pvtColLabel[colspan="1"]'));
			applySort(colKeys, $(tElem).find('.pvtColLabel.pvtSortable[colspan="1"]'), "column_key", sortDataByCol);
		}

		if (wrapper.options.sortByRowsEnabled) {
			var rowKeys = pvtData.getRowKeys();
			markSortableLabels(rowKeys, $(tElem).find('.pvtRowLabel[rowspan="1"]'));
			applySort(rowKeys, $(tElem).find('.pvtRowLabel.pvtSortable[rowspan="1"]'), "row_key", sortDataByRow);
		}

		// sort by label
		if (wrapper.options.sortByLabelEnabled) {
			$(tElem).find('.pvtAxisLabel').each(function () {
				var $axisLbl = $(this);
				var axisName = $.trim($axisLbl.text());
				var isColAxis = $axisLbl.parent().find('.pvtColLabel').length > 0;
				$axisLbl.data('axis_name', axisName);
				$axisLbl.addClass(isColAxis ? "pvtSortableCol" : "pvtSortableRow");
				if (!opts.sort
					|| (isColAxis && (!opts.sort.row_key && !opts.sort.row_totals))
					|| (!isColAxis && (!opts.sort.column_key && !opts.sort.col_totals))) {
					applyAscDescClass($axisLbl, opts.sort && opts.sort.labels && opts.sort.labels[axisName] == "desc" ? "desc" : "asc");
				}
			}).click(function () {
				var $axisLbl = $(this);
				var axisName = $axisLbl.data('axis_name');
				var isColAxis = $axisLbl.hasClass('pvtSortableCol');
				if (!opts.sort)
					opts.sort = {};
				if (!opts.sort.labels)
					opts.sort.labels = {};
				if ($axisLbl.hasClass("pvtSortAsc")) {
					//doSort(pvtData, keyIdx, -1);
					opts.sort.labels[axisName] = "desc";
				} else {
					opts.sort.labels[axisName] = "asc";
				}
				pvtData.sorted = false;
				// reset by val
				if (isColAxis) {
					opts.sort.row_key = null;
					opts.sort.row_totals = false;
				} else {
					opts.sort.column_key = null;
					opts.sort.col_totals = false;
				}
				refreshTable();
			});
		}

		$(tElem).find('tr:last .pvtTotalLabel').addClass("pvtTotalColSortable").click(function () {
			var $lbl = $(this);
			if ($lbl.hasClass("pvtSortAsc")) {
				sortDataByRow(pvtData, null, -1);
				opts.sort = { direction: "desc", row_totals: true };
			} else if ($lbl.hasClass("pvtSortDesc")) {
				pvtData.sorted = false;
				opts.sort = null;
			} else {
				sortDataByRow(pvtData, null, 1);
				opts.sort = { direction: "asc", row_totals: true };
			}
			refreshTable();
		}).each(function () {
			var $lbl = $(this);
			if (opts.sort && opts.sort.row_totals) {
				applyAscDescClass($lbl, opts.sort.direction);
			}
		});

		$(tElem).find('tr:first .pvtTotalLabel').addClass("pvtTotalRowSortable").click(function () {
			var $lbl = $(this);
			if ($lbl.hasClass("pvtSortAsc")) {
				sortDataByCol(pvtData, null, -1);
				opts.sort = { direction: "desc", col_totals: true };
			} else if ($lbl.hasClass("pvtSortDesc")) {
				pvtData.sorted = false;
				opts.sort = null;
			} else {
				sortDataByCol(pvtData, null, 1);
				opts.sort = { direction: "asc", col_totals: true };
			}
			refreshTable();
		}).each(function () {
			var $lbl = $(this);
			if (opts.sort && opts.sort.col_totals) {
				applyAscDescClass($lbl, opts.sort.direction);
			}
		});

	};
	var preparePivotData = function (pvtData) {
		var i, j, aggregator;
		var colKeys = pvtData.getColKeys();
		var rowKeys = pvtData.getRowKeys();
		var data = [];
		var totalsRow = [];
		var totalsCol = [];
		for (i in rowKeys) {
			data[i] = [];
			for (j in colKeys) {
				aggregator = pvtData.getAggregator(rowKeys[i], colKeys[j]);
				data[i][j] = aggregator.value();
			}
			totalsCol[i] = pvtData.getAggregator(rowKeys[i], []).value();
		}
		for (j in colKeys) {
			totalsRow[j] = pvtData.getAggregator([], colKeys[j]).value();
		}
		var grandTotalAggregator = pvtData.getAggregator([], []);
		return {
			columnKeys: colKeys,
			columnAttrs : pvtData.colAttrs,
			rowKeys: rowKeys,
			rowAttrs : pvtData.rowAttrs, 
			matrix: data,
			totals: { row: totalsRow, column : totalsCol, grandTotal : grandTotalAggregator.value() }
		};
	};

	window.NRecoPivotTableExtensions = function (options) {
		this.options = $.extend({},NRecoPivotTableExtensions.defaults, options);
	};

	window.NRecoPivotTableExtensions.prototype.sortDataByOpts = function (pvtData, opts) {
		// apply label sort direction modifiers
		if (!pvtData.__origSorters) {
			pvtData.__origSorters = pvtData.sorters;
			pvtData.sorters = function (attr) {
				var comparer = null;
				if ($.isFunction(pvtData.__origSorters)) {
					comparer = pvtData.__origSorters(attr);
				} else if (pvtData.__origSorters != null && pvtData.__origSorters[attr]!=null) {
					comparer = pvtData.__origSorters[attr];
				}
				if (!comparer)
					comparer = $.pivotUtilities.naturalSort;
				if (opts && opts.sort && opts.sort.labels && opts.sort.labels[attr] == "desc") {
					return function (a, b) {
						return -comparer(a, b);
					};
				}
				return comparer;
			};
		}

		pvtData.sorted = false;
		if (opts && opts.sort) {
			// sort by value
			var ascDesc = opts.sort.direction == "desc" ? -1 : 1;
			if (opts.sort.column_key) {
				var colKeys = pvtData.getColKeys();
				var sortByKeyStr = opts.sort.column_key.join('_');
				for (var i in colKeys)
					if (sortByKeyStr == colKeys[i].join('_')) {
						sortDataByCol(pvtData, i, ascDesc);
					}
			} else if (opts.sort.row_key) {
				var rowKeys = pvtData.getRowKeys();
				var sortByKeyStr = opts.sort.row_key.join('_');
				for (var i in rowKeys)
					if (sortByKeyStr == rowKeys[i].join('_')) {
						sortDataByRow(pvtData, i, ascDesc);
					}
			} else if (opts.sort.row_totals) {
				sortDataByRow(pvtData, null, ascDesc);
			} else if (opts.sort.col_totals) {
				sortDataByCol(pvtData, null, ascDesc);
			}
		}
	};

	window.NRecoPivotTableExtensions.prototype.wrapTableRenderer = function (tableRenderer) {
		var wrapper = this;
		return function (pvtData, opts) {
			var tElem, refreshTable, wrapTable;

			wrapper.sortDataByOpts(pvtData, opts);
			tElem = tableRenderer(pvtData, opts);
			wrapTable = function ($t) {
				if (wrapper.options.wrapWith) {
					var $w = $(wrapper.options.wrapWith);
					$w.append($t);
					$t = $w;
				}
				return $t;
			};

			refreshTable = function () {
				var newTbl = tableRenderer(pvtData, opts);
				applyDrillDownHandler(wrapper,pvtData,newTbl);
				applySortHandler(wrapper, pvtData, opts, newTbl, refreshTable);
				$(tElem).replaceWith(newTbl);
				tElem = newTbl;
				if (wrapper.options.fixedHeaders)
					wrapper.initFixedHeaders( $(tElem), true);
				if (typeof wrapper.options.onSortHandler == 'function')
					wrapper.options.onSortHandler(opts.sort ? opts.sort : {});
			};
			applyDrillDownHandler(wrapper, pvtData, tElem);
			applySortHandler(wrapper, pvtData, opts, tElem, refreshTable);
			return wrapTable(tElem);
		};
	};

	window.NRecoPivotTableExtensions.prototype.initFixedHeaders = function ($t, isWrapped) {
		if ($t.length == 0)
			return;
		var wrapper = this;
		var $scrollDiv = isWrapped ? $t.closest('.pvtFixedHeaderOuterContainer') : $t.parent();
		$scrollDiv.addClass("pvtFixedHeaderOuterContainer");

		var fixedHeaders = [];
		var fixedByTop = [];
		var fixedByLeft = [];

		var rowDimElems = [];
		var colDimElems = [];
		var thNodes = $t[0].getElementsByTagName('TH');
		for (var i = 0; i < thNodes.length; i++) {
			var th = thNodes[i];

			var isColDimLabel = th.className.indexOf('pvtSortableCol') >= 0;
			var isRowDimLabel = th.className.indexOf('pvtSortableRow') >= 0;
			var isPvtColumn = th.className.indexOf('pvtColLabel') >= 0 || th.className.indexOf('pvtTotalRowSortable')>=0;
			var isPvtRow = th.className.indexOf('pvtRowLabel') >= 0 || th.className.indexOf('pvtTotalColSortable') >= 0;

			var hdr = {
				th: th,
				width: th.clientWidth,
				height: th.clientHeight,
				isCol: isPvtColumn,
				isRow: isPvtRow
			};

			if (!isPvtColumn)
				hdr.left = 1;
			if (!isPvtRow) {
				hdr.top = 1;
			}

			fixedHeaders.push(hdr);
			if (isRowDimLabel) {
				rowDimElems.push(th);
			}
			if (isColDimLabel) {
				colDimElems.push(th);
			}
		}

		$t.addClass('pvtFixedHeader');

		for (var i = 0; i < fixedHeaders.length; i++) {
			var entry = fixedHeaders[i];
			var th = entry.th;
			var thHeight = entry.height;
			th.style.height = thHeight + "px";

			var wrapDiv = document.createElement('div');
			if (entry.isCol || entry.isRow)
				wrapDiv.setAttribute('title', th.textContent);
			wrapDiv.className = 'pvtFixedHeader';
			wrapDiv.style.height = (thHeight) + "px";
			if (th.childNodes.length > 0) {
				while (th.childNodes.length > 0)
					wrapDiv.appendChild(th.childNodes[0]);
			} else {
				wrapDiv.textContent = th.textContent;
			}
			th.appendChild(wrapDiv);

			if (entry.top != null)
				fixedByTop.push({
					el: wrapDiv,
					top: entry.top,
					lastTop: entry.top,
					offsetLeft: entry.isCol ? -1 : null,
					width: entry.width
				});
			if (entry.left != null)
				fixedByLeft.push({
					el: wrapDiv,
					left: entry.left,
					lastLeft: entry.left,
					offsetTop: entry.isRow ? -1 : null,
					height: entry.height
				});

		}

		// lock table width
		var tWidth = $t.outerWidth();
		var tHeight = $t.outerHeight();
		$t.width( $t.width() );
		// wrap with container div
		var containerDiv = null;
		if (isWrapped) {
			var $containerDiv = $t.parent();
			containerDiv = $containerDiv[0];
			containerDiv.style.height = tHeight + "px";
			containerDiv.style.width = tWidth + "px";
			$containerDiv.find('.pvtFixedHeaderPanel').remove();
		} else {
			var containerDiv = document.createElement("div");
			containerDiv.style.overflow = "hidden";
			containerDiv.appendChild($t[0]);
			$scrollDiv[0].appendChild(containerDiv);
			containerDiv.style.height = tHeight + "px";
			containerDiv.style.width = tWidth + "px";
		}

		// calc row headers width and column headers height
		var colHdrHeight = 0;
		var colHdrWidth = 0;
		var rowHdrWidth = 0;
		var rowHdrHeight = 0;
		for (var i = 0; i < colDimElems.length; i++) {
			var th = colDimElems[i];
			colHdrHeight += th.clientHeight + 1;
			colHdrWidth = th.clientWidth + 1;
		}
		for (var i = 0; i < rowDimElems.length; i++) {
			var th = rowDimElems[i];
			rowHdrHeight = th.clientHeight + 1;// thHeight;
			rowHdrWidth += th.clientWidth + 1;// th.clientWidth;
		}
		if (colDimElems.length == 0 && rowDimElems.length == 0) {
			var totalTH = $t.find('tr:first th.pvtTotalLabel:first');
			if (totalTH.length > 0) {
				rowHdrWidth = totalTH[0].clientWidth;
			}
		}
		colHdrHeight += rowHdrHeight;
		rowHdrWidth += colHdrWidth;

		// build bg panels
		if (fixedHeaders.length > 0) {

			containerDiv.style.height = (tHeight ) + "px";

			var rowHdrPanel = document.createElement('div');
			rowHdrPanel.className = 'pvtFixedHeaderPanel pvtLeftFixedHeaderPanel';
			rowHdrPanel.style.height = tHeight + "px";
			rowHdrPanel.style.width = (rowHdrWidth+1) + "px";
			rowHdrPanel.style.top = "-" + tHeight + "px";
			containerDiv.appendChild(rowHdrPanel);

			var colHdrPanel = document.createElement('div');
			colHdrPanel.className = 'pvtFixedHeaderPanel pvtTopFixedHeaderPanel';
			colHdrPanel.style.width = tWidth + "px";
			colHdrPanel.style.height = (colHdrHeight+1) + "px";
			colHdrPanel.style.top = "-" + (tHeight * 2) + "px";
			containerDiv.appendChild(colHdrPanel);

			var topLeftHdrPanel = document.createElement('div');
			var topLeftHdrPanelTop = -(tHeight * 2 + (colHdrHeight + 1));
			topLeftHdrPanel.className = 'pvtFixedHeaderPanel pvtTopLeftFixedHeaderPanel';
			topLeftHdrPanel.style.width = (rowHdrWidth + 1) + "px";
			topLeftHdrPanel.style.height = (colHdrHeight + 1) + "px";
			topLeftHdrPanel.style.top = topLeftHdrPanelTop + "px";

			containerDiv.appendChild(topLeftHdrPanel);

			fixedByLeft.push({ el: rowHdrPanel, left: 0, lastLeft: 0 });

			fixedByTop.push({ el: colHdrPanel, top: -tHeight * 2, lastTop: -tHeight * 2 });

			fixedByLeft.push({ el: topLeftHdrPanel, left: 0, lastLeft: 0 });
			fixedByTop.push({ el: topLeftHdrPanel, top: topLeftHdrPanelTop, lastTop: topLeftHdrPanelTop });

		}

		var refreshHeaders = function (top, left, width, height) {
			var newPos;
			var entry;
			var checkOffset;
			var refreshPos;
			var bottom = top + height;
			var right = left + width;
			for (var i = 0; i < fixedByLeft.length; i++) {
				entry = fixedByLeft[i];
				checkOffset = entry.offsetTop != null;
				refreshPos = !checkOffset;
				if (checkOffset) {
					if (entry.offsetTop < 0)
						entry.offsetTop = entry.el.offsetTop;
					refreshPos = ((entry.offsetTop + entry.height) >= top) && entry.offsetTop <= bottom;
				}
				if (refreshPos) {
					newPos = (left + entry.left);
					if (newPos != entry.lastLeft) {
						entry.lastLeft = newPos;
						entry.el.style.left = newPos + "px";
					}
				}
			}

			for (var i = 0; i < fixedByTop.length; i++) {
				entry = fixedByTop[i];
				checkOffset = entry.offsetLeft != null;
				refreshPos = !checkOffset;
				if (checkOffset) {
					if (entry.offsetLeft < 0)
						entry.offsetLeft = entry.el.offsetLeft;
					refreshPos = ((entry.offsetLeft + entry.width) >= left) && entry.offsetLeft <= right;
				}
				if (refreshPos) {
					newPos = (top + entry.top);
					if (newPos != entry.lastTop) {
						entry.lastTop = newPos;
						entry.el.style.top = newPos + "px";
					}
				}
			}

		};

		var prevTop = -1;
		var prevLeft = -1;
		var scrollElem = $scrollDiv[0];
		var timeout = null;
		var containerWidth = $scrollDiv.outerWidth();
		var containerHeight = $scrollDiv.outerHeight();

		$scrollDiv.on("scroll", function (evt) {
			var top = scrollElem.scrollTop;
			var left = scrollElem.scrollLeft;
			if (top != prevTop || left!=prevLeft) {
				prevTop = top;
				prevLeft = left;
				refreshHeaders(top, left, containerWidth, containerHeight);
			}
		});
		$scrollDiv.scroll();
	};

	window.NRecoPivotTableExtensions.prototype.wrapPivotExportRenderer = function (renderer) {
		var wrapper = this;
		return function (pvtData, opts) {
			wrapper.sortDataByOpts(pvtData, opts);
			var elem = renderer(pvtData, opts);
			$(elem).addClass("pivotExportData").data("getPivotExportData", function () { return preparePivotData(pvtData); });
			return elem;
		};
	};

	window.NRecoPivotTableExtensions.defaults = {
		drillDownHandler: null, // function(filterObj) where filterObj like {'dim1', 'value1', 'dim2', 'value2'}
		wrapWith: null, // element for wrapping table
		onSortHandler : function(sortOpts) { }, // called when sort is changed, sortOpts = current state (rendererOptions.sort entry)
		sortByLabelEnabled: true,
		sortByColumnsEnabled: true,
		sortByRowsEnabled: true,
		fixedHeaders : false
	};

}).call(this);