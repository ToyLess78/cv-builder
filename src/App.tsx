import './App.css';
import { Tooltip } from 'react-tooltip';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectTheme } from '~/slices/theme.slice';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { setAlphaToRGBA } from '~/utils/color.utils';
import { MenuOverlay, Overlay } from '~/components/common/Overlay/Overlay';
import { ClearButton, ColorPicker, Loading, MoreButton, SaveButton } from '~/components';
import { resetId } from 'react-id-generator';
import { selectInfo } from '~/slices/info.slice';
import CurrentTemplate from './templates/CurrentTemplate';
import TemplateConstants from '~/constants/template.constants';


const Menu = lazy(() => import('~/components/common/Carousel/Carousel'));
const CurrentEdit = lazy(() => import('~/components/common/CurrentComponents/CurrentEdit'));


const App: React.FC = () => {
    resetId();
    const themeState = useSelector((state: RootState) => selectTheme(state));
    const themeColor = themeState.color;
    useEffect(() => {
        document.documentElement.style.setProperty('--primary', themeColor as string);
        document.documentElement.style.setProperty('--primary-opacity', setAlphaToRGBA(themeColor as string, .06));
        document.documentElement.style.setProperty('--primary-alpha', setAlphaToRGBA(themeColor as string, .11));
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

    const handleClearLocalStorage = () => {
        localStorage.clear();
        window.location.reload();
    }

    const templates = Object.values(TemplateConstants).filter((v) => isNaN(Number(v)));

    useEffect(() => {
        templates.forEach(template => (new Image().src = `./templates/${template}.webp`));
        new Image().src = './avatar.jpg';
        new Image().src = './avatar-modern.jpg';

    }, [])

    return (
        <>
            <ColorPicker />
        <div id="app">
            <Overlay>
                <Suspense fallback={ <Loading/> }>
                    <CurrentEdit/>
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
                    backgroundColor: '#ffffff980',
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
            <ClearButton
                onClick={ handleClearLocalStorage }
            />
            <MoreButton
                onClick={ () => setIsOpen(!isOpen) }
            />

            <CurrentTemplate />
        </div>
        </>
    )
}

export default App;
