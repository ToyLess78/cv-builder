import React, { useState } from 'react';
import styles from './Main.module.scss';
import { BreezeTitle, Experience, MonthYearPickerSingle, MonthYearPickerWithRange } from '~/components';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectExperiences } from '~/slices/experiences.slice';
import { Nullable } from 'primereact/ts-helpers';


interface IMainProps {
    isOrder?: boolean;
}

export const Main: React.FC<IMainProps> = () => {
    const [duration, setDuration] = useState<Nullable<(Date | null)[] | Date>>(null);
    const isYear = false;

    const experience = useSelector((state: RootState) => selectExperiences(state));
    return (
        <section className={ styles.main } >
            {/*<article>*/}
            {/*    <h1 className='title'>I'm alphardex.</h1>*/}
            {/*    <p className='subtitle'>A CSS Wizard</p>*/}
            {/*</article>*/}
            <Experience>
                <BreezeTitle text={experience.title}/>
            </Experience>
            <div style={{marginBottom: '3rem'}}></div>
            <MonthYearPickerWithRange {...{duration, setDuration, isYear}}/>
            <MonthYearPickerSingle/>

            <input type='tel' name='phone'  required onChange={(e) => console.log(e.currentTarget.value)}/>
            <input type='url' name='url' id='url' required />
        </section>

    )
}