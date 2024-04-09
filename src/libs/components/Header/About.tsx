import React, { ReactNode } from 'react';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectInfo } from '~/slices/infoSlice';

interface IAboutProps {
    introduction: string
}

export const About: React.FC<{ children?: ReactNode, props?: IAboutProps }> = ({children, props}) => {

    const info = useSelector((state: RootState) => selectInfo(state));

    return (
        <section className={styles.about}>
            {children}
            <div dangerouslySetInnerHTML={{ __html: props?.introduction || info.introduction }}></div>
        </section>
    )
}