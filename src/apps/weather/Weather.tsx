import React, {FC, useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import RenderWeatherPresent from "./RenderWeatherPresent";
import RenderForm from "./RenderForm";
import LoadingSpinner from "../../components/other/LoadingSpinner";
import {useFetch} from "../../components/requests";
import {
    setData,
    setCityName,
    setDaysCount,
} from "../../store/weatherSlice";

const WeatherContent = styled.div`
  
`;

const Weather: FC = () => {
    const dispatch = useDispatch();
    const {data,cityName,daysCount} = useSelector((state: RootState) => state.weatherReducer);
    const apiKey = 'e417df62e04d3b1b111abeab19cea714';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=
                ${cityName}&cnt=${daysCount}&appid=${apiKey}`

    const {data: lol, error, isLoading} = useFetch<any>(apiUrl);
    useEffect(() => {
        error && alert(error);
        lol && dispatch(setData(lol));
    },[lol]);

    return isLoading ?<LoadingSpinner/> :(
        <WeatherContent>
            {cityName
                ?data.list && <RenderWeatherPresent dataList={data.list}/>
                :<div>Введите название Города</div>
            }
            <RenderForm
                dispatch={dispatch}
                setCityName={setCityName}
                setDaysCount={setDaysCount}
            />
        </WeatherContent>
    );
};

export default Weather;