import React, { ReactNode } from 'react';
import styles from './Strong.module.scss';

export const StrongTitle: React.FC<{text: ReactNode}> = ({text}) => {
    return (
        <h4
            className={ styles.title }
        >{ text }</h4>
    );
};