import React from 'react';
import styles from './Main.module.css';
import { MonthYearPickerSingle, MonthYearPickerWithRange } from '~/components';


interface IMainProps {
    isOrder?: boolean;
}

export const Main: React.FC<IMainProps> = () => {

    // const router = useRouter();
    return (
        <section className={ styles.main } >
            {/*<article>*/}
            {/*    <h1 className='title'>I'm alphardex.</h1>*/}
            {/*    <p className='subtitle'>A CSS Wizard</p>*/}
            {/*</article>*/}
            <MonthYearPickerWithRange/>
            <MonthYearPickerSingle/>

            <input type='tel' name='phone'  required onChange={(e) => console.log(e.currentTarget.value)}/>
            <input type='url' name='url' id='url' required />
        </section>

    )
}