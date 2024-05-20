import React, { ReactNode } from 'react';
import styles from './Success.module.scss';
import { Image } from '~/components/common/Image/Image';
import { Info } from '~/components/header/Info';
import { EditButton } from '~/components/common/Buttons/Buttons';
import { setIsEdit } from '~/slices/edit.slice';
import RootConstants from '~/constants/root.constants';
import { useDispatch } from 'react-redux';
import { Contacts } from '~/components/contacts/Contacts';

interface ISuccessLayoutProps {
    main: ReactNode;
    aside: ReactNode;
}

export const SuccessLayout: React.FC<ISuccessLayoutProps> = ({main, aside}) => {

    const dispatch = useDispatch();

    return (
        <div className={ styles.success }>
            <div className={ styles.header }>
                <div className={ styles.left }></div>
                <div className={ styles.info }>
                    <Info>
                        <EditButton
                            onClick={ () => dispatch(setIsEdit(RootConstants.Info)) }
                            title="name & job title"
                        />
                    </Info>
                </div>
                <div className={ styles.right }></div>

                <div className={ styles.image }>
                    <Image styles={ styles.img }/>
                </div>
                <div className={ styles.contacts }>
                    <Contacts isLinkedIn isIcons/>
                </div>
            </div>
            <div className={ styles.body }>
                <div className={ styles.aside }>{ aside }</div>
                <div className={ styles.main }>{ main }</div>
            </div>
        </div>
    );
};