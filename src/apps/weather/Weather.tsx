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
    resetInitialData,
} from "../../store/weatherSlice";

export interface RawWeatherData {
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        [key: string]: number;
    };
    weather: Array<{ main: string; description: string; [key: string]: any }>;
    wind: { speed: number; [key: string]: number };
    clouds: { all: number };
    dt_txt: string;
}
export interface WeatherItem extends Omit<RawWeatherData, 'dt_txt'> {
    dt_txt: {
        date: string;
        time: string;
    };
}

const WeatherContent = styled.div`
  hr{
    margin-block: 8px;
  }
`;

const Weather: FC = () => {
    const dispatch = useDispatch();
    const {cityName,selectedDataDate,selectedData,initialData} =
        useSelector((state: RootState) => state.weatherReducer);
    const apiKey = 'e417df62e04d3b1b111abeab19cea714';
    const apiUrl = cityName.trim()
        ? `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName.trim())}&cnt=40&appid=${apiKey}`
        : null;
    const {data, error, isLoading}: FetchResponse<any> = useFetch(apiUrl);

    const setNextSelectedDataDateAction = () => {
      dispatch(setNextSelectedDataDate());
    };
    const setPrevSelectedDataDateAction = () => {
      dispatch(setPrevSelectedDataDate());
    };

    const transformWeatherData = (rawList: RawWeatherData[]): WeatherItem[] => {
        return rawList.map(item => {
            const [date, time] = item.dt_txt.split(' ');

            return {
                ...item,
                main: {
                    ...item.main,
                    temp: item.main.temp - 273.15,
                    temp_min: item.main.temp_min - 273.15,
                    temp_max: item.main.temp_max - 273.15,
                },
                dt_txt: {date, time}
            };
        });
    };

    useEffect(() => {
        if (error) {
            // dispatch(resetInitialData());
            console.log(error);
            console.log(apiUrl)
            console.log(apiKey)
            return;
        }
        if (!data?.list) return;
        const formattedList = transformWeatherData(data.list);
        const finalData = {
            ...data,
            list: formattedList,
        };
        dispatch(setInitialData(finalData));
        dispatch(setSelectedDataDate(finalData.list[0].dt_txt.date));
    },[data]);

    useEffect(()=>{
        selectedDataDate && dispatch(setSelectedData());
    },[selectedDataDate,data]);

    return isLoading ?<LoadingSpinner/> :(
        <WeatherContent>
            {initialData && cityName &&
                <RenderWeatherPresent
                    setPrevSelectedData={setPrevSelectedDataDateAction}
                    setNextSelectedData={setNextSelectedDataDateAction}
                    selectedDataDate={selectedDataDate}
                    selectedData={selectedData}
                    cityName={initialData?.city?.name || ''}
                />
            }
            <RenderForm
                dispatch={dispatch}
                setCityName={setCityName}
            />
        </WeatherContent>
    );
};

export default Weather;