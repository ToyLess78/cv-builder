import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectTheme } from '~/slices/theme.slice';
import { BreezeTitle, StrongTitle } from '~/components';
import TemplateConstants from '~/constants/template.constants';

export const CurrentTitle: React.FC<{text: string}> = ({text}) => {
    const {template} = useSelector((state: RootState) => selectTheme(state));

    switch (template) {
        case TemplateConstants.Breeze: {
            return (<BreezeTitle text={ text }/>);
        }
        case TemplateConstants.Strong: {
            return (<StrongTitle text={ text }/>);
        }
        default: {
            return (<BreezeTitle text={ text }/>);
        }
    }

};