import React, { useState } from 'react';
import { DropdownChangeEvent } from 'primereact/dropdown';
import levels from '~/public/levels';
import languages from '~/public/languages';
import styles from './Languages.module.scss';
import { AddButton, Title, EditWrapper, Languages, Select } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectLanguages, setLanguagesData } from '~/slices/languages.slice';
import nextId from 'react-id-generator';
import { setIsEdit } from '~/slices/edit.slice';

const EditLanguage: React.FC = () => {

    const state = useSelector((state: RootState) => selectLanguages(state));
    const [languageState, setLanguageState] = useState(state.data);

    const onChangeLevel = (e: DropdownChangeEvent, id: string) => {
        setLanguageState(languageState.map(x => (x.id === id ? {...x, level: e.value} : x)));
    };

    const onChangeLanguage = (e: DropdownChangeEvent, id: string) => {
        setLanguageState(languageState.map(x => (x.id === id ? {...x, language: e.value} : x)));
    };

    const removeLanguage = (id: string) => {
        setLanguageState(languageState.filter(item => item.id !== id));
    };

    const addLanguage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const language = {
            id: nextId(),
            language: null,
            level: null
        }
        setLanguageState([...languageState, language]);
    };

    const dispatch = useDispatch();

    const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setLanguagesData(languageState));
        dispatch(setIsEdit(''));
    };

    return (
        <EditWrapper
            width='35rem'
            preview={
            <div style={{width: '17rem'}}>
                <Languages
                    data={languageState}
                    onRemove={removeLanguage}
                >
                    <Title text="languages"/>
                </Languages>
            </div>
            }
            edit={
            <>
                <AddButton
                    onClick={ addLanguage }
                    text= 'Language'
                    style={{visibility: languageState[languageState.length - 1]?.language?.name.trim() && languageState[languageState.length - 1]?.level?.name.trim() ? 'visible' : 'hidden'}}
                />
                <div className={ styles.wrapper }>
                    { languageState.map(l => (
                        <div className={ styles.container } key={ l.id }>

                            <Select
                                options={ languages }
                                onChange={ (e: DropdownChangeEvent) => onChangeLanguage(e, l.id) }
                                value={ l.language }
                                title='Language'
                                filter
                            />

                            <Select
                                options={ levels }
                                onChange={ (e: DropdownChangeEvent) => onChangeLevel(e, l.id) }
                                value={ l.level }
                                title='Level'
                            />
                        </div>
                    )) }
                </div>
            </>
            }
            onSubmit={ handlerOnSubmit }
        />
    )
}
export default EditLanguage;