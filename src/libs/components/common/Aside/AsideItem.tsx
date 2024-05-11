import React, { ReactNode } from 'react';
import styles from './Aside.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectTheme } from '~/slices/theme.slice';

interface IAsideItemProps {
    children?: ReactNode | undefined;
}

export const AsideItem: React.FC<IAsideItemProps> = ({children}) => {
    const themeState = useSelector((state: RootState) => selectTheme(state));
    const template = themeState.template;


    return (
        <div className={`${styles.item} ${styles[template]}`}>
            { children }
        </div>
    );
};