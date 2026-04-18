import './App.css';
import React,{FC} from 'react';
import {Routes, Route,Outlet} from "react-router-dom";
import styled from "styled-components";
import {container} from "./styles/styles";
import Modal from "./components/other/Modal";
import RenderAccordion from "./apps/RenderAccordion";
import {miniAppsConfig} from "./configs/miniApps";

const AppContent = styled.main`
    ${container}
`;

const App:FC = () => (
    <AppContent>
        <h1>Mini Apps</h1>
        <Routes>
            <Route
                path="/"
                element={
                    <section>
                        <h2>Mini Programs</h2>
                        <RenderAccordion/>
                        <Outlet/>
                    </section>
                }
            >{miniAppsConfig.map(value =>
                <Route
                    key={value.path}
                    path={value.path}
                    element={<Modal title={value.header}
                    content={value.element}/>}
                />
            )}</Route>
        </Routes>
    </AppContent>
)

export default App;