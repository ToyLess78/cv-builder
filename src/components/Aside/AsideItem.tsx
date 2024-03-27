import React, { ReactNode } from 'react';
import styles from './Aside.module.css';

interface IAsideItemProps {
    children?: ReactNode | undefined
}

export const AsideItem: React.FC<IAsideItemProps> = ({ children } ) => {
    return (
        <div className={styles.item}>
            {children}
        </div>
    )
}