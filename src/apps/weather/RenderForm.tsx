import React,{FC,useState} from 'react';
import styled from "styled-components";

// типы указаны временно
interface RenderFormProps {
    dispatch: any,
    setCityName: any,
    setDaysCount: any,
}

const Form = styled.div`
  
`;

const RenderForm: FC<RenderFormProps>  = ({dispatch,setCityName,setDaysCount}) => {
    const [cityNameInput, setCityNameInput] = useState<string>('');
    const [daysCountInput, setDaysCountInput] = useState<number>(1);

    const handleCityNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCityNameInput(event.target.value);
    };
    const handleDaysCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDaysCountInput(+event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setCityName(cityNameInput));
        dispatch(setDaysCount(Number(daysCountInput)));
    };

    return (
        <Form>
            <form onSubmit={handleSubmit}>
                <label>
                    City Name:
                    <input
                        type="text"
                        value={cityNameInput}
                        onChange={handleCityNameChange}
                    />
                </label>
                <label>
                    Days Count:
                    <input
                        type="number"
                        value={daysCountInput}
                        onChange={handleDaysCountChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </Form>
    );
};

export default RenderForm;