import React from 'react';
import styles from './Header.module.scss';
import { Title, EditButton } from '~/components/components';
import { Image } from '~/components/common/Image/Image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectInfo } from '~/slices/info.slice';
import { Info } from './Info';
import { Summary } from './Summary';
import { setIsEdit } from '~/slices/edit.slice';
import RootConstants from '~/constants/root.constants';

export const Header: React.FC = () => {

    const info = useSelector((state: RootState) => selectInfo(state));
    const dispatch = useDispatch();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Info>
                    <EditButton
                        onClick={() => dispatch(setIsEdit(RootConstants.Info))}
                        title='name & job title'
                    />
                </Info>

                <Summary>
                    <EditButton
                        onClick={() => dispatch(setIsEdit(RootConstants.Summary))}
                        title={info.title}
                    />
                    <Title text={info.title}/>
                </Summary>
            </div>
            <Image styles={styles.img} isPolygon/>
        </header>
    )
}