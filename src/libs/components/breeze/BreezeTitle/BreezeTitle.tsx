import React, { ReactNode } from 'react';
import styles from './BreezeTitle.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectThemeColor } from '~/slices/themeSlice';

interface ITitleProps {
    text: ReactNode;
}

export const BreezeTitle: React.FC<ITitleProps> = ({ text } ) => {

    const themeColor = useSelector((state: RootState) => selectThemeColor(state));

    return (
        <h4
            className={styles.title}
            style={{'--primary': themeColor} as React.CSSProperties}
        >{text}</h4>
    )
}