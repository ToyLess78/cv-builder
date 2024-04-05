import React from 'react';
import styles from './Header.module.css';
import { BreezeTitle, EditeButton } from '~/components/components';
import { Image } from '../Image/Image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectInfo } from '~/slices/infoSlice';
import { Info } from '~/components/Header/Info';
import { About } from '~/components/Header/About';
import { setIsEdite } from '~/slices/editeSlice';

export const Header: React.FC = () => {

    const info = useSelector((state: RootState) => selectInfo(state));
    const dispatch = useDispatch();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Info>
                    <EditeButton
                        onClick={() => dispatch(setIsEdite('info'))}
                    />
                </Info>

                <About>
                    <EditeButton
                        onClick={() => dispatch(setIsEdite('about'))}
                    />
                    <BreezeTitle text={info.title}/>
                </About>
            </div>
            <Image styles={styles.img}/>
        </header>
    )
}