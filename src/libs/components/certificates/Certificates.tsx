import React, { ReactNode } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { ICertificate, selectCertificates, setIsCertificates } from '~/slices/certificatesSlice';
import { AsideItem } from '../Aside/AsideItem';
import { EditeButton, EditeButtonsBox, HideButton, ShowButton } from '~/components/common/Buttons/Buttons';
import styles from './Certificates.module.scss';
import { setIsEdite } from '~/slices/editeSlice';

interface ICertificatesProps {
    children: ReactNode;
    data?: ICertificate[] | null;
    onRemove?: (id: string) => void;
    onEdite?: (id: string) => void;
    edited?: ICertificate;
}

export const Certificates: React.FC<ICertificatesProps> = ({children, data = null,  onRemove, onEdite, edited}) => {
    const certificates = useSelector((state: RootState) => selectCertificates(state));
    const {isCertificates} = certificates;
    const dispatch = useDispatch();
    const handleSetIsCertificates = () => {
        dispatch(setIsCertificates(!isCertificates));
    };

    return (
        <>

            { !isCertificates &&
                <ShowButton
                    onClick={ handleSetIsCertificates }
                    title={ certificates.title }
                /> }

            { isCertificates && !data &&
                <AsideItem>
                    <EditeButton
                        title={ certificates.title }
                        onClick={ () => dispatch(setIsEdite('certificates')) }
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
                                <EditeButtonsBox
                                    onRemove={onRemove ? () => onRemove(c.id) : undefined}
                                    onEdite={onEdite ? () => onEdite(c.id) : undefined}
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