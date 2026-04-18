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

const Currency: FC  = () => {
    const dispatch = useDispatch();
    const {currList,curr1,curr2} = useSelector((state: RootState) => state.currencyReducer);
    const apiKey = '6c9049512ebc46b1d38c3627';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${curr1}`;
    const [input1Value,setInput1Value] = useState<string>('');
    const [input2Value,setInput2Value] = useState<string>('');
    const [isFocused1, setIsFocused1] = useState<boolean>(false);
    const [isFocused2, setIsFocused2] = useState<boolean>(false);
    const [isSelected1, setIsSelected1] = useState<boolean>(false);
    const [isSelected2, setIsSelected2] = useState<boolean>(false);

    const {data, error, isLoading} = useFetch<CurrencyData>(apiUrl);

    const handleStringMultiply = (x: string | number,y: string | number): string =>
        (Math.round(+x * +y * 100) / 100).toString();
    const handleStringDivide = (x: string | number,y: string | number): string =>
        (Math.round(+y / +x * 100) / 100).toString();
    const setCalculatedValue = (value: string,currNum: 1 | 2) => {
        if (value === "") {
            setInput1Value("");
            setInput2Value("");
            return;
        }

        const result: string = currNum === 1
            ?handleStringMultiply(value,currList[curr2])
            :handleStringDivide(value,currList[curr2])

        if (isNaN(+result) || !isFinite(+result)) return;

        setInput1Value(currNum === 1 ?value :result);
        setInput2Value(currNum === 1 ?result :value);
    };

    useEffect(()=> setCalculatedValue(input1Value, 1),[curr1]);
    useEffect(()=> setCalculatedValue(input2Value, 2),[curr2]);
    useEffect(()=> {
        data && dispatch(setCurrList(data.conversion_rates));
    },[data]);
    useEffect(() => {
        error && alert(`Ошибка API: ${error}`);
    }, [error]);

    return isLoading && currList ?<LoadingSpinner/> :(
        <CurrWrapper>
            <div
                onFocus={() => setIsFocused1(true)}
                onBlur={() => setIsFocused1(false)}
                className={isFocused1 ?'focused' :''}
            >
                <input
                    value={input1Value}
                    onChange={(event) => setCalculatedValue(event.target.value, 1)}
                />
                <hr/>
                <select
                    value={curr1}
                    onChange={e => dispatch(setCurr1(e.target.value as string))}
                    onFocus={()=>setIsSelected1(true)}
                    onBlur={()=>setIsSelected1(false)}
                    className={isSelected1 ?'selected' :''}
                    id="currency1" name="currency1"
                >
                    {!curr1 && <option value="">Выберите валюту</option>}
                    {Object.entries(currList).map(([key])=>
                            <Option value={key} key={key}/>)}
                </select>
            </div>

            <div
                onFocus={() => setIsFocused2(true)}
                onBlur={() => setIsFocused2(false)}
                className={isFocused2 ?'focused' :''}
            >
                <input
                    value={input2Value}
                    onChange={(e) => setCalculatedValue(e.target.value, 2)}
                />
                <hr/>
                <select
                    value={curr2}
                    onChange={e => dispatch(setCurr2(e.target.value as string))}
                    onFocus={()=>setIsSelected2(true)}
                    onBlur={()=>setIsSelected2(false)}
                    className={isSelected2 ?'selected' :''}
                    id="currency2" name="currency2"
                >
                    {!curr2 && <option value="">Select currency</option>}
                    {Object.entries(currList).map(([key]) =>
                        <Option value={key} key={key}/>
                    )}
                </select>
            </div>
        </CurrWrapper>
    );
};

export default Currency;