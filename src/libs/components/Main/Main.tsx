import React from 'react';
import styles from './Main.module.css'
import { RippleDemo } from '../../../RippleDemo';

interface IMainProps {
    isOrder: boolean
}

export const Main: React.FC<IMainProps> = ({ isOrder }) => {

    return (
        <section className={styles.main} style={isOrder ? { order: 2 } : {}}>
            <RippleDemo/>

        </section>

    )
}