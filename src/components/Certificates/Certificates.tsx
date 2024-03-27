import React, { ReactNode } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { selectCertificates, setIsCertificates } from '../../redux/slices/certificatesSlice';
import { MdOutlineVisibility } from 'react-icons/md';
import { AsideItem } from '../Aside/AsideItem';
import { FaRegEdit } from 'react-icons/fa';
import { BiHide } from 'react-icons/bi';

interface ICertificatesProps {
    children: ReactNode;
}

export const Certificates: React.FC<ICertificatesProps> = ({ children }) => {
    const certificates = useSelector((state: RootState) => selectCertificates(state));
    const {isCertificates} = certificates;
    const dispatch = useDispatch();
    const handleSetIsCertificates = () => {
        dispatch(setIsCertificates(!isCertificates));
    };

    return(
        <>
            {!isCertificates &&
                <div className='show'>
                    <MdOutlineVisibility
                        size='1.2rem'
                        className='hide'
                        data-tooltip-id='tooltip'
                        data-tooltip-content={`Show ${certificates.title}`}
                        data-tooltip-offset={0}
                        onClick={handleSetIsCertificates}
                    />
                </div>}

            {isCertificates &&
                <AsideItem>
                    <FaRegEdit
                        className='edite'
                        data-tooltip-id='tooltip'
                        data-tooltip-content={`Edite ${certificates.title}`}
                        data-tooltip-offset={0}
                    />
                    <BiHide
                        size='1.2rem'
                        className='hide'
                        data-tooltip-id='tooltip'
                        data-tooltip-content={`Hide ${certificates.title}`}
                        data-tooltip-offset={20}
                        onClick={handleSetIsCertificates}
                    />

                    { children }
                    <ul className={certificates.title}>
                        {certificates.data?.map(c => {
                            return <li key={c.id}>
                                <p>{c.title}</p>
                                <a href={c.link}><span>{c.issue}</span><FiExternalLink /></a>
                            </li>
                        })}
                    </ul>
                </AsideItem>}

        </>
    )

}