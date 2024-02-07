import React,{FC} from 'react';
import Currency from "./currency/Currency";

interface ConverterProps {

}

const Converter: FC<ConverterProps>  = ({}) => {

    return (
        <div>
            <Currency/>
        </div>
    );
};

export default Converter;