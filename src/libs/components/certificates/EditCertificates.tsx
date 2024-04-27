import React, { useEffect, useState } from 'react';
import { AddButton, BreezeTitle, Certificates, EditWrapper, UnderlineInput } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectCertificates, setCertificatesData } from '~/slices/certificates.slice';
import nextId from 'react-id-generator';
import { setIsEdit } from '~/slices/edit.slice';

const EditCertificates: React.FC = () => {

    const stateCertificates = useSelector((state: RootState) => selectCertificates(state));

    const [certificates, setCertificates] = useState(stateCertificates.data);

    const [edited, setEdited] = useState(certificates[0]);

    const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEdited({...edited, title: e.currentTarget.value});
    };
    const setIssue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEdited({...edited, issue: e.currentTarget.value});
    };
    const setLink = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEdited({...edited, link: e.currentTarget.value});
    };

    const removeCertificate = (id: string) => {
        setEdited(certificates[0].id !== id ? certificates[0] : certificates[1]);
        setCertificates(certificates.filter(item => item.id !== id));
    };

    const editeCertificate = (id: string) => {
        !certificates[0].title.trim() && !certificates[0].issue.trim() && !certificates[0].link.trim() && removeCertificate(certificates[0].id)
        const certificate = certificates.find(x => x.id === id);
        certificate && setEdited(certificate);
    };

    const addCertificate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const certificate = {
            id: nextId(),
            title: '',
            issue: '',
            link: ''
        };
        setCertificates([certificate, ...certificates]);
        setEdited(certificate);
    };

    useEffect(() => {
        setCertificates(certificates.map(x => (x.id === edited.id) ? edited : x));
    }, [edited]);

    const dispatch = useDispatch();

    const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setCertificatesData(certificates));
        dispatch(setIsEdit(''));
    };

    return (
        <EditWrapper
            preview={
                < Certificates
                    data={ certificates }
                    onRemove={ removeCertificate }
                    onEdit={ editeCertificate }
                    edited={ edited }
                >
                    <BreezeTitle text={stateCertificates.title }/>
                </Certificates>
            }
            edit={
                <>
                    <AddButton
                        onClick={ addCertificate }
                        text={ 'New ' + stateCertificates.title }
                        style={{visibility: edited.title.trim() && edited.issue.trim() && edited.link.trim() ? 'visible' : 'hidden'}}
                    />
                    <UnderlineInput
                        label="title"
                        value={ edited.title }
                        onChange={ setTitle }
                    />
                    <UnderlineInput
                        label="issue"
                        value={ edited.issue }
                        onChange={ setIssue }
                    />
                    <UnderlineInput
                        label="link"
                        value={ edited.link }
                        onChange={ setLink }
                    />
                </>
            }
            onSubmit={ handlerOnSubmit }
        />
    );
};

export default EditCertificates;