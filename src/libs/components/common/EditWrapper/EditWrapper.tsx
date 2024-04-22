import styles from './EditWrapper.module.scss';
import React, { ReactNode } from 'react';
import { MainButton } from '~/components/common/Buttons/Buttons';

interface IEditeWrapperProps {
    preview: ReactNode;
    edit: ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    width?: string;
}

export const EditWrapper: React.FC<IEditeWrapperProps> = ({preview, edit, onSubmit, width = '70%'}) => {
    return (
        <div className={ styles.wrapper }>
            { preview }
            <form className={ styles.form } onSubmit={ onSubmit } style={ {width: width} }>
                { edit }
                <MainButton type="submit">Save Changes</MainButton>
            </form>
        </div>
    );
};