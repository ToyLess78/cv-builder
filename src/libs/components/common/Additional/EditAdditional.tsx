import React, { useEffect, useState } from 'react';
import { AdditionalList } from './AdditionalList';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import styles from './Additional.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectAside, setAdditional } from '~/slices/asideSlice';
import { skills } from '~/public/skills';
import { AsideItem, BreezeTitle, MainButton, UnderlineInput } from '~/components/components';
import { setIsEdite } from '~/slices/editeSlice';

export const EditAdditional: React.FC = () => {
    const dispatch = useDispatch();
    const aside = useSelector((state: RootState) => selectAside(state));
    const [isAdditional, setIsAdditional] = useState(aside.additional);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([...isAdditional.data]);
    const [filteredSkills, setFilteredSkills] = useState<string[]>([]);

    useEffect(() => {
        setIsAdditional({ ...isAdditional, data: selectedSkills })
    }, [selectedSkills, isAdditional])

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
    }
    const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsAdditional({ ...isAdditional, data: selectedSkills });
        dispatch(setAdditional(isAdditional));
        dispatch(setIsEdite(''));
    }
    return (
        <>
            <div className={styles.wrapper}>
                <AsideItem>
                    <BreezeTitle text={isAdditional.title}/>
                    <AdditionalList {...isAdditional} />
                </AsideItem>
                <form className={styles.form} onSubmit={handlerOnSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '.2rem' , marginTop: '2rem'}}>
                            <UnderlineInput
                                label='title'
                                value={isAdditional.title}
                                onChange={(e) => setIsAdditional({ ...isAdditional, title: e.currentTarget.value })}
                            />
                        </div>
                        <AutoComplete
                            multiple
                            placeholder='+ more'
                            value={selectedSkills}
                            suggestions={filteredSkills}
                            completeMethod={search}
                            className={styles.autoComplete}
                            panelClassName={styles.panel}
                            inputClassName={styles.input}
                            onChange={(e) => setSelectedSkills(e.value)}
                        />
                    <MainButton type='submit'>Save Changes</MainButton>
                </form>
            </div>
        </>
    )
}