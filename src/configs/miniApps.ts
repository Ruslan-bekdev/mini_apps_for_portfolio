import React, {createElement, ReactElement} from "react";
import Calculator from "../apps/calculator/Calculator";
import Weather from "../apps/weather/Weather";
import Currency from "../apps/converter/currency/Currency";

export interface MiniAppsConfig {
    header: string;
    path: string;
    element: ReactElement;
}

export const miniAppsConfig:MiniAppsConfig[] = [
    {
        header: 'Калькулятор',
        path: '/calc',
        element: createElement(Calculator),
    },
    {
        header: 'Погода',
        path: '/weather',
        element: createElement(Weather),
    },
    {
        header: 'Конвертеры',
        path: '/convertor',
        element: createElement(Currency),
    },
    {
        header: 'Часы',
        path: '#',
        element: createElement(Calculator),
    },
];