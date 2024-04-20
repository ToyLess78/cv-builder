import styles from './EditWrapper.module.scss';
import React, { ReactNode } from 'react';
import { MainButton } from '~/components/common/Buttons/Buttons';

interface IEditeWrapperProps {
    preview: ReactNode;
    edit: ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    isGrow?: boolean;
}

export const EditWrapper: React.FC<IEditeWrapperProps> = ({preview, edit, onSubmit, isGrow = false}) => {
    return (
        <div className={ styles.wrapper }>
            <div style={{flexGrow: isGrow ? '1' : '0'}}>
            { preview }
            </div>
            <form className={ styles.form } onSubmit={ onSubmit }>
                { edit }
                <MainButton type='submit'>Save Changes</MainButton>
            </form>
        </div>
    );
};