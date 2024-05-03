import React, { ReactNode } from 'react';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectInfo } from '~/slices/info.slice';

interface IAboutProps {
    summary: string
}

export const Summary: React.FC<{ children?: ReactNode, props?: IAboutProps }> = ({children, props}) => {

    const info = useSelector((state: RootState) => selectInfo(state));

    return (
        <section className={styles.summary}>
            {children}
            <div dangerouslySetInnerHTML={{ __html: props?.summary || info.summary }}></div>
        </section>
    )
}