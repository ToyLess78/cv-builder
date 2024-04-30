import React, { FC, useEffect, useRef, useState } from 'react';
import {
    BreezeTitle,
    CheckBox,
    EditorCustom,
    Experience,
    MainEditWrapper,
    MonthYearPickerWithRange,
    UnderlineInput
} from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectExperiences, setEditedExperience } from '~/slices/experiences.slice';
import styles from './Experience.module.scss';
import { Nullable } from 'primereact/ts-helpers';
import { reformatDateRange, reformatDateSingle } from '~/utils/format-date.utils';
import { setIsEdit } from '~/slices/edit.slice';

const EditExperience: FC = () => {

    const experienceState = useSelector((state: RootState) => selectExperiences(state));

    const {data, editedId} = experienceState;

    const newExperience = {
        id: editedId,
        duration: '',
        isYear: false,
        isPresent: false,
        employer: '',
        jobTitle: '',
        location: '',
        description: '<p>Your Description</p>'
    };

    const [experienceItem, setExperienceItem] = useState(data.find(item => item.id === editedId) || newExperience);
    const [text, setText] = useState<null | string>(experienceItem.description);

    useEffect(() => {
        setExperienceItem({...experienceItem, description: text as string});
    }, [text]);

    const [duration, setDuration] = useState<Nullable<(Date | null)[] | Date>>(null);

    const {isYear, isPresent} = experienceItem;

    useEffect(() => {
        duration && !experienceItem.isPresent && setExperienceItem({
            ...experienceItem,
            duration: inputRefRangeDates.current?.value || experienceItem.duration
        });

    }, [duration, experienceItem.isYear, experienceItem.isPresent]);

    useEffect(() => {
        duration && experienceItem.isPresent && setExperienceItem({
            ...experienceItem,
            duration: inputRefSingleDate.current?.value || experienceItem.duration
        });

    }, [duration, experienceItem.isYear, experienceItem.isPresent]);

    const handleToggleYear = () => {
        setExperienceItem({...experienceItem, isYear: !isYear});
    };

    const inputRefRangeDates = useRef<HTMLInputElement>(null);
    const inputRefSingleDate = useRef<HTMLInputElement>(null);

    const handleToggleRange = () => {
        setExperienceItem({...experienceItem, isPresent: !isPresent});

    };
    const [singleValue, setSingleValue] = useState<Nullable<Date | null>>(null);
    const [rangeValue, setRangeValue] = useState<Nullable<(Date | null)[]>>(null);

    useEffect(() => {
        isPresent && experienceItem.duration &&
        setSingleValue(reformatDateSingle(experienceItem.duration));
        !isPresent && experienceItem.duration &&
        setRangeValue(reformatDateRange(experienceItem.duration));
    }, []);

    const dispatch = useDispatch();
    const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setEditedExperience({experience: experienceItem}));
        dispatch(setIsEdit(''));
    };

    return (
        <MainEditWrapper
            onSubmit={ handlerOnSubmit }
            style={ {width: '90%'} }
            preview={
                <Experience experienceItem={ experienceItem }>
                    <BreezeTitle text={ experienceState.title }/>
                </Experience>
            }
            edit={
                <>
                    <div className={ styles.inputs }>
                        <UnderlineInput
                            label="job title"
                            value={ experienceItem.jobTitle }
                            onChange={ (e) => setExperienceItem({...experienceItem, jobTitle: e.currentTarget.value}) }
                        />
                        <UnderlineInput
                            label="employer"
                            value={ experienceItem.employer }
                            onChange={ (e) => setExperienceItem({...experienceItem, employer: e.currentTarget.value}) }
                        />
                    </div>
                    <div className={ styles.inputs }>

                        <MonthYearPickerWithRange { ...{
                            duration,
                            setDuration,
                            isYear,
                            inputRefRangeDates,
                            inputRefSingleDate,
                            isPresent,
                            rangeValue,
                            singleValue
                        } }>
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
                        </MonthYearPickerWithRange>
                        <UnderlineInput
                            label="location"
                            value={ experienceItem.location }
                            onChange={ (e) => setExperienceItem({...experienceItem, location: e.currentTarget.value}) }
                        />
                    </div>

                    <EditorCustom { ...{text, setText} }/>
                </>
            }
        />
    );
};

export default EditExperience;
