import React, {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {miniAppsConfig} from "../configs/miniApps";
import styled from "styled-components";
import {colors, margins} from "../styles/styles";
import {Accordion as Accord, AccordionDetails, AccordionSummary} from "@mui/material";
import IconButton from "../components/other/IconButton";
import TooltipImage from "../components/other/TooltipImage";
import international from '../assets/icons/international.svg';

const Accordion = styled(Accord)`
    background-color: ${colors.secondaryDark} !important;
    color: ${colors.mainLight} !important;
    border-radius: 8px;
`;
const AccordionWrapper = styled.div`
    margin-top: ${margins.title};
`;
const AccordionSum = styled(AccordionSummary)`
    h2{
      position: relative;
      color: ${colors.mainLight};
      text-decoration: underline;
      text-decoration-color: transparent;
      transition: text-decoration-color 0.3s ease;
     }
    &:hover h2{
        text-decoration-color: inherit;
    }
`;
const AccordionDet = styled(AccordionDetails)`
    text-align: left;
    >div{
        >*:not(:first-child){
            margin-top: ${margins.innerBlock};
        }
    }
`;

const RenderAccordion:FC = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState<number | false>(false);

    const handleChange = (panelIndex: number, isExpanded: boolean): void => {
        setExpanded(isExpanded ?panelIndex :false);
    };
    const navigateTo = (url:string): void => {
        navigate(url);
    };

    return (
        <AccordionWrapper>
            {miniAppsConfig.map((item, index) => {
                const {header,path} = item;

                return(
                    <Accordion
                        key={index}
                        expanded={expanded === index}
                        onChange={(event,isExpanded)=>handleChange(index,isExpanded)}
                    >
                        <AccordionSum>
                            <h2>{header}</h2>
                        </AccordionSum>
                        <AccordionDet>
                            <div >
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cupiditate eaque id ipsum pariatur perspiciatis!</p>
                                <IconButton
                                    label='Вперед'
                                    icon={international}
                                    iconLocation='before'
                                    onClick={()=>navigateTo(path)}
                                />
                            </div>
                        </AccordionDet>
                    </Accordion>
                )})}
        </AccordionWrapper>
    );
};

export default RenderAccordion;