import React from 'react';
import styles from './Accent.module.scss';
import { RiAppStoreFill } from 'react-icons/ri';
import { IoLocationSharp } from 'react-icons/io5';

export const AccentLayout: React.FC = () => {
    return (
        <div className={ styles.accent }>
            <div className={ styles.mark }></div>
            <div className={ styles.info }></div>

            <div className={ styles.contacts }>
                <RiAppStoreFill size="1.3rem"/>
                <IoLocationSharp size="1.3rem"/>
            </div>
            <div className={ styles.summary }>
                Experienced web developer adept in all stages of advanced web development. Knowledgeable in user interface, testing, and debugging processes. Bringing forth expertise in design, installation, testing and maintenance of web systems. Equipped with a diverse and promising skill-set. Proficient in an assortment of technologies, including Typescript, React.js, NodeJS, ExpressJS, Next.js, and WebSocket. Able to effectively self-manage during independent projects, as well as collaborate in a team setting.
            </div>

            <div className={ styles.main }></div>
            <div className={ styles.aside }></div>
        </div>
    )
}