import './App.css'
import { data } from '../public/data.ts';
import React, { Fragment, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { IoColorFillOutline } from 'react-icons/io5';
import { Breeze } from './temeplates/Breeze.tsx';
import nextId from 'react-id-generator';

export interface IAside {
    skills: string[]
    additional: string[]
}


export interface ICertificate {
    id: string
    title: string
    issue: string
    link: string
    at: string
}

const { templates }: {
    templates: string[]
} = data;
console.log(data)

function App() {


    const [isLanguages, setIsLanguages] = useState(true);
    const [state, setState] = useState(templates[0])
    const onRender = (e: React.FormEvent<HTMLInputElement>): void => {
        console.log(e.currentTarget.value)
        setState(e.currentTarget.value)
    };

    // const templates = ['success', 'advance', 'headway', 'breeze', 'strong', 'precise', 'serene', 'modern', 'fortune', 'recency', 'verdure', 'master', 'primary', 'prime', 'grand', 'alpha', 'galaxy', 'goodly', 'gallant', 'winner', 'elegant', 'future']
    return (
        <>
            {/*<Button hoverColor='#1976D2'>Button 1</Button>*/}
            {/*<Button hoverColor='#1976D2'>Button 2</Button>*/}
            {/*<Example/>*/}

            <nav className='nav'>
                {templates.map(t =>
                    <Fragment key={nextId()}>
                        <input
                            key={nextId()}
                            id={t}
                            type='radio'
                            name='layout'
                            value={t}
                            onChange={onRender}
                            checked={state === t}
                        />
                        <label
                            key={nextId()}
                            htmlFor={t}>
                            {t}
                        </label>
                    </Fragment>)}
            </nav>

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
            {(state === 'breeze') &&
                <Breeze
                    {...{
                        isLanguages,
                        setIsLanguages,
                    }}
                />
            }
            {(state === 'strong') && <small>strong</small>}
            {(state === 'galaxy') && <small>galaxy</small>}


        </>
    )
}

export default App;
