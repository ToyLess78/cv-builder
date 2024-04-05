import './App.css'
import { Tooltip } from 'react-tooltip';
import { IoColorFillOutline } from 'react-icons/io5';
import { Breeze } from './temeplates/Breeze';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectThemeColor } from '~/slices/themeSlice';
import React from 'react';
import { setAlphaToRGBA } from '~/utils/color.utils';

const App: React.FC = () => {
    const themeColor = useSelector((state: RootState) => selectThemeColor(state));

    // const templates = ['success', 'advance', 'headway', 'breeze', 'strong', 'precise', 'serene', 'modern', 'fortune', 'recency', 'verdure', 'master', 'primary', 'prime', 'grand', 'alpha', 'galaxy', 'goodly', 'gallant', 'winner', 'elegant', 'future']
    return (
        <div style={{'--primary': themeColor, '--primary-opacity': setAlphaToRGBA(themeColor as string, 0.1)} as React.CSSProperties}
        >
            {/*<Buttons hoverColor='#1976D2'>Buttons 1</Buttons>*/}
            {/*<Buttons hoverColor='#1976D2'>Buttons 2</Buttons>*/}
            {/*<Example/>*/}

            <Tooltip
                id='tooltip'
                variant='light'
                style={{
                    color: 'dimgrey',
                    backgroundColor: '#ffffff95',
                    zIndex: 100,
                    textTransform: 'capitalize'
                }}
            />
            <IoColorFillOutline
                size='1.5rem'
                className='palette'
                data-tooltip-id='tooltip'
                data-tooltip-content='Edite Palette'
                data-tooltip-offset={0}
            />
                <Breeze/>
        </div>
    )
}

export default App;
