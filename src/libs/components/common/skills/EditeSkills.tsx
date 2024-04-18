import React, { useEffect, useState } from 'react';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { selectSkills, setAdditional, setSkills } from '~/slices/skillsSlice';
import styles from './Skills.module.scss';
import { AsideItem, BreezeTitle, EditeWrapper, Skills, UnderlineInput } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { skills } from '~/public/skills';
import { setIsEdite } from '~/slices/editeSlice';

interface IEditeSkillsAutoCompleteProps {
    isAdditional?: boolean;
}

const EditeSkills: React.FC<IEditeSkillsAutoCompleteProps> =
    ({isAdditional = false}) => {

        const dispatch = useDispatch();
        const aside = useSelector((state: RootState) => selectSkills(state));
        const data = isAdditional ? aside.additional : aside.skills;
        const [isSkills, setIsSkills] = useState(data);

        const [selectedSkills, setSelectedSkills] = useState<string[]>([...isSkills.data]);
        const [filteredSkills, setFilteredSkills] = useState<string[]>([]);

        useEffect(() => {
            setIsSkills({...isSkills, data: selectedSkills});
        }, [selectedSkills]);

        const search = (event: AutoCompleteCompleteEvent) => {
            const query = event.query.trim().toLowerCase();
            let _filteredSkills = [...skills];

            if (query && !skills.some(skill => skill.toLowerCase().startsWith(query)) && !_filteredSkills.some(skill => skill.toLowerCase() === query)) {
                _filteredSkills.push(event.query.trim());
            }

            if (query) {
                _filteredSkills = _filteredSkills.filter(skill => skill.toLowerCase().startsWith(query) && !selectedSkills.includes(skill));
            }

            setFilteredSkills(_filteredSkills);
        };

        const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsSkills({...isSkills, data: selectedSkills});
            isAdditional ? dispatch(setAdditional(isSkills)) : dispatch(setSkills(isSkills));
            dispatch(setIsEdite(''));
        };

        return (
            <EditeWrapper
                preview={
                    <AsideItem>
                        <div className={ styles.box }>
                            <BreezeTitle text={ isSkills.title }/>
                            <Skills
                                isButtons={ false }
                                data={ isSkills }
                            />
                        </div>
                    </AsideItem> }
                edite={
                    <>
                        <div className={ styles.container }>
                            <UnderlineInput
                                label="title"
                                value={ isSkills?.title }
                                onChange={ (e) => setIsSkills({...isSkills, title: e.currentTarget.value}) }
                            />
                        </div>
                        <AutoComplete
                            multiple
                            placeholder="+ more"
                            value={ selectedSkills }
                            suggestions={ filteredSkills }
                            completeMethod={ search }
                            className={ styles.autoComplete }
                            panelClassName={ styles.panel }
                            inputClassName={ styles.input }
                            onChange={ (e) => setSelectedSkills(e.value) }
                        />
                    </>
                }
                onSubmit={ handlerOnSubmit }
            />
        );
    };

export default EditeSkills;