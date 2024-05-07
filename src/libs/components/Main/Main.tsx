import React from 'react';
import styles from './Main.module.scss';
import { BreezeTitle, Education, Experience, Projects } from '~/components';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectExperiences } from '~/slices/experiences.slice';
import { selectEducation } from '~/slices/education.slice';
import { selectProjects } from '~/slices/projects.slice';

interface IMainProps {
    isOrder?: boolean;
}

export const Main: React.FC<IMainProps> = () => {

    const experience = useSelector((state: RootState) => selectExperiences(state));
    const education = useSelector((state: RootState) => selectEducation(state));
    const projects = useSelector((state: RootState) => selectProjects(state));
    return (
        <section className={ styles.main } >
            {/*<article>*/}
            {/*    <h1 className='title'>I'm alphardex.</h1>*/}
            {/*    <p className='subtitle'>A CSS Wizard</p>*/}
            {/*</article>*/}
            <Experience>
                <BreezeTitle text={experience.title}/>
            </Experience>
            <Projects>
                <BreezeTitle text={projects.title}/>
            </Projects>
            <Education>
                <BreezeTitle text={education.title}/>
            </Education>
        </section>

    )
}