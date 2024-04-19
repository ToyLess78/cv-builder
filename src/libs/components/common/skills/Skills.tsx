import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { ISkillsState, selectSkills } from '~/slices/skillsSlice';
import { AsideItem } from '../../Aside/AsideItem';
import nextId from 'react-id-generator';
import styles from './Skills.module.scss';
import { EditButton, ReturnButton } from '~/components/common/Buttons/Buttons';
import { setIsEdit } from '~/slices/editSlice';

interface ISkillsProps {
    children?: ReactNode;
    isButtons?: boolean;
    data?: ISkillsState;
}

export const Skills: React.FC<ISkillsProps> = ({children, isButtons = true, data}) => {

    const aside = useSelector((state: RootState) => selectSkills(state));
    const dispatch = useDispatch();


    return (
        <>
            { isButtons && aside?.skills.data.length &&
                <AsideItem>
                    <EditButton
                        title={ aside?.skills.title }
                        onClick={ () => dispatch(setIsEdit('skills')) }
                    />

                    { children }
                    <ul className={ styles.skills }>
                        { aside?.skills.data?.map(s => {
                            return <li key={ nextId() }>{ s }</li>;
                        }) }
                    </ul>

                </AsideItem> }
            { isButtons && !aside?.skills.data.length &&
                <AsideItem>
                    { children }

                    <div className={ styles.empty }>
                        <ReturnButton title={ aside?.skills.title }/>
                    </div>
                </AsideItem> }

            { !isButtons && data?.data.length &&
                <AsideItem>

                    { children }
                    <ul className={ styles.skills }>
                        { data?.data?.map(s => {
                            return <li key={ nextId() }>{ s }</li>;
                        }) }
                    </ul>

                </AsideItem> }

        </>
    );
};
