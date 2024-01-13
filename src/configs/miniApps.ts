import React from "react";
import international from '../assets/icons/international.svg';

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
            url: international,
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