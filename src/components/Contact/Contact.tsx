import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaPhone, FaTelegramPlane } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMailSharp } from 'react-icons/io5';
import { BiHide } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store.ts';
import { selectContact } from '../../redux/slices/contactSlice.ts';

interface ContactProps {
    isIcons?: boolean
}

export const Contact: React.FC<ContactProps> = ({ isIcons = false }) => {
    const [isSocial, setIsSocial] = useState(true);
    const contact = useSelector((state: RootState) => selectContact(state));

    return (
        <ul className='contact'>
            <li>{isIcons ? <FaLocationDot className='icon'/> : 'L: '}<a
                href={`https://www.google.com/maps/search/?api=1&query=${contact.location}`}>{contact.location}</a>
            </li>
            <li>{isIcons ? <IoMailSharp className='icon' style={{marginBottom: '-.1rem'}}/> : 'E: '}<a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li>{isIcons ? <FaPhone className='icon'/> : 'T: '}<a href={`tel:${contact.phone}`}>{contact.phone}</a></li>
            {isSocial &&
                <li className='social'>
                    <BiHide
                        size='1.2rem'
                        className='hide'
                        data-tooltip-id='tooltip'
                        data-tooltip-content='Hide Social'
                        data-tooltip-offset={-1}
                        data-tooltip-place='bottom'
                        onClick={() => setIsSocial(!isSocial)}
                    />
                    <a href={contact.github}><FaGithub size='1.3rem'/></a>
                    <a href={contact.linkedin}><FaLinkedin size='1.3rem'/></a>
                    <a href={contact.telegram}><FaTelegramPlane size='1.3rem'/></a>
                </li>
            }


        </ul>

    )
}