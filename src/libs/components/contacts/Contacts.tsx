import React, { ReactNode } from 'react';
import { FaFacebook, FaGithub, FaLinkedin, FaPhone, FaTelegramPlane } from 'react-icons/fa';
import { FaLocationDot, FaXTwitter } from 'react-icons/fa6';
import { IoMailSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { ContactsState, selectContacts, setIsSocials } from '~/slices/contactSlice';
import { AsideItem } from '~/components/common/Aside/AsideItem';
import styles from './Contacts.module.scss';
import { EditButton, HideButton, ShowButton } from '~/components/common/Buttons/Buttons';
import { setIsEdit } from '~/slices/editSlice';

interface ISocialProps {
    data?: ContactsState | null;
}

interface IContactProps extends ISocialProps {
    isIcons?: boolean;
    children: ReactNode;
    social?: boolean;
}

export const Social: React.FC<ISocialProps> = ({data = null}) => {
    const contactState = useSelector((state: RootState) => selectContacts(state));
    const contacts = data || contactState;
    const {isSocials, isGithub, isLinkedin, isTelegram, isTwitter, isFacebook} = contacts;
    return (
        <>
            { isSocials &&
                <div className={ styles.social }>

                    { isGithub &&
                        <a href={ contacts?.github }>
                            <FaGithub size='1.3rem'/></a> }

                    { isLinkedin &&
                        <a href={ contacts?.linkedin }>
                            <FaLinkedin size='1.3rem'/></a> }

                    { isTelegram &&
                        <a href={ contacts?.telegram }>
                            <FaTelegramPlane size='1.3rem'/></a> }

                    { isTwitter &&
                        <a href={ contacts?.twitter }>
                            <FaXTwitter size='1.3rem'/></a> }

                    { isFacebook &&
                        <a href={ contacts?.facebook }>
                            <FaFacebook size='1.3rem'/></a> }
                </div>
            }
        </>
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

    return (
        <AsideItem>
            { !data &&
                <EditButton
                    title='Contacts'
                    onClick={ () => dispatch(setIsEdit('contacts')) }
                />}

            {isSocials && !data && social &&
                <HideButton
                    onClick={ handleSetIsSocial }
                    title='Social'
                />}


            { children }

            <ul className={ styles.contact }>
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

                { isSocials && social ?

                    <li>
                        <Social/>
                    </li> :

                    !data && social &&
                    <ShowButton
                        title='Social'
                        offset={ 20 }
                        onClick={ handleSetIsSocial }
                    />
                }

            </ul>
        </AsideItem>

    )
}