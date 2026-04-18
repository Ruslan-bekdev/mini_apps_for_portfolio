import React, {FC, ReactNode} from "react";
import {CircularProgress} from "@mui/material";
import {styled} from "styled-components";

interface LoadingSpinnerProps {
    value?: ReactNode;
    size?: number;
}
const Loading = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

const LoadingSpinner: FC<LoadingSpinnerProps> = ({value = 'Загрузка...', size = 40}) => {
  return (
      <Loading>
          <CircularProgress size={size}/>
          <p>{value}</p>
      </Loading>
  )
};

export default LoadingSpinner;