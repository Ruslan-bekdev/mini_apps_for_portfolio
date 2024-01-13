import './App.css';
import React,{FC} from 'react';
import {Routes,Route} from "react-router-dom";
import {pagesConfig, PageConfig} from "./configs/route";

const App:FC = () => {
    const RenderRoutes:FC = () => {
        return (
            <Routes>
                {Object.entries(pagesConfig).map(([key, value]) => {
                    const {path, element, child} = value as PageConfig;
                    return (
                        <Route key={key} path={path} element={element}>
                            {child && <Route path={child.path} element={element} />}
                        </Route>
                    );
                })}
            </Routes>
        );
    };

    return(
        <div className='App'>
            <RenderRoutes/>
        </div>
    )
}

export default App;