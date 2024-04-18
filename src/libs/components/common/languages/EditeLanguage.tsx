import React, { useState } from 'react';
import { Dropdown, DropdownChangeEvent, DropdownProps } from 'primereact/dropdown';
import levels from '~/public/levels';
import languages from '~/public/languages';
import styles from './Languages.module.scss';

interface IItems {
    name: string;
    code: string;
}

const EditeLanguage: React.FC = () => {
    const [selectedLevel, setSelectedLevel] = useState<IItems | null>({name: 'Native', code: 'mother tongue'});
    const [selectedLanguage, setSelectedLanguage] = useState<IItems | null>(null);


    const onChange = (e: DropdownChangeEvent) => {

        setSelectedLevel(e.value);
        console.log(e.value);
    };
    const selectedLevelTemplate = (option: IItems, props: DropdownProps) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{ option.name } <span>{ option?.code }</span></div>
                </div>
            );
        }

        return <span>{ props.placeholder }</span>;
    };
    const selectedLanguageTemplate = (option: IItems, props: DropdownProps) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{ option.name }</div>
                </div>
            );
        }

        return <span>{ props?.placeholder }</span>;
    };
    const levelOptionTemplate = (option: IItems) => {
        return (
            <div className="flex align-items-center">
                <div
                >{ option.name } <span>{ option?.code }</span></div>
            </div>
        );
    };
    const languageOptionTemplate = (option: IItems) => {
        return (
            <div className="flex align-items-center">
                <span
                >{ option.name }</span>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        return (
            <div
                className="py-2 px-3">
                { selectedLevel ? (
                    <span>
                        <b>{ selectedLevel.name }</b> selected.
                    </span>
                ) : (
                    'No Level selected.'
                ) }
            </div>
        );
    };
    return (
        <div className={styles.container}>
            <div className="card flex justify-content-center">
                <Dropdown
                    value={ selectedLevel }
                    onChange={ onChange }
                    options={ levels }
                    optionLabel="name"
                    placeholder="Select a Level"
                    valueTemplate={ selectedLevelTemplate }
                    itemTemplate={ levelOptionTemplate }
                    panelFooterTemplate={ panelFooterTemplate }
                    showClear
                />
            </div>
            <div className="card flex justify-content-center">
                <Dropdown
                    value={ selectedLanguage }
                    onChange={ (e: DropdownChangeEvent) => setSelectedLanguage(e.value) } options={ languages }
                    optionLabel="name"
                    placeholder="Select a Language"
                    filter valueTemplate={ selectedLanguageTemplate } itemTemplate={ languageOptionTemplate }
                    className="w-full md:w-14rem"
                    showClear
                />
            </div>
        </div>)
};

export default EditeLanguage;