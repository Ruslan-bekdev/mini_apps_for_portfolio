import React, {FC} from 'react';
import styled from "styled-components";
import {Tooltip} from "@mui/material";

type TooltipPlacement = typeof allPlacement[number];

interface TooltipImageProps{
    title:string,
    placement?:TooltipPlacement,
    image:string,
    alt?:string,
}
const Image = styled.img`
  transition: transform 0.2s ease-in-out;
  @media (hover: hover) {
    &:hover{
      transform: scale(1.1);
    }
  }
  @media (hover: none) {
    &:active{
      transform: scale(1.1);
    }
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


const TooltipImage:FC<TooltipImageProps> = ({title,placement,image,alt}) => {
    return(
        <Tooltip title={title} arrow placement={placement}>
            <Image src={image} alt={alt}/>
        </Tooltip>
    );
};

export default TooltipImage;