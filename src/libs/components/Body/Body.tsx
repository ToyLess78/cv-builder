import React, { ReactNode } from 'react';
import styles from './Body.module.css';

interface IBodyProps {
    children: ReactNode
}

export const Body: React.FC<IBodyProps> = ({children}) => {
    return (
        <div className={styles.body}>
                {children}
        </div>
    )
};