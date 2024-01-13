import React, {FC, useState} from 'react';
import {miniAppsConfig} from "../../configs/miniApps";
import styled from "styled-components";
import {colors, margins} from "../../styles/styles";
import {Accordion as Accord, AccordionDetails, AccordionSummary} from "@mui/material";
import IconButton from "../../components/other/IconButton";
import TooltipImg from "../../components/other/TooltipImage";


const Accordion = styled(Accord)`
    background-color: ${colors.secondaryDark} !important;
    color: ${colors.mainLight} !important;
    border-radius: 8px;
`;
const AccordionWrapper = styled.div`
    margin-top: ${margins.title};
`;
const AccordionSum = styled(AccordionSummary)`
    
`;
const AccordionDet = styled(AccordionDetails)`
    text-align: left;
  >div{
    >*:not(:first-child){
      margin-top: ${margins.innerBlock};
    }
  }
`;
const TooltipImage = styled(TooltipImg)`
    margin: ${margins.block}px auto !important;
    display: none; //для проверки
`;

const RenderAccordion:FC = () => {
    const [expanded, setExpanded] = useState<number | false>(false);

    const handleChange = (panelIndex: number, isExpanded: boolean) => {
        setExpanded(isExpanded ?panelIndex :false);
    };
    const navigateTo = (url:string) => {
        window.open(url,'_blank');
    };

    return (
        <AccordionWrapper>
            {miniAppsConfig.map((item, index) => {
                const {header,icons, actions} = item;
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
                                <p>Используются такие инструменты как:</p>
                                <TooltipImage title='lol' icons={icons} placement={'top'} />
                                <IconButton
                                    label={actions.label}
                                    icon={actions.url}
                                    iconLocation='before'
                                    onClick={()=>navigateTo(actions.url)}
                                />
                            </div>
                        </AccordionDet>
                    </Accordion>
                )})}
        </AccordionWrapper>
    );
};

export default RenderAccordion;