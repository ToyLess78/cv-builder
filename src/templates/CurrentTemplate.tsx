import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectTheme } from '~/slices/theme.slice';
import TemplateConstants from '~/constants/template.constants';
import { Breeze } from './Breeze';
import { Loading } from '~/components';

const Strong = lazy(() => import('./Strong'));

const CurrentTemplate: React.FC = () => {
    const {template} = useSelector((state: RootState) => selectTheme(state));

    switch (template) {
        case TemplateConstants.Breeze: {
            return <Breeze/>;
        }
        case TemplateConstants.Strong: {
            return (
                <Suspense fallback={ <Loading/> }>
                    <Strong/>
                </Suspense>);
        }
        default: {
            return <Breeze/>;
        }
    }

};

export default CurrentTemplate;