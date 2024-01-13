import React, {FC} from 'react';
import styled from "styled-components";
import {Tooltip} from "@mui/material";

const Image = styled.img`
  transition: transform 0.2s ease-in-out;
  &:hover{
    transform: scale(1.1);
  }
`;

const basePlacements = ['top','bottom','left','right'] as const;
const getAllPlacements = () => {
    return basePlacements.flatMap((placement)=> [
        placement,
        `${placement}-start` as const,
        `${placement}-end` as const,
    ]);
};
const allPlacement = getAllPlacements();

type TooltipPlacement = typeof allPlacement[number];

interface TooltipImageProps{
    title:string,
    placement?:TooltipPlacement,
    icons:string,
    alt?:string,
}

const TooltipImage:FC<TooltipImageProps> = ({title,placement,icons,alt}) => {
    return(
        <Tooltip title={title} arrow placement={placement}>
            <Image src={`https://skillicons.dev/icons?i=${icons}`} alt={alt}/>
        </Tooltip>
    );
};

export default TooltipImage;