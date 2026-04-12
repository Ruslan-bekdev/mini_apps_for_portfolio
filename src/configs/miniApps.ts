import React, {createElement, ReactElement} from "react";
import Calculator from "../apps/calculator/Calculator";
import Weather from "../apps/weather/Weather";
import Currency from "../apps/converter/currency/Currency";

export interface MiniAppsConfig {
    header: string;
    path: string;
    caption: string;
    element: ReactElement;
}

export const miniAppsConfig: MiniAppsConfig[] = [
    {
        header: 'Calculator',
        caption: 'A sophisticated calculation engine built with complex state logic. Unlike basic calculators, this tool mimics real-world device behavior, handling edge cases, input validation, and automated operation sequencing with high precision.',
        path: '/calc',
        element: createElement(Calculator),
    },
    {
        header: 'Weather Forecast',
        caption: 'A dynamic weather application featuring real-time data integration. It provides detailed forecasts across hundreds of cities, organized by days and hours, wrapped in a responsive and user-friendly interface.',
        path: '/weather',
        element: createElement(Weather),
    },
    {
        header: 'Currency Converter',
        caption: 'A reliable financial utility that tracks global exchange rates. Featuring live updates and a clean UI, this tool ensures precise conversions for a seamless user experience when dealing with international currencies.',
        path: '/convertor',
        element: createElement(Currency),
    },
];