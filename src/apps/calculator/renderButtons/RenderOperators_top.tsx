import React, {FC} from 'react';
import {Operator} from "../../../configs/calc";

interface RenderOperatorsProps {
    operators: Operator[],
    handleClick: (operator: Operator) => any,
}

const RenderOperators_top: FC<RenderOperatorsProps> = ({operators,handleClick}) => {
    return (
        <div className='operators_top'>
            {operators.map((operator,index)=>
                <button
                    onClick={()=>handleClick(operator)}
                    key={index}>
                    {operator.value}
                </button>
            )}
        </div>
    );
};

export default RenderOperators_top;