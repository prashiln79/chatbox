"use strict";(self.webpackChunkchatBox=self.webpackChunkchatBox||[]).push([[522],{9445:(y,u,e)=>{e.d(u,{$:()=>w});var c=e(4085),f=e(7122),n=e(4438),p=e(177);const r=[[["","fuseCardFront",""]],[["","fuseCardBack",""]],"*",[["","fuseCardExpansion",""]]],v=["[fuseCardFront]","[fuseCardBack]","*","[fuseCardExpansion]"];function m(s,g){1&s&&(n.qex(0),n.j41(1,"div",1),n.SdG(2),n.k0s(),n.j41(3,"div",2),n.SdG(4,1),n.k0s(),n.bVm())}function h(s,g){1&s&&(n.j41(0,"div",4),n.SdG(1,3),n.k0s()),2&s&&n.Y8G("@expandCollapse",void 0)}function b(s,g){if(1&s&&(n.qex(0),n.SdG(1,2),n.DNE(2,h,2,1,"div",3),n.bVm()),2&s){const t=n.XpG();n.R7$(2),n.Y8G("ngIf",t.expanded)}}let w=(()=>{class s{constructor(){this.expanded=!1,this.face="front",this.flippable=!1}get classList(){return{"fuse-card-expanded":this.expanded,"fuse-card-face-back":this.flippable&&"back"===this.face,"fuse-card-face-front":this.flippable&&"front"===this.face,"fuse-card-flippable":this.flippable}}ngOnChanges(t){"expanded"in t&&(this.expanded=(0,c.he)(t.expanded.currentValue)),"flippable"in t&&(this.flippable=(0,c.he)(t.flippable.currentValue))}static#t=this.\u0275fac=function(d){return new(d||s)};static#n=this.\u0275cmp=n.VBU({type:s,selectors:[["fuse-card"]],hostVars:2,hostBindings:function(d,l){2&d&&n.HbH(l.classList)},inputs:{expanded:"expanded",face:"face",flippable:"flippable"},exportAs:["fuseCard"],features:[n.OA$],ngContentSelectors:v,decls:2,vars:2,consts:[[4,"ngIf"],[1,"fuse-card-front"],[1,"fuse-card-back"],["class","fuse-card-expansion",4,"ngIf"],[1,"fuse-card-expansion"]],template:function(d,l){1&d&&(n.NAR(r),n.DNE(0,m,5,0,"ng-container",0)(1,b,3,1,"ng-container",0)),2&d&&(n.Y8G("ngIf",l.flippable),n.R7$(),n.Y8G("ngIf",!l.flippable))},dependencies:[p.bT],styles:["fuse-card{position:relative;display:flex;overflow:hidden;--tw-bg-opacity: 1;background-color:rgba(var(--fuse-bg-card-rgb),var(--tw-bg-opacity));border-radius:1rem;--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}fuse-card.fuse-card-flippable{border-radius:0;overflow:visible;transform-style:preserve-3d;transition:transform 1s;perspective:600px;background:transparent;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}fuse-card.fuse-card-flippable.fuse-card-face-back .fuse-card-front{visibility:hidden;opacity:0;transform:rotateY(180deg)}fuse-card.fuse-card-flippable.fuse-card-face-back .fuse-card-back{visibility:visible;opacity:1;transform:rotateY(360deg)}fuse-card.fuse-card-flippable .fuse-card-front,fuse-card.fuse-card-flippable .fuse-card-back{display:flex;flex-direction:column;flex:1 1 auto;z-index:10;transition:transform .5s ease-out 0s,visibility 0s ease-in .2s,opacity 0s ease-in .2s;backface-visibility:hidden;--tw-bg-opacity: 1;background-color:rgba(var(--fuse-bg-card-rgb),var(--tw-bg-opacity));border-radius:1rem;--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}fuse-card.fuse-card-flippable .fuse-card-front{position:relative;opacity:1;visibility:visible;transform:rotateY(0);overflow:hidden}fuse-card.fuse-card-flippable .fuse-card-back{position:absolute;inset:0;opacity:0;visibility:hidden;transform:rotateY(180deg);overflow:hidden auto}\n"],encapsulation:2,data:{animation:f.X}})}return s})()},69:(y,u,e)=>{e.d(u,{S:()=>p}),e(9445);var f=e(177),n=e(4438);let p=(()=>{class r{static#t=this.\u0275fac=function(h){return new(h||r)};static#n=this.\u0275mod=n.$C({type:r});static#e=this.\u0275inj=n.G2t({imports:[f.MD]})}return r})()},8522:(y,u,e)=>{e.r(u),e.d(u,{AuthSignOutModule:()=>I});var c=e(4366),f=e(8834),n=e(69),p=e(599),r=e(1413),v=e(1584),m=e(980),h=e(9974),b=e(4360),s=e(6977),g=e(8141),t=e(4438),d=e(5524),l=e(177);const E=()=>["/sign-in"];function S(a,C){if(1&a&&(t.qex(0),t.EFF(1),t.nI1(2,"i18nPlural"),t.bVm()),2&a){const i=t.XpG();t.R7$(),t.SpI(" Redirecting in ",t.i5U(2,1,i.countdown,i.countdownMapping)," ")}}function A(a,C){1&a&&(t.qex(0),t.EFF(1," You are now being redirected! "),t.bVm())}const G=[{path:"",component:(()=>{class a{constructor(i,o){this._authService=i,this._router=o,this.countdown=5,this.countdownMapping={"=1":"# second",other:"# seconds"},this._unsubscribeAll=new r.B}ngOnInit(){this._authService.signOut(),(0,v.O)(1e3,1e3).pipe((0,m.j)(()=>{this._router.navigate(["sign-in"])}),function w(a,C=!1){return(0,h.N)((i,o)=>{let x=0;i.subscribe((0,b._)(o,F=>{const O=a(F,x++);(O||C)&&o.next(F),!O&&o.complete()}))})}(()=>this.countdown>0),(0,s.Q)(this._unsubscribeAll),(0,g.M)(()=>this.countdown--)).subscribe()}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}static#t=this.\u0275fac=function(o){return new(o||a)(t.rXU(d.u),t.rXU(c.Ix))};static#n=this.\u0275cmp=t.VBU({type:a,selectors:[["auth-sign-out"]],decls:15,vars:4,consts:[[1,"flex","flex-col","flex-auto","items-center","sm:justify-center","min-w-0"],[1,"w-full","sm:w-auto","py-8","px-4","sm:p-12","sm:rounded-2xl","sm:shadow","sm:bg-card"],[1,"w-full","max-w-80","sm:w-80","mx-auto","sm:mx-0"],[1,"w-12","mx-auto"],["src","assets/images/logo/logo.svg"],[1,"mt-8","text-4xl","font-extrabold","tracking-tight","leading-tight","text-center"],[1,"flex","justify-center","mt-0.5","font-medium"],[4,"ngIf"],[1,"mt-8","text-md","font-medium","text-secondary","text-center"],[1,"ml-1","text-primary-500","hover:underline",3,"routerLink"]],template:function(o,x){1&o&&(t.j41(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t.nrm(4,"img",4),t.k0s(),t.j41(5,"div",5),t.EFF(6,"You have signed out!"),t.k0s(),t.j41(7,"div",6),t.DNE(8,S,3,4,"ng-container",7)(9,A,2,0,"ng-container",7),t.k0s(),t.j41(10,"div",8)(11,"span"),t.EFF(12,"Go to"),t.k0s(),t.j41(13,"a",9),t.EFF(14,"sign in "),t.k0s()()()()()),2&o&&(t.R7$(8),t.Y8G("ngIf",x.countdown>0),t.R7$(),t.Y8G("ngIf",0===x.countdown),t.R7$(4),t.Y8G("routerLink",t.lJ4(3,E)))},dependencies:[c.Wk,l.bT,l.jo],encapsulation:2})}return a})()}];let I=(()=>{class a{static#t=this.\u0275fac=function(o){return new(o||a)};static#n=this.\u0275mod=t.$C({type:a});static#e=this.\u0275inj=t.G2t({imports:[c.iI.forChild(G),f.Hl,n.S,p.G]})}return a})()}}]);