import React, { ReactNode } from 'react';
import { AdditionalList, AsideItem, CollapsedWrapper, EditButton, HideButton, ShowAsideButton } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectSkills, setIsAdditional } from '~/slices/skills.slice';
import { setIsEdit } from '~/slices/edit.slice';
import RootConstants from '~/constants/root.constants';
import TemplateConstants from '~/constants/template.constants';
import { selectTheme } from '~/slices/theme.slice';

interface IAdditionalProps {
    children: ReactNode;
}

export const Additional: React.FC<IAdditionalProps> = ({children}) => {

    const aside = useSelector((state: RootState) => selectSkills(state));
    const isAdditional = aside.additional.isAdditional;

    const dispatch = useDispatch();

    const handleSetIsAdditional = () => {
        dispatch(setIsAdditional(!isAdditional));
    };

    const {template} = useSelector((state: RootState) => selectTheme(state));

    return (
        <>
            { !isAdditional &&
                <ShowAsideButton
                    onClick={ handleSetIsAdditional }
                    title={ aside?.additional.title }
                    toggleClass
                /> }
            { aside?.additional ?
                <CollapsedWrapper
                    isShow={ isAdditional }
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
                        <AsideItem
                            style={ {minHeight: template === TemplateConstants.Breeze ? '7.4rem' : 'auto'} }>
                            { children }
                            <AdditionalList { ...aside.additional }/>
                        </AsideItem>
                    }
                /> : ''
            }
        </>
    );
};