import React, { useEffect, useState } from 'react';
import { CheckBox, CollapsedWrapper, Contacts, EditWrapper, Title, UnderlineInput } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectContacts, setContacts } from '~/slices/contacts.slice';
import styles from './Contacts.module.scss';
import { TabPanel, TabView } from 'primereact/tabview';
import { SpeedDial } from 'primereact/speeddial';
import { MenuItem } from 'primereact/menuitem';
import { IconsMap } from '~/components/contacts/IconsMap';
import { setIsEdit } from '~/slices/edit.slice';
import RootConstants from '~/constants/root.constants';
import { selectTheme } from '~/slices/theme.slice';

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
        setActiveIndex(activeIndex ? activeIndex -1 : 1)
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


    const [activeIndex, setActiveIndex] = useState<number>((editContacts.data
        .map((x, i) => x.isShow === true ? i : -1)
        .filter(index => index !== -1))[0]);

    useEffect(() => {
        setActiveIndex((editContacts.data
            .map((x, i) => x.isShow === true ? i : -1)
            .filter(index => index !== -1))[0]);
    }, [editContacts.data])

    const {template} = useSelector((state: RootState) => selectTheme(state));

    return (
        <EditWrapper
            preview={
                <Contacts data={ editContacts }>
                    <Title text={ RootConstants.Contacts }/>
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
                    <CollapsedWrapper
                        isShow={editContacts.isSocials}
                        content={
                            <>
                                <SpeedDial
                                    model={ menuItems } direction="left"
                                    className={ `${styles.menu} ${styles[template]}` }
                                    data-tooltip-id="tooltip"
                                    data-tooltip-content="Add social"
                                    data-tooltip-place='top-end'
                                />

                                <TabView
                                    className={ `${styles.tab} ${styles[template]}` }
                                    activeIndex={activeIndex}
                                    onTabChange={(e) => {
                                        setActiveIndex(e.index);
                                    }}>
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
                                                    onChange={ () => {
                                                        setIsShow(s?.id);
                                                    } }
                                                    title={ s.id }
                                                />
                                            </TabPanel>
                                        );
                                    }) }
                                </TabView>

                            </>
                        }
                    />

                </div>
            }
            onSubmit={ handlerOnSubmit }
        />
    )
};

export default EditContacts;