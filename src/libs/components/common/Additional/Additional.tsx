import React, { ReactNode } from 'react';
import { MdOutlineVisibility } from 'react-icons/md';
import { AdditionalList, AsideItem } from '~/components/components';
import { FaRegEdit } from 'react-icons/fa';
import { BiHide } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectAside, setIsAdditional } from '~/slices/asideSlice';
import { setIsEdite } from '~/slices/editeSlice';

interface IAdditionalProps {
    children: ReactNode;
}

export const Additional: React.FC<IAdditionalProps> = ({ children }) => {

    const aside = useSelector((state: RootState) => selectAside(state));
    const isAdditional = aside.additional.isAdditional;

    const dispatch = useDispatch();

    const handleSetIsAdditional = () => {
        dispatch(setIsAdditional(!isAdditional));
    };

    return (
        <>
            {!isAdditional &&
                <div className='show'>
                    <MdOutlineVisibility
                        size='1.2rem'
                        className='hide'
                        data-tooltip-id='tooltip'
                        data-tooltip-content={`Show ${aside?.additional.title}`}
                        data-tooltip-offset={0}
                        onClick={handleSetIsAdditional}
                    />
                </div>}
            {aside?.additional && isAdditional &&
                <AsideItem>
                    {isAdditional &&
                        <>
                            <FaRegEdit
                                className='edite'
                                data-tooltip-id='tooltip'
                                data-tooltip-content={`Edite ${aside?.additional.title}`}
                                data-tooltip-offset={0}
                                onClick={() => dispatch(setIsEdite('additional'))}
                            />
                            <BiHide
                                size='1.2rem'
                                className='hide'
                                data-tooltip-id='tooltip'
                                data-tooltip-content={`Hide ${aside?.additional.title}`}
                                data-tooltip-offset={20}
                                onClick={handleSetIsAdditional}
                            />
                        </>}
                    {children}
                    <AdditionalList {...aside.additional}/>
                </AsideItem>
            }
        </>
    );
};