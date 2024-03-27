import React, { ReactNode } from 'react';
import styles from './Aside.module.css';

interface IAsideProps {
    children?: ReactNode | undefined
}

export const Aside: React.FC<IAsideProps> = ({ children } ) => {
    return (
        <div className={styles.aside}>
            {children}
        </div>
    )
}