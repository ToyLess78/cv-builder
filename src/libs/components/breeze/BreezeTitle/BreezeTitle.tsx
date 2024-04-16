import React, { ReactNode } from 'react';
import styles from './BreezeTitle.module.scss'

interface ITitleProps {
    text: ReactNode;
}

export const BreezeTitle: React.FC<ITitleProps> = ({ text } ) => {

    return (
        <h4
            className={styles.title}
        >{text}</h4>
    )
}