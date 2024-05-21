import React, { ReactNode } from 'react';
import styles from './Accent.module.scss';

interface IAccentLayoutProps {
    info: ReactNode;
    contacts: ReactNode;
    summary: ReactNode;
    main: ReactNode;
    aside: ReactNode;
}
export const AccentLayout: React.FC<IAccentLayoutProps> = ({info, contacts, summary, main, aside}) => {
    return (
        <div className={ styles.accent }>

            <section className={ styles.header }>

                <div className={ styles.mark }/>
                <div className={ styles.info }>{info}</div>
                <div className={ styles.contacts }>{contacts}</div>

            </section>
            <section className={ styles.summary }>{summary}</section>
            <section className={ styles.main }>{main}</section>
            <section className={ styles.aside }>{aside}</section>

        </div>
    )
}