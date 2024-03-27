import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store.ts';
import { selectAside } from '../../redux/slices/asideSlice.ts';
import { AsideItem } from '../Aside/AsideItem.tsx';
import { FaRegEdit } from 'react-icons/fa';
import nextId from 'react-id-generator';
import { BsArrowReturnRight } from 'react-icons/bs';

interface ISkillsProps {
    children?: ReactNode;
}

export const Skills: React.FC<ISkillsProps> = ({ children }) => {

    const aside = useSelector((state: RootState) => selectAside(state));

    return (
        <>
            {aside?.skills.data.length ?
                <AsideItem>

                    <FaRegEdit
                        className='edite'
                        data-tooltip-id='tooltip'
                        data-tooltip-content={`Edite ${aside?.skills.title}`}
                        data-tooltip-offset={0}
                    />
                    {children}
                    <ul>
                        {aside?.skills.data?.map(s => {
                            return <li key={nextId()}>{s}</li>
                        })}
                    </ul>

                </AsideItem> :
                <div className='empty'>
                    <BsArrowReturnRight
                        className='edite'
                        data-tooltip-id='tooltip'
                        data-tooltip-content={`Return default data ${aside?.skills.title}`}
                        data-tooltip-offset={0}
                    />
                </div>
            }

        </>
    );
};