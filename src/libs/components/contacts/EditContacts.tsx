import React, { useState } from 'react';
import { BreezeTitle, CheckBox, Contacts, EditWrapper, UnderlineInput } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectContacts, setContacts } from '~/slices/contactSlice';
import styles from './Contacts.module.scss';
import { TabPanel, TabView } from 'primereact/tabview';
import { SpeedDial } from 'primereact/speeddial';
import { MenuItem } from 'primereact/menuitem';
import { IconsMap } from '~/components/contacts/IconsMap';
import { setIsEdit } from '~/slices/editSlice';

const EditContacts: React.FC = () => {
    const contactState = useSelector((state: RootState) => selectContacts(state));
    const [editContacts, setEditContacts] = useState(contactState);

    const setLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditContacts({...editContacts, location: e.currentTarget.value});
    };
    const setIsSocials = () => {
        setEditContacts({...editContacts, isSocials: !editContacts.isSocials});
    };

    const setEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditContacts({...editContacts, email: e.currentTarget.value});
    };

    const setPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditContacts({...editContacts, phone: e.currentTarget.value});
    };

    const editLink = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        setEditContacts({
            ...editContacts,
            data: editContacts.data.map(x => (x.id === id ? {...x, link: e.currentTarget.value} : x))
        });
    };

    const setIsShow = (id: string) => {
        setEditContacts({...editContacts, data: editContacts.data.map(x => (x.id === id ? {...x, isShow: !x.isShow} : x))});
    };

    const dispatch = useDispatch();

    const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setContacts(editContacts));
        dispatch(setIsEdit(''));
    };

    const menuItems: MenuItem[] = editContacts.data
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
                <Contacts data={ editContacts }>
                    <BreezeTitle text="contacts"/>
                </Contacts>
            }
            edit={
                <div className={ styles.wrapper }>
                    <div className={ styles.column }>
                        <UnderlineInput
                            label="location"
                            value={ editContacts.location }
                            onChange={ setLocation }
                        />

                        <UnderlineInput
                            type="email"
                            label="email"
                            value={ editContacts.email }
                            onChange={ setEmail }
                        />

                        <UnderlineInput
                            label="phone"
                            type="tel"
                            value={ editContacts.phone }
                            onChange={ setPhone }
                        />

                        <CheckBox
                            checked={ editContacts.isSocials }
                            onChange={ setIsSocials }
                            title="Show socials"
                        />
                    </div>

                    { editContacts.isSocials &&
                        <>
                            <SpeedDial
                                model={ menuItems } direction="left"
                                className={ styles.menu }
                                data-tooltip-id="tooltip"
                                data-tooltip-content="Add social"
                                data-tooltip-place='top-end'
                                />

                            <TabView className={ styles.tab }>
                                { editContacts.data?.map((s) => {
                                    return (
                                        s.isShow &&
                                        <TabPanel
                                            className={ styles.item }
                                            key={ s.id }
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
            onSubmit={ handlerOnSubmit }
        />
    )
};

export default EditContacts;