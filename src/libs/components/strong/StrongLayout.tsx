import React, { ReactNode } from 'react';
import styles from './Strong.module.scss';

interface IStrongLayoutProps {
    info: ReactNode;
    aside: ReactNode;
    main: ReactNode;
}
export const StrongLayout: React.FC<IStrongLayoutProps> = ({info, aside, main}) => {
    return (
        <div className={styles.container}>
            <div className={styles.column}></div>
            <div className={styles.header}>
                <div className={styles.head}>
                    <div className={styles.text}>
                        {info}
                    </div>
                </div>
            </div>
            <div className={styles.main}>
                {main}
            </div>
            <div className={styles.aside}>
                {aside}
            </div>
        </div>
    )
}