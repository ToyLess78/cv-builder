import React from 'react';
import nextId from 'react-id-generator';
import { IAdditionalState } from '~/slices/asideSlice';

export const AdditionalList: React.FC<IAdditionalState> = (additional) => {

    const {data} = additional;
    return (
        <>
            {data && (
                <ul className='additional'>
                    {data?.map((a) => {
                        return <li key={nextId()}>{a}</li>;
                    })}
                </ul>
            )}
        </>
    );
};