import React,{FC} from 'react';
import styled from "styled-components";

interface RenderWeatherPresentProps {
    dataList: any,
}
type NumberKeys = {
    [key: string]: number;
}
type NumberOrStringKeys = {
    [key: string]: number|string;
}
type DayData = {
    main: NumberKeys,
    weather: NumberOrStringKeys[],
    wind: NumberKeys,
    clouds: NumberKeys,
}

const Weather = styled.div`
  
`;
const Card = styled.div`
  
`;

const WeatherCard: FC<{dayData: DayData}> = ({dayData}) => {
    return(
        <Card>
            <p>Температура: {dayData.main.temp}°F</p>
            <p>Ощущается как: {dayData.main.feels_like}°F</p>
            <p>Минимальная температура: {dayData.main.temp_min}°F</p>
            <p>Максимальная температура: {dayData.main.temp_max}°F</p>
            <p>Давление: {dayData.main.pressure} hPa</p>
            <p>Влажность: {dayData.main.humidity}%</p>
            <p>Сейчас: {dayData.weather[0].description}</p>
            <p>Скорость ветра:{dayData.wind.speed} м/с</p>
            <p>Направление ветра:{dayData.wind.deg}°</p>
            <p>Облачность:{dayData.clouds.all}%</p>
        </Card>
    )
};

const RenderWeatherPresent: FC<RenderWeatherPresentProps>  = ({dataList}) => {

    return (
        <Weather>
            {
                dataList.map((value: DayData) =>
                    <WeatherCard dayData={value}/>
                )
            }
        </Weather>
    );
};

export default RenderWeatherPresent;