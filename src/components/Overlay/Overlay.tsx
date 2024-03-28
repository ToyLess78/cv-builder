import React from 'react';
import styles from './Overlay.module.css';
import { AsideItem } from '../Aside/AsideItem';
import { AdditionalList } from '../common/AdditionalList';
import { Title } from '../Title/Title';

export const Overlay: React.FC = () => {
    return <div className={styles.container}>
        <input className={styles.input} type='checkbox' id='button'/>
        <label htmlFor='button'>Click Me!</label>
        <div className={styles.overlay}>
            <div className={styles.content}>
                <AsideItem>
                    <Title text={'additional'}/>
                    <AdditionalList/>
                </AsideItem>
                </div>
        </div>
    </div>
}