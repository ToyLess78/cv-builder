import React from 'react';
import styles from './Header.module.scss';
import { BreezeTitle, EditButton } from '~/components/components';
import { Image } from '~/components/common/Image/Image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectInfo } from '~/slices/infoSlice';
import { Info } from '~/components/header/Info';
import { About } from '~/components/header/About';
import { setIsEdit } from '~/slices/editSlice';

export const Header: React.FC = () => {

    const info = useSelector((state: RootState) => selectInfo(state));
    const dispatch = useDispatch();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Info>
                    <EditButton
                        onClick={() => dispatch(setIsEdit('info'))}
                        title='name & job title'
                    />
                </Info>

                <About>
                    <EditButton
                        onClick={() => dispatch(setIsEdit('about'))}
                        title={info.title}
                    />
                    <BreezeTitle text={info.title}/>
                </About>
            </div>
            <Image styles={styles.img}/>
        </header>
    )
}