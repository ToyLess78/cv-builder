import { AutoCompleteCustom, CheckBox, Title, EditorCustom, UnderlineInput } from '~/components';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectProjects, setEditedProject } from '~/slices/projects.slice';
import styles from './Projects.module.scss';
import { Nullable } from 'primereact/ts-helpers';
import { reformatDateRange, reformatDateSingle } from '~/utils/format-date.utils';
import { setIsEdit } from '~/slices/edit.slice';
import { MainEditWrapper } from '~/components/Main/MainEditWrapper';
import { MonthYearPickerWithRange } from '~/components/common/MonthPicker/MonthYearPicker';
import { Projects } from './Projects';

const EditProjects: React.FC = () => {

    const projectsState = useSelector((state: RootState) => selectProjects(state));

    const {data, editedId} = projectsState;

    const newProject = {
        id: editedId,
        projectName: '',
        link: '',
        isLink: true,
        duration: '',
        isDuration: true,
        isYear: false,
        isPresent: false,
        technologies: [],
        degree: '',
        type: '',
        description: '<p>Your Description</p>'
    };

    const [projectsItem, setProjectsItem] = useState(data.find(item => item.id === editedId) || newProject);

    const [text, setText] = useState<null | string>(projectsItem.description);

    useEffect(() => {
        setProjectsItem({...projectsItem, description: text as string});
    }, [text]);

    const [duration, setDuration] = useState<Nullable<(Date | null)[] | Date>>(null);

    const {isYear, isPresent, isLink, isDuration} = projectsItem;

    useEffect(() => {
        duration && !projectsItem.isPresent && setProjectsItem({
            ...projectsItem,
            duration: inputRefRangeDates.current?.value || projectsItem.duration
        });

    }, [duration, projectsItem.isYear, projectsItem.isPresent]);

    useEffect(() => {
        duration && projectsItem.isPresent && setProjectsItem({
            ...projectsItem,
            duration: inputRefSingleDate.current?.value || projectsItem.duration
        });

    }, [duration, projectsItem.isYear, projectsItem.isPresent]);

    const handleToggleYear = () => {
        setProjectsItem({...projectsItem, isYear: !isYear});
    };
    const handleToggleIsLink = () => {
        setProjectsItem({...projectsItem, isLink: !isLink});
    };

    const inputRefRangeDates = useRef<HTMLInputElement>(null);
    const inputRefSingleDate = useRef<HTMLInputElement>(null);

    const handleToggleRange = () => {
        setProjectsItem({...projectsItem, isPresent: !isPresent});

    };
    const handleToggleDuration = () => {
        setProjectsItem({...projectsItem, isDuration: !isDuration, duration: ''});
        setDisabled(!isDuration);
        setRangeValue(null);
        setSingleValue(null);

    };

    const [singleValue, setSingleValue] = useState<Nullable<Date | null>>(null);
    const [rangeValue, setRangeValue] = useState<Nullable<(Date | null)[]>>(null);

    useEffect(() => {
        isPresent && projectsItem.duration &&
        setSingleValue(reformatDateSingle(projectsItem.duration));
        !isPresent && projectsItem.duration &&
        setRangeValue(reformatDateRange(projectsItem.duration));
    }, []);

    useEffect(() => {
        !isLink && setProjectsItem({...projectsItem, link: ''});
    }, [isLink]);

    const dispatch = useDispatch();
    const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setEditedProject({project: projectsItem}));
        dispatch(setIsEdit(''));
    };

    const [disabled, setDisabled] = useState(!isDuration);
    const [selectedSkillsOrTechnologies, setSelectedSkillsOrTechnologies] = useState<string[]>([...projectsItem.technologies]);

    useEffect(() => {
        setProjectsItem({...projectsItem, technologies: selectedSkillsOrTechnologies})
    }, [selectedSkillsOrTechnologies])

    return (
        <MainEditWrapper
            style={ {width: '90%'} }
            onSubmit={ handlerOnSubmit }
            preview={
                <Projects projectsItem={ projectsItem }>
                    <Title text={ projectsState.title }/>
                </Projects>
            }

            edit={
            <>
                <div className={styles.columns}>
                    <div className={ styles.inputs }>
                        <UnderlineInput
                            label="project Name"
                            value={ projectsItem.projectName }
                            onChange={ (e) => setProjectsItem({...projectsItem, projectName: e.currentTarget.value}) }
                        />
                        <MonthYearPickerWithRange { ...{
                            duration,
                            setDuration,
                            isYear,
                            inputRefRangeDates,
                            inputRefSingleDate,
                            isPresent,
                            rangeValue,
                            singleValue,
                            disabled
                        } }>
                            <CheckBox
                                checked={ !disabled }
                                onChange={ handleToggleDuration }
                                title="Currently use duration"
                            />
                            <div
                                className={ styles.checkbox }
                                data-visible={disabled ? 'false' : 'true'}
                            >
                                <CheckBox
                                    checked={ isYear }
                                    onChange={ handleToggleYear }
                                    title="Currently only Year"
                                />
                                <CheckBox
                                    checked={ isPresent }
                                    onChange={ handleToggleRange }
                                    title="Currently work here"
                                />
                            </div>

                        </MonthYearPickerWithRange>

                    </div>

                    <div>
                    <AutoCompleteCustom { ...{selectedSkillsOrTechnologies, setSelectedSkillsOrTechnologies, label: "technologies"} } />
                    </div>
                    <div className={ styles.inputs }>

                        <UnderlineInput
                            label="type"
                            value={ projectsItem.type }
                            onChange={ (e) => setProjectsItem({...projectsItem, type: e.currentTarget.value}) }
                        />

                        <div className={styles.link}>
                            <UnderlineInput
                                label="link"
                                type="link"
                                value={ projectsItem.link }
                                onChange={ (e) => setProjectsItem({...projectsItem, link: e.currentTarget.value}) }
                                disabled={ !isLink }
                            />
                            <CheckBox
                                checked={ isLink }
                                onChange={ handleToggleIsLink }
                                title="Currently add link"
                            />
                        </div>

                    </div>
                </div>
                <EditorCustom { ...{text, setText} }/>
            </>
            }
        />

    );
};

export default EditProjects;