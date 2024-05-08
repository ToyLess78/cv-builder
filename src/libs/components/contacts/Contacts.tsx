import React, { ReactNode } from 'react';
import { FaPhone } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMailSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { ContactsState, selectContacts, setIsSocials } from '~/slices/contacts.slice';
import { AsideItem } from '~/components/common/Aside/AsideItem';
import styles from './Contacts.module.scss';
import { EditButton, HideButton, ShowButton } from '~/components/common/Buttons/Buttons';
import { setIsEdit } from '~/slices/edit.slice';
import { IconsMap } from '~/components/contacts/IconsMap';
import RootConstants from '~/constants/root.constants';
import { selectTheme } from '~/slices/theme.slice';
import TemplateConstants from '~/constants/template.constants';

interface ISocialProps {
    data?: ContactsState | null;
}

interface IContactProps extends ISocialProps {
    isIcons?: boolean;
    children: ReactNode;
    social?: boolean;
}

export const Social: React.FC<ISocialProps> = ({data}) => {
    return (
        <div className={ styles.social }>

            { data?.data?.map(s => (
                    s?.isShow && <a key={ s?.id } href={ s?.link }>{ IconsMap.get(s?.id) }</a>
                )
            ) }
        </div>

    );
};

export const Contacts: React.FC<IContactProps> = ({isIcons = false, children, data = null, social = true}) => {
    const contactState = useSelector((state: RootState) => selectContacts(state));
    const contacts = data || contactState;
    const {isSocials} = contacts;
    const dispatch = useDispatch();
    const handleSetIsSocial = () => {
        dispatch(setIsSocials(!isSocials));
    };

    const {template} = useSelector((state: RootState) => selectTheme(state));

    return (
        <AsideItem>
            { !data &&
                <EditButton
                    title={RootConstants.Contacts}
                    onClick={ () => dispatch(setIsEdit(RootConstants.Contacts)) }
                />}

            {isSocials && !data && social &&
                <HideButton
                    onClick={ handleSetIsSocial }
                    title={RootConstants.Social}
                />}


            { children }

            <ul
                className={ styles.contacts }
                style={ {minHeight: template === TemplateConstants.Breeze ? '6.7rem' : 'auto'} }>
                <li>{ !isSocials || isIcons ?

                    <FaLocationDot className={ styles.icon }/> : 'L: ' }
                    <a href={ `https://www.google.com/maps/search/?api=1&query=${ contacts.location }` }>{ contacts.location }</a>

                </li>

                <li>{ !isSocials || isIcons ?

                    <IoMailSharp className={ styles.icon } style={ {marginBottom: '-.1rem'} }/> : 'E: ' }
                    <a href={ `mailto:${ contacts.email }` }>{ contacts.email }</a>

                </li>

                <li>{ !isSocials || isIcons ?

                    <FaPhone className={ styles.icon }/> : 'T: ' }
                    <a href={ `tel:${ contacts.phone }` }>{ contacts.phone }</a>

                </li>

                { isSocials ?

                    <li>
                        <Social data={ contacts }/>
                    </li> :

                    !data && social &&
                    <ShowButton
                        title={RootConstants.Social}
                        offset={ 20 }
                        onClick={ handleSetIsSocial }
                    />
                }

            </ul>
        </AsideItem>

    )
}