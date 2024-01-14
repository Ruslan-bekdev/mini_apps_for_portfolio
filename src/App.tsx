import './App.css';
import React,{FC} from 'react';
import {Routes, Route, Link as LinkRoute, useLocation} from "react-router-dom";
import {pagesConfig, PageConfig} from "./configs/route";
import styled from "styled-components";
import {colors, margins, start_fixed} from "./styles/styles";

const Link = styled(LinkRoute)`
    color: ${colors.secondaryLight};
    ${start_fixed};
    top: ${margins.innerBlock};
    left: ${margins.innerBlock};
    &::before{
      content: '<';
    }
`;

const ToHomeLink:FC|null = () => {
    const location = useLocation();
    const isNotMainPage = location.pathname !== '/';

    return isNotMainPage ?<Link to='/'>На главную</Link> :null
};


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
            <ToHomeLink/>
            <RenderRoutes/>
        </div>
    )
}

export default App;