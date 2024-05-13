import React, { ReactNode } from 'react';
import styles from './Title.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectTheme } from '~/slices/theme.slice';

export const Title: React.FC<{text: ReactNode}> = ({text}) => {

    const {template} = useSelector((state: RootState) => selectTheme(state));

    return (
        <h4
            className={`${styles.title} ${styles[template]}`}
            >{ text }</h4>
    );
};