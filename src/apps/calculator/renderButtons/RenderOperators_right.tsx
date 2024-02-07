import React, {Dispatch, FC} from 'react';
import {Operator} from "../../../configs/calc";

interface RenderOperatorsProps {
    operators: Operator[],
    handleClick: (operator: Operator) => any,
}

const RenderOperators_right: FC<RenderOperatorsProps> = ({operators,handleClick}) => {
    return (
        <div className='operators_right'>
            {operators.map((operator,index)=>
                <button
                    onClick={() => handleClick(operator)}
                    className={operator.className}
                    key={index}>
                    {operator.value}
                </button>
            )}
        </div>
    );
};

export default RenderOperators_right;