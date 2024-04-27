import React, { ReactNode } from 'react';
import { AdditionalList, AsideItem, EditButton, HideButton, ShowAsideButton } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectSkills, setIsAdditional } from '~/slices/skills.slice';
import { setIsEdit } from '~/slices/edit.slice';

interface IAdditionalProps {
    children: ReactNode;
}

export const Additional: React.FC<IAdditionalProps> = ({ children }) => {

    const aside = useSelector((state: RootState) => selectSkills(state));
    const isAdditional = aside.additional.isAdditional;

    const dispatch = useDispatch();

    const handleSetIsAdditional = () => {
        dispatch(setIsAdditional(!isAdditional));
    };

    return (
        <>
            { !isAdditional &&
                <ShowAsideButton
                    onClick={ handleSetIsAdditional }
                    title={ aside?.additional.title }
                /> }
            { aside?.additional && isAdditional &&
                <AsideItem>
                    { isAdditional &&
                        <>
                            <EditButton
                                onClick={ () => dispatch(setIsEdit('additional')) }
                                title={ aside?.additional.title }
                            />
                            <HideButton
                                onClick={ handleSetIsAdditional }
                                title={ aside?.additional.title }
                            />
                        </>}
                    {children}
                    <AdditionalList {...aside.additional}/>
                </AsideItem>
            }
        </>
    );
};