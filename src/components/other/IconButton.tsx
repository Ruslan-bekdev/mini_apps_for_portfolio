import React,{FC} from 'react';
import styled from "styled-components";
import {colors, flexCenter} from "../../styles/styles";
import international from '../../assets/icons/international.svg'

interface IconButtonProps {
    label: string,
    icon: string,
    alt?: string,
    iconLocation: 'before' | 'after',
    onClick: () => any,
}

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
   background-color: ${colors.secondaryLight} !important;
  position: relative;
  cursor: pointer;
  transition: 0.3s;
  ${flexCenter}
  span{
    color: ${colors.mainDark};
    margin: auto 8px;
  }
  img {
    height: 24px;
    object-fit: contain;
  }
  &:hover {
    padding: 12px 24px;
    border: 1px solid ${colors.secondaryLight};
  }
`;

const IconButton:FC<IconButtonProps> = ({label,icon,alt,iconLocation,onClick}) => {
    return(
        <Button onClick={onClick}>
            {iconLocation === 'before' && <img src={icon} alt={alt}/>}
            <span>{label}</span>
            {iconLocation === 'after' && <img src={icon} alt={alt}/>}
        </Button>
    )
}

export default IconButton;