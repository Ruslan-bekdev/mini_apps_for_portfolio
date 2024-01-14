import React,{FC} from 'react';
import styled from "styled-components";
import {container} from "../../styles/styles";
import RenderAccordion from "./RenderAccordion";

const Main = styled.div`
    ${container}
`;

const MainPage:FC = () => {
    return(
        <Main>
            <h1>Мини приложения</h1>
            <RenderAccordion/>
        </Main>
    );
};

export default MainPage;