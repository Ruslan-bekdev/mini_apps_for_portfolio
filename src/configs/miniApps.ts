import React from "react";

export interface MiniAppActions {
    url: string;
    label: string;
}

export interface MiniAppsConfig {
    header: string;
    icons: string;
    actions: MiniAppActions;
}

export const miniAppsConfig:MiniAppsConfig[] = [
    {
        header: 'Калькулятор',
        icons: 'html,css',
        actions: {
            url: '/calc',
            label: 'Вперед',
        },
    },
    {
        header: '2',
        icons: 'html,css',
        actions: {
            url: '#',
            label: 'Вперед',
        },
    },
    {
        header: '3',
        icons: 'html,css',
        actions: {
            url: '#',
            label: 'Вперед',
        },
    },
    {
        header: '4',
        icons: 'html,css',
        actions: {
            url: '#',
            label: 'Вперед',
        },
    },
]