import React from 'react';
import styles from './Main.module.css';
import { MonthYearPickerSingle, MonthYearPickerWithRange } from '~/components';
import EditeLanguage from '~/components/common/languages/EditeLanguage';


interface IMainProps {
    isOrder: boolean;
}


export const Main: React.FC<IMainProps> = ({isOrder}) => {

    return (
        <section className={ styles.main } style={ isOrder ? {order: 2} : {} }>
            <MonthYearPickerWithRange/>
            <MonthYearPickerSingle/>
            <EditeLanguage />
        </section>

    )
}