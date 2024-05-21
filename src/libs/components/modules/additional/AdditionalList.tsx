import React from 'react';
import nextId from 'react-id-generator';
import { IAdditionalState } from '~/slices/skills.slice';
import styles from './Additional.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectTheme } from '~/slices/theme.slice';
import TemplateConstants from '~/constants/template.constants';

export const AdditionalList: React.FC<IAdditionalState> = (additional) => {

    const {data} = additional;

    const {template} = useSelector((state: RootState) => selectTheme(state));

    return (
        <>
            { data.length ?
                <ul
                    className={ styles.additional }
                    style={ {minHeight: template === TemplateConstants.Breeze ? '7.4rem' : 'auto'} }>
                    { data?.map((a) => {
                        return <li key={ nextId() }>{ a }</li>;
                    }) }
                </ul> : ''
            }
        </>
    );
};