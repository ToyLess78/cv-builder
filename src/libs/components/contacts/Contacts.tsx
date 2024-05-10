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
import { CollapsedWrapper } from '~/components/common/CollapsedWrapper/CollapsedWrapper';

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
    const iconClass = (isSocials) ? styles.opacity  : styles.visible;
    const letterClass = (!isSocials) ? styles.opacity  : styles.visible;

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
                <li>
                    {!isIcons && <div className={styles.icon}>
                        <FaLocationDot className={isSocials ? styles.opacity  : styles.visible} /><span className={!isSocials ? styles.opacity : styles.visible}>L: </span>
                    </div>}
                    {isIcons && <FaLocationDot className={styles.visible} />}
                    <a href={ `https://www.google.com/maps/search/?api=1&query=${ contacts.location }` }>{ contacts.location }</a>

                </li>

                <li>
                    <div className={styles.icon}>
                        <IoMailSharp className={iconClass} style={ {bottom: '-.1rem'} }/><span className={letterClass}>E:  </span>
                    </div>
                    <a href={ `mailto:${ contacts.email }` }>{ contacts.email }</a>

                </li>

                <li>
                    <div className={styles.icon}>
                        <FaPhone className={isSocials ? styles.opacity  : styles.visible}/><span className={!isSocials ? styles.opacity : styles.visible}>T: </span>
                    </div>
                    <a href={ `tel:${ contacts.phone }` }>{ contacts.phone }</a>

                </li>
                <CollapsedWrapper
                    isShow={ isSocials }
                    content={ <li>
                        <Social data={ contacts }/>
                    </li> }
                />

                { !isSocials && !data && social &&
                    <ShowButton
                        title={ RootConstants.Social }
                        offset={ 20 }
                        onClick={ handleSetIsSocial }
                    />
                }

            </ul>
        </AsideItem>

    )
}