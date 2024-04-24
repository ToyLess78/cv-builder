import React, { useState } from 'react';
import { BreezeTitle, CheckBox, Contacts, EditWrapper, UnderlineInput } from '~/components';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectContacts } from '~/slices/contactSlice';
import styles from './Contacts.module.scss';
import { TabPanel, TabView } from 'primereact/tabview';
import { SpeedDial } from 'primereact/speeddial';
import { MenuItem } from 'primereact/menuitem';
import { IconsMap } from '~/components/contacts/IconsMap';

const EditContacts: React.FC = () => {
    const contactState = useSelector((state: RootState) => selectContacts(state));
    const [contacts, setContacts] = useState(contactState);

    const setLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContacts({...contacts, location: e.currentTarget.value});
    };
    const setIsSocials = () => {
        setContacts({...contacts, isSocials: !contacts.isSocials});
    };

    const setEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContacts({...contacts, email: e.currentTarget.value});
    };

    const setPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContacts({...contacts, phone: e.currentTarget.value});
    };

    const editLink = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        setContacts({
            ...contacts,
            data: contacts.data.map(x => (x.id === id ? {...x, link: e.currentTarget.value} : x))
        });
    };

    const setIsShow = (id: string) => {
        setContacts({...contacts, data: contacts.data.map(x => (x.id === id ? {...x, isShow: !x.isShow} : x))});
    };

    const menuItems: MenuItem[] = contacts.data
        .filter(s => s.isShow === false)
        .map(s => (
            {
                label: s.id,
                icon: IconsMap.get(s?.id),
                command: () => setIsShow(s?.id)
            }
        ));

    return (
        <EditWrapper
            preview={
                <Contacts data={ contacts }>
                    <BreezeTitle text="contacts"/>
                </Contacts>
            }
            edit={
                <div className={ styles.wrapper }>
                    <div className={ styles.column }>
                        <UnderlineInput
                            label="location"
                            value={ contacts.location }
                            onChange={ setLocation }
                        />

                        <UnderlineInput
                            type="email"
                            label="email"
                            value={ contacts.email }
                            onChange={ setEmail }
                        />

                        <UnderlineInput
                            label="phone"
                            type="tel"
                            value={ contacts.phone }
                            onChange={ setPhone }
                        />

                        <CheckBox
                            checked={ contacts.isSocials }
                            onChange={ setIsSocials }
                            title="Show socials"
                        />
                    </div>

                    { contacts.isSocials &&
                        <>
                            <SpeedDial
                                model={ menuItems } direction="left"
                                className={ styles.menu }
                                data-tooltip-id="tooltip"
                                data-tooltip-content="Add social"/>

                            <TabView className={ styles.tab }>
                                { contacts.data?.map((s) => {
                                    return (
                                        s.isShow &&
                                        <TabPanel
                                            className={ styles.item } key={ s.id }
                                            header={ IconsMap.get(s?.id) }>
                                            <div style={ {padding: '2.5rem 0'} }>
                                                <UnderlineInput
                                                    label={ s.id }
                                                    type="link"
                                                    value={ s.link }
                                                    onChange={ (e) => editLink(e, s.id) }
                                                />
                                            </div>
                                            <CheckBox
                                                checked={ s.isShow }
                                                onChange={ () => setIsShow(s?.id) }
                                                title={ s.id }
                                            />
                                        </TabPanel>
                                    );
                                }) }
                            </TabView>
                        </> }
                </div>

            }
        />
    )
};

export default EditContacts;