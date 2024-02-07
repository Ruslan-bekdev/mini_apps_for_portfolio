import React,{FC,Fragment,ReactElement} from 'react';
import styled from "styled-components";
import {useLocation,useNavigate} from "react-router-dom";
import {colors,flexCenter,flexCenter_column,justifyCenter_between,center_absolute} from "../../styles/styles";

interface ModalProps {
    title: string,
    content: ReactElement | string,
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    @include flex-center;
    z-index: 998;
`;
const ModalStyled = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid ${colors.secondaryLight};
    border-radius: 8px;
    box-sizing: content-box;
    ${flexCenter_column};
    z-index: 9999;    
`;
const ModalHeader = styled.div`
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    background-color: ${colors.secondaryDark};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    ${justifyCenter_between}
    button{
      width: 30px;
      aspect-ratio: 1;
      position: relative;
      cursor: pointer;
      &::before{
        content: 'x';
        font-size: 2rem;
        ${center_absolute};
        transform: translate(-50%,-60%);
      }
    }
`;
const ModalContent = styled.div`
    padding: 5px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    ${flexCenter}
`;

const Modal:FC<ModalProps> = ({title,content}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isMainPage = (): boolean => {
      return location.pathname === '/';
    };
    const handleClose = (): void => {
        navigate('/');
    };

    return isMainPage()?null:(
            <Fragment>
                <Overlay/>
                <ModalStyled>
                    <ModalHeader>
                        <h2>{title}</h2>
                        <button onClick={handleClose}/>
                    </ModalHeader>
                    <ModalContent>
                        {content}
                    </ModalContent>
                </ModalStyled>
            </Fragment>
        )
};

export default Modal;