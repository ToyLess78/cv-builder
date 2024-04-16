import styles from './EditeWrapper.module.scss';
import React, { ReactNode } from 'react';
import { MainButton } from '~/components/common/Buttons/Buttons';

interface IEditeWrapperProps {
    preview: ReactNode;
    edite: ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const EditeWrapper: React.FC<IEditeWrapperProps> = ({preview, edite, onSubmit}) => {
    return (
        <div className={ styles.wrapper }>
            { preview }
            <form className={ styles.form } onSubmit={ onSubmit }>
                { edite }
                <MainButton type='submit'>Save Changes</MainButton>
            </form>
        </div>
    );
};