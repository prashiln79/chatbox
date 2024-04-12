/* tslint:disable:max-line-length */
import {FuseNavigationItem} from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'landing',
        title: 'Home',
        type : 'basic',
        link : '/landing'
    },
    {
        id: 'acm',
        title: 'ACM',
        type: 'collapsable',
        icon: 'heroicons_outline:chart-pie',

        children: [
            {
                id   : 'risk-analysis',
                title: 'Risk Analysis',
                type : 'basic',
                link : '/risk-analysis'
            },
        ]
    },
    {
        id: 'administration',
        title: 'Administration',
        type: 'collapsable',
        icon: 'heroicons_outline:chart-pie',

        children: [
            {
                id   : 'authentication',
                title: 'Authentication',
                type : 'collapsable',
                icon: 'heroicons_outline:chart-pie',
                children: [
                    {
                        id   : 'users',
                        title: 'Users',
                        type : 'basic',
                        link: 'users',
                    },
                ]
            },
            {
                id   : 'reporting-units',
                title: 'Reporting Units',
                type : 'collapsable',
                icon: 'heroicons_outline:chart-pie',
                children: [
                    {
                        id   : 'sapsystem',
                        title: 'Systems',
                        type : 'basic',
                        link: 'sap-system',
                    },
                ]
            },
        ]
    }
];
export const compactNavigation= defaultNavigation;
export const futuristicNavigation = defaultNavigation;
export const horizontalNavigation = defaultNavigation;

