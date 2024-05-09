import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectTheme, setTemplate } from '~/slices/theme.slice';
import TemplateConstants from '~/constants/template.constants';
import { Breeze } from './Breeze';
import { Loading } from '~/components';

const Strong = lazy(() => import('./Strong'));

const CurrentTemplate: React.FC = () => {
    const {template} = useSelector((state: RootState) => selectTheme(state));
    const dispatch = useDispatch();


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
            dispatch(setTemplate(TemplateConstants.Breeze));
            return <Breeze/>;
        }
    }

};

export default CurrentTemplate;