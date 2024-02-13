import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {useDispatch} from "react-redux";
import {useFetch} from "../../../components/requests";
import {flexCenter, colors} from "../../../styles/styles";
import LoadingSpinner from "../../../components/other/LoadingSpinner";
import {
    setCurrList,
    setCurr1,
    setCurr2,
    setCurr1Value,
    setCurr2Value,
    setEmptyValue,
} from "../../../store/currencySlice";

const CurrWrapper = styled.div`
  &>div{
    height: 36px;
    ${flexCenter};
    border-radius: 4px;
    margin-block: 16px;
    outline: 1px solid ${colors.secondaryDark};
    
    input,select{
      height: 100%;
      color: ${colors.mainLight};
      background-color: inherit;
      border: transparent;
    }
    input{
      width: 52%;
      padding-inline: 8px;
      box-sizing: border-box;
      outline: none;
    }
    hr{
      height: 60%;
      border: 1px solid ${colors.secondaryDark};
    }
    select{
      flex-grow: 1;
      text-align: right;
      transition: .3s;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      cursor: pointer;
      
      option{
        background-color: ${colors.mainDark};
      }
    }
    
  }
  .focused{
    outline: 1px solid ${colors.secondaryLight};
  }
  .selected{
    background-color: ${colors.mainDark};
  }
`;

interface CurrencyData {
    result: string;
    documentation: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
    base_code: string;
    conversion_rates: Record<string, number>;
}

const Option: FC<{value: string}> = ({value}) => {
    return(
        <option value={value}>
            {value.toUpperCase()}
        </option>
    )
};

const Currency: FC<{}>  = () => {
    const dispatch = useDispatch();
    const {currList,curr1,curr2,curr1Value,curr2Value} = useSelector(
        (state: RootState) => state.currencyReducer);
    const apiKey = '6c9049512ebc46b1d38c3627';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${curr2}`;
    const [input1Value,setInput1Value] = useState<string>('');
    const [input2Value,setInput2Value] = useState<string>('');
    const [isFocused1, setIsFocused1] = useState<boolean>(false);
    const [isFocused2, setIsFocused2] = useState<boolean>(false);
    const [isSelected1, setIsSelected1] = useState<boolean>(false);
    const [isSelected2, setIsSelected2] = useState<boolean>(false);

    const {data, error, isLoading} = useFetch<CurrencyData>(apiUrl);

    const setEmptyValueAction = () => {
        dispatch(setEmptyValue());
        setInput1Value('');
        setInput2Value('');
    };
    const handleMultiply = (x: number,y: number): number => {
      return x * y;
    };
    const handleDivide = (x: number, y: number): number => {
        return x / y;
    };
    const setCurr1Action = (event) => {
        dispatch(setCurr1(event.target.value as string));
    };
    const setCurr2Action = (event) => {
        dispatch(setCurr2(event.target.value as string));
    };
    const setCurr1ValueAction = (value: string) => {
        const convertedValue = handleDivide(+value,+currList[curr1]);
        setInput1Value(value);
        dispatch(setCurr1Value(value));
        dispatch(setCurr2Value(convertedValue
            .toFixed(3).toString())
        );
    };
    const setCurr2ValueAction = (value: string) => {
        const convertedValue = handleMultiply(+value,+currList[curr1]);
        setInput2Value(value);
        dispatch(setCurr2Value(value));
        dispatch(setCurr1Value(convertedValue
            .toFixed(3).toString())
        );
    };

    useEffect(() => {
        if (!+curr1Value || !+curr2Value) {
            setEmptyValueAction();
        }
    }, [curr1Value, curr2Value]);
    useEffect(()=>{
        setCurr1ValueAction(input1Value);
    },[curr1]);
    useEffect(()=>{
        setCurr2ValueAction(input2Value);
    },[curr2]);
    useEffect(()=>{
        error && alert(error);
        data &&
        dispatch(setCurrList(data.conversion_rates));
    },[data]);

    return isLoading && currList ?<LoadingSpinner/> :(
        <CurrWrapper>
            <div
                onFocus={() => setIsFocused1(true)}
                onBlur={() => setIsFocused1(false)}
                className={isFocused1 ?'focused' :''}
            >
                <input
                    value={curr1Value}
                    onChange={(event) => setCurr1ValueAction(event.target.value)}
                />
                <hr/>
                <select
                    value={curr1}
                    onChange={setCurr1Action}
                    onFocus={()=>setIsSelected1(true)}
                    onBlur={()=>setIsSelected1(false)}
                    className={isSelected1 ?'selected' :''}
                    id="currency1" name="currency1"
                >
                    {
                        !curr1 &&
                        <option value="">Выберите валюту</option>
                    }
                    {
                        Object.entries(currList).map(([key])=>{
                            return <Option value={key} key={key}/>
                        })
                    }
                </select>
            </div>

            <div
                onFocus={() => setIsFocused2(true)}
                onBlur={() => setIsFocused2(false)}
                className={isFocused2 ?'focused' :''}
            >
                <input
                    value={curr2Value}
                    onChange={(event) => setCurr2ValueAction(event.target.value)}
                />
                <hr/>
                <select
                    value={curr2}
                    onChange={setCurr2Action}
                    onFocus={()=>setIsSelected2(true)}
                    onBlur={()=>setIsSelected2(false)}
                    className={isSelected2 ?'selected' :''}
                    id="currency2" name="currency2"
                >
                    {
                        !curr2 &&
                        <option value="">Выберите валюту</option>
                    }
                    {
                        Object.entries(currList).map(([key]) =>
                            <Option value={key} key={key}/>
                        )
                    }
                </select>
            </div>
        </CurrWrapper>
    );
};

export default Currency;