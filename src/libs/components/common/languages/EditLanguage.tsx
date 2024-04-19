import React, { useState } from 'react';
import { DropdownChangeEvent } from 'primereact/dropdown';
import levels from '~/public/levels';
import languages from '~/public/languages';
import styles from './Languages.module.scss';
import { Select } from '~/components';

interface IItems {
    name: string;
    code: string;
}

const EditLanguage: React.FC = () => {
    const [selectedLevel, setSelectedLevel] = useState<IItems | null>({name: 'Native', code: 'mother tongue'});
    const [selectedLanguage, setSelectedLanguage] = useState<IItems | null>(null);


    const onChange = (e: DropdownChangeEvent) => {

        setSelectedLevel(e.value);
        console.log(e.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Select
                    options={levels}
                    onChange={ onChange }
                    value={ selectedLevel }
                    title='Level'
                    filter={false}
                />

            </div>
            <div className={styles.card}>
                <Select
                    options={languages}
                    onChange={ (e: DropdownChangeEvent) => setSelectedLanguage(e.value) }
                    value={ selectedLanguage }
                    title='Language'
                    filter={true}
                />
            </div>
        </div>)
};

export default EditLanguage;