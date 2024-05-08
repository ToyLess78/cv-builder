import './App.css';
import { Tooltip } from 'react-tooltip';
import { Breeze } from './templates/Breeze';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectTheme } from '~/slices/theme.slice';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { setAlphaToRGBA } from '~/utils/color.utils';
import { MenuOverlay, Overlay } from '~/components/common/Overlay/Overlay';
import { ColorPicker, Loading, MoreButton, SaveButton } from '~/components';
import { resetId } from 'react-id-generator';
import { breezePalette } from '~/public/palettes';
import { loadFromLocalStorage } from '~/utils/local-storage.utills';
import { selectInfo } from '~/slices/info.slice';
import Strong from './templates/Strong';


const Menu = lazy(() => import('~/components/common/Carousel/Carousel'));
const CurrentEdit = lazy(() => import('~/components/common/CurrentComponents/CurrentEdit'));


const App: React.FC = () => {
    resetId();
    const themeState = useSelector((state: RootState) => selectTheme(state));
    const themeColor = themeState.color;
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


    const {template: theme} = useSelector((state: RootState) => selectTheme(state));
    const [color, setColor] = useState(loadFromLocalStorage(theme) || breezePalette[0]);

    return (
        <>
            <ColorPicker { ...{theme, palette: breezePalette, color, setColor} } />
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
            <MoreButton
                onClick={ () => setIsOpen(!isOpen) }
            />
            {theme === 'breeze' &&
            <Breeze/>}
            {theme === 'strong' &&
            <Strong />}
        </div>
        </>
    )
}

export default App;
