import './App.css';
import { Tooltip } from 'react-tooltip';
import { Breeze } from './temeplates/Breeze';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectThemeColor } from '~/slices/themeSlice';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { setAlphaToRGBA } from '~/utils/color.utils';
import { MenuOverlay } from '~/components/common/Overlay/Overlay';
import { Loading, MoreButton, SaveButton } from '~/components';
import { resetId } from 'react-id-generator';

const Menu = lazy(() => import('~/components/common/Carousel/Carousel'));

const App: React.FC = () => {
    resetId();
    const themeColor = useSelector((state: RootState) => selectThemeColor(state));
    useEffect(() => {
        document.documentElement.style.setProperty('--primary', themeColor as string);
        document.documentElement.style.setProperty('--primary-opacity', setAlphaToRGBA(themeColor as string, 0.1));
    }, [themeColor]);

    const [isOpen, setIsOpen] = useState(false);


    // const templates = ['success', 'advance', 'headway', 'breeze', 'strong', 'precise', 'serene', 'modern', 'fortune', 'recency', 'verdure', 'master', 'primary', 'prime', 'grand', 'alpha', 'galaxy', 'goodly', 'gallant', 'winner', 'elegant', 'future']
    // style={{'--primary': themeColor, '--primary-opacity': setAlphaToRGBA(themeColor as string, 0.1)} as React.CSSProperties}
    return (
        <
        >
            {/*<Buttons hoverColor='#1976D2'>Buttons 1</Buttons>*/ }
            {/*<Buttons hoverColor='#1976D2'>Buttons 2</Buttons>*/ }
            {/*<Example/>*/ }
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
                    zIndex: 100,
                    textTransform: 'capitalize'
                } }
            />

            <SaveButton
                onClick={() => window.print()}
            />
            <MoreButton
                onClick={ () => setIsOpen(!isOpen) }
            />
            <Breeze/>
        </>
    )
}

export default App;
