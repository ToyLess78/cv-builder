import React, { ReactNode } from 'react';
import { FaFacebook, FaGithub, FaLinkedin, FaPhone, FaRegEdit, FaTelegramPlane } from 'react-icons/fa';
import { FaLocationDot, FaXTwitter } from 'react-icons/fa6';
import { IoMailSharp } from 'react-icons/io5';
import { BiHide } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { selectContacts, setIsSocials } from '../../redux/slices/contactSlice';
import { MdOutlineVisibility } from 'react-icons/md';
import { AsideItem } from '../Aside/AsideItem';

interface ContactProps {
    isIcons?: boolean;
    children: ReactNode;
}

export const Contacts: React.FC<ContactProps> = ({ isIcons = false, children }) => {
    const contacts = useSelector((state: RootState) => selectContacts(state));
    const { isSocials, isGithub, isLinkedin, isTelegram, isTwitter, isFacebook } = contacts;
    const dispatch = useDispatch();
    const handleSetIsSocial = () => {
        dispatch(setIsSocials(!isSocials));
    };

    return (
        <AsideItem>
            <FaRegEdit
                className='edite'
                data-tooltip-id='tooltip'
                data-tooltip-content='Edite Contact'
                data-tooltip-offset={0}
            />

            {isSocials &&

                <BiHide
                    size='1.2rem'
                    className='hide'
                    data-tooltip-id='tooltip'
                    data-tooltip-content='Hide Social'
                    data-tooltip-offset={20}
                    onClick={handleSetIsSocial}
                />}

            {children}

            <ul className='contact'>
                <li>{!isSocials || isIcons ?

                    <FaLocationDot className='icon'/> : 'L: '}
                    <a href={`https://www.google.com/maps/search/?api=1&query=${contacts.location}`}>{contacts.location}</a>

                </li>

                <li>{!isSocials || isIcons ?

                    <IoMailSharp className='icon' style={{ marginBottom: '-.1rem' }}/> : 'E: '}
                    <a href={`mailto:${contacts.email}`}>{contacts.email}</a>

                </li>

                <li>{!isSocials || isIcons ?

                    <FaPhone className='icon'/> : 'T: '}
                    <a href={`tel:${contacts.phone}`}>{contacts.phone}</a>

                </li>

                {isSocials ?

                    <li className='social'>

                        {isGithub &&
                            <a href={contacts.github}>
                                <FaGithub size='1.3rem'/></a>}

                        {isLinkedin &&
                            <a href={contacts.linkedin}>
                                <FaLinkedin size='1.3rem'/></a>}

                        {isTelegram &&
                            <a href={contacts.telegram}>
                                <FaTelegramPlane size='1.3rem'/></a>}

                        {isTwitter &&
                            <a href={contacts.twitter}>
                                <FaXTwitter size='1.3rem'/></a>}

                        {isFacebook &&
                            <a href={contacts.facebook}>
                                <FaFacebook size='1.3rem'/></a>}
                    </li> :

                    <MdOutlineVisibility
                        size='1.2rem'
                        className='hide'
                        data-tooltip-id='tooltip'
                        data-tooltip-content='Show Social'
                        data-tooltip-offset={20}
                        onClick={handleSetIsSocial}
                    />
                }

            </ul>
        </AsideItem>

    )
}