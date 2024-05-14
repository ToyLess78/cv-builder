import React, { CSSProperties, ReactNode } from 'react';
import styles from './Aside.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectTheme } from '~/slices/theme.slice';

interface IAsideItemProps {
    children?: ReactNode | undefined;
    style?: CSSProperties;
}

export const AsideItem: React.FC<IAsideItemProps> = ({children, style}) => {
    const themeState = useSelector((state: RootState) => selectTheme(state));
    const template = themeState.template;


    return (
        <div className={ `${ styles.item } ${ styles[template] }` } style={ style }>
            { children }
        </div>
    );
};