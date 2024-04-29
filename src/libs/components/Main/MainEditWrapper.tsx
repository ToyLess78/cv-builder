import React, { FC, ReactNode } from 'react';
import styles from './Main.module.scss';
import { MainButton } from '~/components';

interface IMainEditWrapperProps {
    preview?: ReactNode;
    edit?: ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    style?: React.CSSProperties;
}

export const MainEditWrapper: FC<IMainEditWrapperProps> = ({preview, onSubmit, edit, style = {width: '70%'}}) => {
    return (
        <div className={ styles.wrapper } style={ style }>
            { preview }
            <form className={ styles.form } onSubmit={ onSubmit }>
                { edit }
                <MainButton type="submit">Save Changes</MainButton>
            </form>
        </div>
    );
};