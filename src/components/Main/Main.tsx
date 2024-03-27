import React from 'react';
import styles from './Main.module.css'
import { Test } from '../Test/Test';

interface IMainProps {
    isOrder: boolean
}
const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    console.log(e.currentTarget.value)
};

export const Main: React.FC<IMainProps> = ({isOrder}) => {
    // const [state, setState] = useState(0)
    // const onRender = (e: React.FormEvent<HTMLInputElement>): void => {
    //     console.log(e.currentTarget.value)
    //     setState(+e.currentTarget.value)
    // };
    return (
        <section className={styles.main} style={isOrder ? { order: 2 } : {}}>
            <Test color={'green'} text={'work exp'}/>
            <input type='date' onChange={onChange}/>
            {/*{(state === 0) && <p>State 0 Single</p>}*/}
            {/*{(state === 1) && <p>State 1 Column</p>}*/}
            {/*{(state === 2) && <p>State 2 Card</p>}*/}

            {/*<input id='layout-single' type='radio' name='layout' value='0' onChange={onRender} checked={state === 0}/><label htmlFor='layout-single'>Single</label>*/}
            {/*    <input id='layout-column' type='radio' name='layout' value='1'  onChange={onRender} checked={state === 1}/><label htmlFor='layout-column'>Column</label>*/}
            {/*        <input id='layout-card' type='radio' name='layout' value='2'  onChange={onRender} checked={state === 2}/><label htmlFor='layout-card'>Card</label>*/}

            <input type='color' />
        </section>

    )
}