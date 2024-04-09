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

export const miniAppsConfig:MiniAppsConfig[] = [
    {
        header: 'Калькулятор',
        caption: 'Самое сложное программой. Вместо самого простого строго последовательного набора чисел и выбора операции, я создал полноценный, автоматизированный инструмент, который максимально приближен к настоящему калькулятору. ' +
            'В нем учтены все детали, возможные варианты ввода и обработки ошибок',
        path: '/calc',
        element: createElement(Calculator),
    },
    {
        header: 'Погода',
        caption: 'Это, безусловно, самая полезная программа для повседневной жизни. Получите точный прогноз погоды для сотен городов, настроенный на дни и часы, с удобным интерфейсом.',
        path: '/weather',
        element: createElement(Weather),
    },
    {
        header: 'Конвертер валют',
        caption: 'Какой набор программ был бы полным без конвертера валют? Постоянно обновляемый курс валют делает этот инструмент не только удобным, но и надежным источником актуальной информации о курсах валют.',
        path: '/convertor',
        element: createElement(Currency),
    },
];