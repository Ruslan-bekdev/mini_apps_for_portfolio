import React, {FC, useEffect, useState} from 'react';
import {WeatherItem} from "./Weather";
import styled from "styled-components";
import {flexCenter} from "../../styles/styles";

interface RenderWeatherPresentProps {
    setNextSelectedData: () => void,
    setPrevSelectedData: () => void,
    selectedDataDate: string,
    selectedData: WeatherItem[],
    cityName: string,
}

const Weather = styled.div`
  
`;
const Date = styled.div`
  ${flexCenter};
  gap: .2rem;
  button{
    background: rgba(255, 255, 255, 0.05);
    width: 20px;
    height: 30px;
    position: relative;
    cursor: pointer;
    text-align: center;
    font-size: 16px;
    color: white;
    border: 1px solid gray;
    border-radius: 15%;
  }
`;
const Time = styled.div`
    
`;
const CardContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.6;
  
  span {font-weight: bold;}
`;

const Card: FC<{data: WeatherItem, name: string}> = ({data,name}) => {
    if (!data) return null;
    return (
        <CardContainer>
            <h3>City: {name}</h3>
            <p style={{ fontSize: '1.5rem', textAlign: 'center' }}>
                {data.main.temp.toFixed(1)}°C
            </p>
            <p><span>Condition:</span> {data.weather[0].description}</p>
            <p><span>Humidity:</span> {data.main.humidity}%</p>
            <p><span>Clouds:</span> {data.clouds.all}%</p>
            <p><span>Pressure:</span> {data.main.pressure} hPa</p>
            <p><span>Wind:</span> {data.wind.speed} m/s</p>
        </CardContainer>
    );
};

const RenderWeatherPresent: FC<RenderWeatherPresentProps>  = ({selectedData,setNextSelectedData,setPrevSelectedData,cityName}) => {
    const [time,setTime] = useState<string>('0');
    const [showedData,setShowedData] = useState<WeatherItem>(selectedData[time]);

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
            <h3>Date:</h3>
            <Date>
                <button onClick={setPrevSelectedData}>
                    {'<'}
                </button>
                <p>
                    {showedData && showedData.dt_txt.date}
                </p>
                <button onClick={setNextSelectedData}>
                    {'>'}
                </button>
            </Date>

            <h4>Time:</h4>
            <Time>
                <p>
                    {showedData && showedData.dt_txt.time}
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

            <Card data={showedData} name={cityName}/>

            <hr/>
        </Weather>
    );
};

export default RenderWeatherPresent;