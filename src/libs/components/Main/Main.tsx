import React from 'react';
import styles from './Main.module.css'
import { MonthPicker } from '~/components';

interface IMainProps {
    isOrder: boolean
}

export const Main: React.FC<IMainProps> = ({ isOrder }) => {

    return (
        <section className={styles.main} style={isOrder ? { order: 2 } : {}}>
            <MonthPicker/>

        </section>

    )
}