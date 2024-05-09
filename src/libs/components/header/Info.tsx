import React, { ReactNode } from 'react';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectInfo } from '~/slices/info.slice';
import { selectTheme } from '~/slices/theme.slice';

interface IInfoProps {
        firstname: string;
        lastname: string;
        position: string;
}
export const Info: React.FC<{ children?: ReactNode, props?:  IInfoProps}> = ({children, props}) => {

    const info = useSelector((state: RootState) => selectInfo(state));
    const {template} = useSelector((state: RootState) => selectTheme(state));

    return (
        <section className={`${styles.info} ${styles[template]}`}>
            {children}
            <h2>{`${props?.firstname || info.firstname} ${props?.lastname || info.lastname}`}</h2>
            <h4>{props?.position || info.position}</h4>
        </section>
    )
}