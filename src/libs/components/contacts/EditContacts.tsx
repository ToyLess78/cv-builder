import React, { useState } from 'react';
import { BreezeTitle, Contacts, EditWrapper, UnderlineInput } from '~/components';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectContacts } from '~/slices/contactSlice';
import styles from './Contacts.module.scss';

const EditContacts: React.FC = () => {
    const contactState = useSelector((state: RootState) => selectContacts(state));
    const [contacts, setContacts] = useState(contactState);

    const setLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContacts({...contacts, location: e.currentTarget.value});
    };

    const setEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContacts({...contacts, email: e.currentTarget.value});
    };

    const setPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContacts({...contacts, phone: e.currentTarget.value});
    };


    // Object.entries(contacts).map(([key, value]) => {
    //     if (!key.startsWith('is')) {
    //         console.log(key, value);
    //     }
    // });
    //
    // Object.entries(contacts).map(([key, value]) => {
    //     if (typeof value !== 'boolean') {
    //         console.log(key, value);
    //     }
    // });

    Object.entries(contacts).map(([key, value]) =>
        typeof value !== 'boolean' && console.log(key, value)
    );

    return (
        <EditWrapper
            preview={
                <Contacts data={contacts}>
                    <BreezeTitle text='contacts'/>
                </Contacts>
            }
            edit={
                <>
                    <div className={styles.items}>
                        <UnderlineInput
                            label='location'
                            value={contacts.location}
                            onChange={setLocation}
                        />
                    </div>

                    <div className={styles.items}>
                        <UnderlineInput
                            type='email'
                            label='email'
                            value={contacts.email}
                            onChange={setEmail}
                        />
                    </div>

                    <div className={styles.items}>
                        <UnderlineInput
                            label='phone'
                            type='tel'
                            value={contacts.phone}
                            onChange={setPhone}
                        />
                    </div>


                </>

            }
        />
    )
};

export default EditContacts;