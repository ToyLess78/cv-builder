import React from 'react';
import styles from './Heeader.module.css';
import { Title } from '../Title/Title.tsx';
import { Image } from '../Image/Image.tsx';
import { FaRegEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store.ts';
import { selectInfo } from '../../redux/slices/infoSlice.ts';

export const Header: React.FC = () => {
    const info = useSelector((state: RootState) => selectInfo(state));

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <section className={styles.info}>
                    <FaRegEdit className='edite'/>
                    <h2>{info.name}</h2>
                    <h4>{info.position}</h4>
                </section>

                <section className={styles.about}>
                    <FaRegEdit className='edite'/>
                    <Title text={info.title}/>
                    <p>{info.introduction}</p>
                </section>
            </div>
            <Image styles={styles.img}/>

        </header>
    )
}