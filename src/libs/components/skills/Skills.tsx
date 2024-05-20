import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { ISkillsState, selectSkills } from '~/slices/skills.slice';
import { AsideItem } from '~/components/common/Aside/AsideItem';
import nextId from 'react-id-generator';
import styles from './Skills.module.scss';
import { EditButton } from '~/components/common/Buttons/Buttons';
import { setIsEdit } from '~/slices/edit.slice';
import RootConstants from '~/constants/root.constants';
import TemplateConstants from '~/constants/template.constants';
import { selectTheme } from '~/slices/theme.slice';

interface ISkillsProps {
    children?: ReactNode;
    isButtons?: boolean;
    data?: ISkillsState;
    isAdditional?: boolean;
}

export const Skills: React.FC<ISkillsProps> = ({children, isButtons = true, isAdditional = false, data}) => {

    const aside = useSelector((state: RootState) => selectSkills(state));
    const dispatch = useDispatch();

    const {template} = useSelector((state: RootState) => selectTheme(state));

    const height = (template === TemplateConstants.Breeze && !isAdditional) ? '4.7rem' :
        (template === TemplateConstants.Breeze && isAdditional) ? '7.4rem' : 'auto';

    return (
        <>
            { isButtons &&
                <AsideItem style={ {minHeight: height} }>
                    <EditButton
                        title={ aside?.skills.title }
                        onClick={ () => dispatch(setIsEdit(RootConstants.Skills)) }
                    />

                    { children }
                    { aside?.skills.data.length ? <ul
                        className={ styles.skills }>
                        { aside?.skills.data?.map(s => {
                            return <li key={ nextId() }>{ s }</li>;
                        }) }
                    </ul> : '' }

                </AsideItem> }

            { !isButtons &&
                <AsideItem style={ {minHeight: height, flexGrow: '1', padding: '2rem'} }>

                    { children }
                    { data?.data.length ? <ul
                        className={ styles.skills }>
                        { data?.data?.map(s => {
                            return <li key={ nextId() }>{ s }</li>;
                        }) }
                    </ul> : '' }

                </AsideItem> }

        </>
    );
};
