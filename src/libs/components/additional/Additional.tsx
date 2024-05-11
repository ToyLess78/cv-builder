import React, { ReactNode } from 'react';
import { AdditionalList, AsideItem, CollapsedWrapper, EditButton, HideButton, ShowAsideButton } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectSkills, setIsAdditional } from '~/slices/skills.slice';
import { setIsEdit } from '~/slices/edit.slice';
import RootConstants from '~/constants/root.constants';

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
                    toggleClass
                /> }
            { aside?.additional &&
                <CollapsedWrapper
                    isShow={isAdditional}
                    buttons={
                        <>
                            <EditButton
                                onClick={ () => dispatch(setIsEdit(RootConstants.Additional)) }
                                title={ aside?.additional.title }
                            />
                            <HideButton
                                onClick={ handleSetIsAdditional }
                                title={ aside?.additional.title }
                            />
                        </>
                    }
                    content={
                        <AsideItem>
                            {children}
                            <AdditionalList {...aside.additional}/>
                        </AsideItem>
                    }
                />
            }
        </>
    );
};