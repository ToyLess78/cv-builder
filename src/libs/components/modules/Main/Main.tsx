import React from 'react';
import { Education, Experience, Projects, Title } from '~/components';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectExperience } from '~/slices/experiences.slice';
import { selectEducation } from '~/slices/education.slice';
import { selectProjects } from '~/slices/projects.slice';

export const Main: React.FC = () => {

    const experience = useSelector((state: RootState) => selectExperience(state));
    const education = useSelector((state: RootState) => selectEducation(state));
    const projects = useSelector((state: RootState) => selectProjects(state));

    return (
        <>
            <Experience>
                <Title text={ experience.title }/>
            </Experience>
            <Projects>
                <Title text={ projects.title }/>
            </Projects>
            <Education>
                <Title text={ education.title }/>
            </Education>
        </>

    )
}