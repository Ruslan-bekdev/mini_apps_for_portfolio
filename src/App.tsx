import './App.css';
import React,{FC} from 'react';
import {Routes, Route,Outlet} from "react-router-dom";
import styled from "styled-components";
import {container} from "./styles/styles";
import Modal from "./components/other/Modal";
import RenderAccordion from "./apps/RenderAccordion";
import {miniAppsConfig} from "./configs/miniApps";

const AppContent = styled.div`
    ${container},
`;

const App:FC = () => {
    const RenderRoutes= () => {
        return Object.entries(miniAppsConfig).map(([key, value]) => {
            return <Route key={key} path={value.path} element={<Modal title={value.header} content={value.element}/>} />;
        });
    };

    return(
        <AppContent>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <h1>Мини приложения</h1>
                            <RenderAccordion/>
                            <Outlet/>
                        </div>
                    }
                >
                    {RenderRoutes()}
                </Route>
            </Routes>
        </AppContent>
    )
}

export default App;