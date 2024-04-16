import React from 'react';
import nextId from 'react-id-generator';
import { IAdditionalState } from '~/slices/skillsSlice';
import styles from './Additional.module.scss'

export const AdditionalList: React.FC<IAdditionalState> = (additional) => {

    const {data} = additional;
    return (
        <>
            {data && (
                <ul className={styles.additional}>
                    {data?.map((a) => {
                        return <li key={nextId()}>{a}</li>;
                    })}
                </ul>
            )}
        </>
    );
};