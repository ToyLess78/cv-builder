import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectLanguages, setIsLanguages } from '~/slices/languagesSlice';
import { AsideItem } from '../../Aside/AsideItem';
import { FaRegEdit } from 'react-icons/fa';
import { BiHide } from 'react-icons/bi';
import nextId from 'react-id-generator';
import { MdOutlineVisibility } from 'react-icons/md';

interface ILanguagesProps {
    children: ReactNode;
}

export const Languages: React.FC<ILanguagesProps> = ({ children }) => {

    const languages = useSelector((state: RootState) => selectLanguages(state));
    const { isLanguages } = languages;
    const dispatch = useDispatch();
    const handleSetIsLanguages = () => {
        dispatch(setIsLanguages(!isLanguages));
    };

    return (
        <>
            {!isLanguages &&
                <div className='show'>
                    <MdOutlineVisibility
                        size='1.2rem'
                        className='hide'
                        data-tooltip-id='tooltip'
                        data-tooltip-content='Show Languages'
                        data-tooltip-offset={0}
                        onClick={handleSetIsLanguages}
                    />
                </div>}
            {languages && isLanguages &&
                <AsideItem>
                    {isLanguages &&
                        <>
                            <FaRegEdit
                                className='edit'
                                data-tooltip-id='tooltip'
                                data-tooltip-content='Edit Languages'
                                data-tooltip-offset={0}
                            />
                            <BiHide
                                size='1.2rem'
                                className='hide'
                                data-tooltip-id='tooltip'
                                data-tooltip-content='Hide Languages'
                                data-tooltip-offset={20}
                                onClick={handleSetIsLanguages}
                            />
                        </>}
                    {children}
                    <ul className='languages'>
                        {languages.data?.map(l => {
                            return <li key={nextId()}><span>{l[0]}</span><p>{l[1]}</p></li>
                        })}
                    </ul>
                </AsideItem>
            }
        </>
    );
};