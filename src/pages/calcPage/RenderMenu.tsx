import React, {Dispatch, FC} from 'react';
import {UnknownAction} from "redux";
import styled from "styled-components";
import {flexStart} from "../../styles/styles";
import MenuIcon from "@material-ui/icons/Menu";

interface RenderMenuProps {
    dispatch: Dispatch<UnknownAction>;
}

const CalcMenu = styled.div`
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  ${flexStart}
  b{
    margin-left: 5px;
  }
`;
const Burger = styled(MenuIcon)`
    cursor: pointer;
`;

const RenderMenu:FC<RenderMenuProps> = ({dispatch}) => {
    return(
        <CalcMenu>
            <Burger/>
            <b>Обычный</b>
        </CalcMenu>
    )
};

export default RenderMenu;