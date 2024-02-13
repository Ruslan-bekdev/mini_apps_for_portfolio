import React, {FC, useEffect, useState} from 'react';
import {Data} from "./Weather";
import styled from "styled-components";
import {flexCenter} from "../../styles/styles";

interface RenderWeatherPresentProps {
    setNextSelectedData: () => void,
    setPrevSelectedData: () => void,
    selectedDataDate: string,
    selectedData: Data[],
}

const Weather = styled.div`
  
`;
const Date = styled.div`
  ${flexCenter};
  button{
    width: 20px;
    height: 30px;
    position: relative;
    cursor: pointer;
    text-align: center;
    font-size: 16px;
  }
`;
const Time = styled.div`
    
`;

const Card: FC<{data: Data}> = ({data}) => {
    return !data ?<div></div> :(
        <div>
            <p>{
                data.main.temp_min === data.main.temp_max
                    ?data.main.temp.toFixed(2)
                    :`
                        ${data.main.temp_min.toFixed(2)} -
                        ${data.main.temp_max.toFixed(2)}
                    `
            }°C</p>
            <p>{data.weather[0].description}</p>
            <p>Влажность: {data.main.humidity}%</p>
            <p>Облачность:{data.clouds.all}%</p>
            <p>Давление: {data.main.pressure} hPa</p>
            <p>Скорость ветра:{data.wind.speed} м/с</p>
            <p>Направление ветра:{data.wind.deg}°</p>
        </div>
    );
};

const RenderWeatherPresent: FC<RenderWeatherPresentProps>  = ({selectedData,setNextSelectedData,setPrevSelectedData}) => {
    const [time,setTime] = useState<string>('0');
    const [showedData,setShowedData] = useState<Data>(selectedData[time]);

    const handleChangeTime = (event) => {
        setTime(event.target.value);
    };

    useEffect(()=>{
        setShowedData(selectedData[time]);
    },[time]);
    useEffect(()=>{
        setTime('0');
        setShowedData(selectedData[time]);
    },[selectedData]);

    return (
        <Weather>
            <h3>Дата:</h3>
            <Date>
                <button
                    onClick={setPrevSelectedData}
                >
                    {'<'}
                </button>
                <p>
                    {showedData &&
                        showedData.dt_txt.date
                    }
                </p>
                <button
                    onClick={setNextSelectedData}
                >
                    {'>'}
                </button>
            </Date>

            <h4>Время:</h4>
            <Time>
                <p>
                    {showedData &&
                        showedData.dt_txt.time
                    }
                </p>
                {selectedData.length-1
                    ?<input
                        type="range"
                        min="0"
                        max={selectedData.length-1}
                        value={time}
                        onChange={handleChangeTime}
                    />
                    :<hr/>
                }
            </Time>

            <Card data={showedData}/>
        </Weather>
    );
};

export default RenderWeatherPresent;