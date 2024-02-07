import React,{FC} from "react";
import {CircularProgress} from "@mui/material";
import {styled} from "styled-components";

interface LoadingSpinnerProps {
    value?: string;
}
const Loading = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

const LoadingSpinner: FC<LoadingSpinnerProps> = ({value = 'Загрузка...'}) => {
  return (
      <Loading>
          <CircularProgress/>
          <p>{value}</p>
      </Loading>
  )
};

export default LoadingSpinner;