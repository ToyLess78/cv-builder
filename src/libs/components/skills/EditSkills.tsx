import React, { useEffect, useState } from 'react';
import { selectSkills, setAdditional, setSkills } from '~/slices/skills.slice';
import styles from './Skills.module.scss';
import {
    AsideItem,
    AutoCompleteCustom,
    BreezeTitle,
    EditWrapper,
    Skills,
    StrongTitle,
    UnderlineInput
} from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { setIsEdit } from '~/slices/edit.slice';
import { selectTheme } from '~/slices/theme.slice';

interface IEditSkillsAutoCompleteProps {
    isAdditional?: boolean;
}

const EditSkills: React.FC<IEditSkillsAutoCompleteProps> =
    ({isAdditional = false}) => {

        const dispatch = useDispatch();
        const aside = useSelector((state: RootState) => selectSkills(state));
        const data = isAdditional ? aside.additional : aside.skills;
        const [isSkills, setIsSkills] = useState(data);

        const [selectedSkillsOrTechnologies, setSelectedSkillsOrTechnologies] = useState<string[]>([...isSkills.data]);

        useEffect(() => {
            setIsSkills({...isSkills, data: selectedSkillsOrTechnologies});
        }, [selectedSkillsOrTechnologies]);

        const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsSkills({...isSkills, data: selectedSkillsOrTechnologies});
            isAdditional ? dispatch(setAdditional(isSkills)) : dispatch(setSkills(isSkills));
            dispatch(setIsEdit(''));
        };
        const {template} = useSelector((state: RootState) => selectTheme(state));
        return (
            <EditWrapper
                preview={
                    <AsideItem>
                            <Skills
                                isButtons={ false }
                                data={ isSkills }
                            >
                                {template === 'breeze' &&
                                    <BreezeTitle text={ isSkills.title }/>}
                                {template === 'strong' &&
                                    <StrongTitle text={ isSkills.title }/>}
                            </Skills>
                    </AsideItem> }
                edit={
                    <>
                        <div className={ styles.container }>
                            <UnderlineInput
                                label="title"
                                value={ isSkills?.title }
                                onChange={ (e) => setIsSkills({...isSkills, title: e.currentTarget.value}) }
                            />
                        </div>
                        <AutoCompleteCustom { ...{selectedSkillsOrTechnologies, setSelectedSkillsOrTechnologies, label: isSkills.title} } />
                    </>
                }
                onSubmit={ handlerOnSubmit }
            />
        );
    };

export default EditSkills;