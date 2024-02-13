import React,{FC} from 'react';

interface RenderNumbersProps {
    numbers: number[],
    action: (number: number) => void
}

const RenderNumbers: FC<RenderNumbersProps> = ({numbers,action}) => {
    return (
        <div className='numbers'>
            {numbers.map((number,index)=>
                <button
                    onClick={() => action(number)}
                    key={index}>
                    {number}
                </button>
            )}
        </div>
    );
};

export default RenderNumbers;