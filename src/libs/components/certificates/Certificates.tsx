import React, { ReactNode } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { ICertificate, selectCertificates, setIsCertificates } from '~/slices/certificatesSlice';
import { AsideItem } from '~/components/common/Aside/AsideItem';
import { EditButton, EditButtonsBox, HideButton, ShowAsideButton } from '~/components/common/Buttons/Buttons';
import styles from './Certificates.module.scss';
import { setIsEdit } from '~/slices/editSlice';

interface ICertificatesProps {
    children: ReactNode;
    data?: ICertificate[] | null;
    onRemove?: (id: string) => void;
    onEdit?: (id: string) => void;
    edited?: ICertificate;
}

export const Certificates: React.FC<ICertificatesProps> = ({children, data = null,  onRemove, onEdit, edited}) => {
    const certificates = useSelector((state: RootState) => selectCertificates(state));
    const {isCertificates} = certificates;
    const dispatch = useDispatch();
    const handleSetIsCertificates = () => {
        dispatch(setIsCertificates(!isCertificates));
    };

    return (
        <>

            { !isCertificates &&
                <ShowAsideButton
                    onClick={ handleSetIsCertificates }
                    title={ certificates.title }
                /> }

            { isCertificates && !data &&
                <AsideItem>
                    <EditButton
                        title={ certificates.title }
                        onClick={ () => dispatch(setIsEdit('certificates')) }
                    />
                    <HideButton
                        onClick={ handleSetIsCertificates }
                        title={ certificates.title }
                    />

                    { children }
                    <ul className={ certificates.title }>
                        { certificates.data?.map(c => {
                            return <li key={ c.id }>
                                <p>{ c.title }</p>
                                <a href={ c.link }><span>{ c.issue }</span><FiExternalLink/></a>
                            </li>;
                        }) }
                    </ul>
                </AsideItem> }
            { isCertificates && data &&

                <AsideItem>

                    { children }
                    <ul className={ styles.certificates }>
                        { data?.map(c => {
                            return <li key={ c.id }>
                                <EditButtonsBox
                                    onRemove={onRemove ? () => onRemove(c.id) : undefined}
                                    onEdit={onEdit ? () => onEdit(c.id) : undefined}
                                    editeStyle={{visibility: c.id === edited?.id ? 'hidden' : 'visible'}}
                                    removeStyle={{visibility: c.issue.length &&  c.title.length ? 'visible' : 'hidden'}}
                                />
                                <p>{ c.title }</p>
                                {c.issue.length ? <a href={ c.link }><span>{ c.issue }</span><FiExternalLink/></a> : ''}
                            </li>;
                        }) }
                    </ul>
                </AsideItem> }

        </>
    )

}