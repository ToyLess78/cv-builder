import './App.css';
import { Tooltip } from 'react-tooltip';
import { Breeze } from './temeplates/Breeze';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectThemeColor } from '~/slices/theme.slice';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { setAlphaToRGBA } from '~/utils/color.utils';
import { MenuOverlay, Overlay } from '~/components/common/Overlay/Overlay';
import { ColorPicker, Loading, MoreButton, SaveButton } from '~/components';
import { resetId } from 'react-id-generator';
import { selectIsEdit } from '~/slices/edit.slice';
import { breezePalette } from '~/public/palettes';
import { loadFromLocalStorage } from '~/utils/local-storage.utills';
import { selectInfo } from '~/slices/info.slice';

const Menu = lazy(() => import('~/components/common/Carousel/Carousel'));
const EditCertificates = lazy(() => import('~/components/certificates/EditCertifications'));
const EditSummary = lazy(() => import('~/components/header/EditSummary'));
const EditInfo = lazy(() => import('~/components/header/EditInfo'));
const EditSkills = lazy(() => import('~/components/skills/EditSkills'));
const EditLanguage = lazy(() => import('~/components/languages/EditLanguage'));
const EditContacts = lazy(() => import('~/components/contacts/EditContacts'));
const EditExperience = lazy(() => import('~/components/experience/EditExperience'));
const EditEducation = lazy(() => import('~/components/education/EditEducation'));
const EditProjects = lazy(() => import('~/components/projects/EditProjects'));

const App: React.FC = () => {
    resetId();
    const themeColor = useSelector((state: RootState) => selectThemeColor(state));
    useEffect(() => {
        document.documentElement.style.setProperty('--primary', themeColor as string);
        document.documentElement.style.setProperty('--primary-opacity', setAlphaToRGBA(themeColor as string, .06));
    }, [themeColor]);

    const [isOpen, setIsOpen] = useState(false);

    const info = useSelector((state: RootState) => selectInfo(state));

    const handlerSaveOnClick = () => {
        document.title = `CV_${ info.position }_${ info.firstname } ${ info.lastname }`;
        window.print();
    };

    window.onafterprint = () => {
        document.title = 'CV Builder';
    };

    // const templates = ['success', 'advance', 'headway', 'breeze', 'strong', 'precise', 'serene', 'modern', 'fortune', 'recency', 'verdure', 'master', 'primary', 'prime', 'grand', 'alpha', 'galaxy', 'goodly', 'gallant', 'winner', 'elegant', 'future']
    // style={{'--primary': themeColor, '--primary-opacity': setAlphaToRGBA(themeColor as string, 0.1)} as React.CSSProperties}
    const isEdit = useSelector((state: RootState) => selectIsEdit(state));
    const theme = 'breeze';
    const [color, setColor] = useState(loadFromLocalStorage(theme) || breezePalette[0]);

    return (
        <>
            <ColorPicker { ...{theme, palette: breezePalette, color, setColor} } />
        <div id="app">
            <Overlay>
                <Suspense fallback={ <Loading/> }>
                    { isEdit === 'additional' && <EditSkills isAdditional/> }
                    { isEdit === 'info' && <EditInfo/> }
                    { isEdit === 'summary' && <EditSummary/> }
                    { isEdit === 'skills' && <EditSkills/> }
                    { isEdit === 'certificates' && <EditCertificates/> }
                    { isEdit === 'languages' && <EditLanguage/> }
                    { isEdit === 'contacts' && <EditContacts/> }
                    { isEdit === 'experience' && <EditExperience/> }
                    { isEdit === 'education' && <EditEducation/> }
                    { isEdit === 'projects' && <EditProjects/> }
                </Suspense>
            </Overlay>
            <MenuOverlay { ...{isOpen, setIsOpen} }>
                <Suspense fallback={ <Loading/> }>
                    { isOpen && <Menu{ ...{isOpen, setIsOpen} }/> }
                </Suspense>
            </MenuOverlay>

            <Tooltip
                id="tooltip"
                variant="light"
                style={ {
                    color: 'var(--secondary-text)',
                    backgroundColor: '#ffffff95',
                    zIndex: 1000,
                    textTransform: 'capitalize'
                } }
                openEvents={
                    {mouseenter: true}
                }
                noArrow
            />

            <SaveButton
                onClick={ handlerSaveOnClick }
            />
            <MoreButton
                onClick={ () => setIsOpen(!isOpen) }
            />
            <Breeze/>
        </div>
        </>
    )
}

export default App;
