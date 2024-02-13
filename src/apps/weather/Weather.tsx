import React, {FC, useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import RenderWeatherPresent from "./RenderWeatherPresent";
import RenderForm from "./RenderForm";
import LoadingSpinner from "../../components/other/LoadingSpinner";
import {useFetch, FetchResponse} from "../../components/requests";
import {
    setInitialData,
    setCityName,
    setSelectedDataDate,
    setNextSelectedDataDate,
    setPrevSelectedDataDate,
    setSelectedData,
} from "../../store/weatherSlice";

type NumberKeys = {
    [key: string]: number;
}
type NumberOrStringKeys = {
    [key: string]: number|string;
}
export type Data = {
    main: NumberKeys,
    weather: NumberOrStringKeys[],
    wind: NumberKeys,
    clouds: NumberKeys,
    dt_txt: NumberKeys,
}

const WeatherContent = styled.div`
  hr{
    margin-block: 8px;
  }
`;

const Weather: FC = () => {
    const dispatch = useDispatch();
    const {cityName,selectedDataDate,selectedData} =
        useSelector((state: RootState) => state.weatherReducer);
    const apiKey = 'e417df62e04d3b1b111abeab19cea714';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=
                ${cityName}&cnt=40&appid=${apiKey}`
    const {data, error, isLoading}: FetchResponse<any> = useFetch(apiUrl);

    const setNextSelectedDataDateAction = () => {
      dispatch(setNextSelectedDataDate());
    };
    const setPrevSelectedDataDateAction = () => {
      dispatch(setPrevSelectedDataDate());
    };

    useEffect(() => {
        error && console.log(error);
        if (!data) return;
        const newDataWithDateAndTime =
        typeof data.list[0].dt_txt === "string"
            ?data.list.map((item)=>{
                const dateAndTime = item.dt_txt.split(' ');
                return {
                    ...item,
                    dt_txt: {
                        date: dateAndTime[0],
                        time: dateAndTime[1],
                    }
                }
            })
            :data.list
        const convertedToCelsius =
            newDataWithDateAndTime.map((data) => {
                return {
                    ...data,
                    main: {
                        ...data.main,
                        temp: data.main.temp - 273.15,
                        temp_min: data.main.temp_min - 273.15,
                        temp_max: data.main.temp_max - 273.15,
                    }
                }
            });
        const copiedData = {
            ...data,
            list: convertedToCelsius,
        };
        dispatch(setInitialData(copiedData));
        dispatch(setSelectedDataDate(copiedData.list[0].dt_txt.date));
    },[data]);
    useEffect(()=>{
        selectedDataDate && dispatch(setSelectedData());
    },[selectedDataDate,data]);

    return isLoading ?<LoadingSpinner/> :(
        <WeatherContent>
            {cityName
                ?selectedData &&
                <RenderWeatherPresent
                    setPrevSelectedData={setPrevSelectedDataDateAction}
                    setNextSelectedData={setNextSelectedDataDateAction}
                    selectedDataDate={selectedDataDate}
                    selectedData={selectedData}
                />
                :<div>Введите название Города</div>
            }
            <hr/>
            <RenderForm
                dispatch={dispatch}
                setCityName={setCityName}
            />
        </WeatherContent>
    );
};

export default Weather;