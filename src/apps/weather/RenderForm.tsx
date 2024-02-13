import React,{FC,useState,Dispatch} from 'react';
import {UnknownAction} from "redux";
import styled from "styled-components";
import {flexCenter_column} from "../../styles/styles";

interface RenderFormProps {
    dispatch: Dispatch<UnknownAction>,
    setCityName: any,
}

const Form = styled.form`
  ${flexCenter_column}
  input,button{
    padding: 4px 8px;
  }
  input{
    margin-block: 4px;
  }
  button{
    padding: 4px 8px;
    cursor: pointer;
  }
`;

const RenderForm: FC<RenderFormProps>  = ({dispatch,setCityName}) => {
    const [cityNameInput, setCityNameInput] = useState<string>('');

    const handleCityNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCityNameInput(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!cityNameInput) return;
        dispatch(setCityName(cityNameInput));
        setCityNameInput('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <label>
                <p>Город:</p>
                <input
                    type="text"
                    value={cityNameInput}
                    onChange={handleCityNameChange}
                />
            </label>
            <button type="submit">Найти</button>
        </Form>
    );
};

export default RenderForm;