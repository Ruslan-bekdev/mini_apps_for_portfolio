import React, {ReactElement,createElement} from "react";
import MainPage from "../pages/mainPage/MainPage";
import CalcPage from "../pages/calcPage/CalcPage";

export interface ChildConfig {
    path: string;
    element: ReactElement;
}

export interface PageConfig {
    path: string;
    element: ReactElement;
    child?: ChildConfig;
}

export type PagesConfig = Record<string, PageConfig>

export const pagesConfig: PagesConfig = {
    main:{
        path:'/',
        element: createElement(MainPage),
    },
    calc:{
        path:'/calc',
        element: createElement(CalcPage),
    },
};