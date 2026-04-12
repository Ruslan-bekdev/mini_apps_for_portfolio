import React,{FC,useState,Dispatch} from 'react';
import {UnknownAction} from "redux";
import styled from "styled-components";
import {flexCenter_column} from "../../styles/styles";

interface RenderFormProps {
    dispatch: Dispatch<UnknownAction>,
    setCityName: any,
    resetCityName: any,
}

const Form = styled.form`
    ${flexCenter_column}

    input {
        padding: 8px 12px;
        margin-block: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: none;
        &:focus {border-color: #666;}
    }

    button {
        padding: 8px 16px;
        cursor: pointer;
        background: #333;
        color: white;
        border: none;
        border-radius: 4px;
        transition: 0.2s;
        &:hover {background: #555;}
    }
`;

const RenderForm: FC<RenderFormProps>  = ({dispatch,setCityName,resetCityName}) => {
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
                <p>Enter the name of the City</p>
                <input
                    type="text"
                    value={cityNameInput}
                    onChange={handleCityNameChange}
                />
            </label>
            <button type="submit">Search</button>
        </Form>
    );
};

export default RenderForm;