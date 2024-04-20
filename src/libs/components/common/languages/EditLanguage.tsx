import React, { useState } from 'react';
import { DropdownChangeEvent } from 'primereact/dropdown';
import levels from '~/public/levels';
import languages from '~/public/languages';
import styles from './Languages.module.scss';
import { BreezeTitle, EditWrapper, Languages, Select } from '~/components';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectLanguages } from '~/slices/languagesSlice';

const EditLanguage: React.FC = () => {

    const onChangeLevel = (e: DropdownChangeEvent, id: string) => {
        setLanguageState(languageState.map(x => (x.id === id ? {...x, level: e.value} : x)));
    };

    const onChangeLanguage = (e: DropdownChangeEvent, id: string) => {
        setLanguageState(languageState.map(x => (x.id === id ? {...x, language: e.value} : x)));
    };

    const state = useSelector((state: RootState) => selectLanguages(state));
    const [languageState, setLanguageState] = useState(state.data);

    return (
        <EditWrapper
            preview={
                <Languages data={languageState}>
                    <BreezeTitle text='languages'/>
                </Languages>
            }
            edit={
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
            }
            isGrow
        />
    )
}
export default EditLanguage;