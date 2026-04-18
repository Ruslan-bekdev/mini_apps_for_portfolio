import React,{FC} from 'react';
import {useDispatch} from "react-redux";
import {setValue} from "../../../store/calculatorSlice";

const RenderNumbers: FC<{numbers: number[]}> = ({numbers}) => {
    const dispatch = useDispatch();
    return (
        <div className='numbers'>
            {numbers.map((number,index)=>
                <button
                    onClick={() => dispatch(setValue(number.toString()))}
                    key={number}>
                    {number}
                </button>
            )}
        </div>
    );
};

export default RenderNumbers;