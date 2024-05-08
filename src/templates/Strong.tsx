import React from 'react';
import { Info } from '~/components/header/Info';
import { useDispatch, useSelector } from 'react-redux';
import {
    Additional,
    Aside,
    StrongTitle,
    Certifications,
    Contacts,
    EditButton,
    Education,
    Experience,
    Languages,
    Projects,
    Skills,
    StrongLayout
} from '~/components';
import { setIsEdit } from '~/slices/edit.slice';
import { RootState } from '~/store/store';
import { selectSkills } from '~/slices/skills.slice';
import { selectCertifications } from '~/slices/certifications.slice';
import { Summary } from '~/components/header/Summary';
import RootConstants from '~/constants/root.constants';
import { selectInfo } from '~/slices/info.slice';
import { selectExperience } from '~/slices/experiences.slice';
import { selectEducation } from '~/slices/education.slice';
import { selectProjects } from '~/slices/projects.slice';

const Strong: React.FC = () => {

    const dispatch = useDispatch();
    const aside = useSelector((state: RootState) => selectSkills(state));
    const certificates = useSelector((state: RootState) => selectCertifications(state));
    const info = useSelector((state: RootState) => selectInfo(state));
    const experience = useSelector((state: RootState) => selectExperience(state));
    const education = useSelector((state: RootState) => selectEducation(state));
    const projects = useSelector((state: RootState) => selectProjects(state));

    return (
        <StrongLayout
            info={
                <Info>
                    <EditButton
                        onClick={ () => dispatch(setIsEdit('info')) }
                        title="name & job title"
                    />
                </Info>
            }
            aside={
                <Aside>
                <Contacts>
                    <StrongTitle text='contacts' />
                </Contacts>
                    <Skills>
                        <StrongTitle text={aside?.skills.title}/>
                    </Skills>

                    <Additional>
                        <StrongTitle text={aside?.additional.title}/>
                    </Additional>

                    <Certifications>
                        <StrongTitle text={ certificates.title }/>
                    </Certifications>

                    <Languages>
                        <StrongTitle text="languages"/>
                    </Languages>
                </Aside>
            }
            main={
                <>
                    <Summary>
                        <EditButton
                            onClick={ () => dispatch(setIsEdit(RootConstants.Summary)) }
                            title={ info.title }
                        />
                        <StrongTitle text={ info.title }/>
                    </Summary>
                    <Experience>
                        <StrongTitle text={ experience.title }/>
                    </Experience>
                    <Projects>
                        <StrongTitle text={ projects.title }/>
                    </Projects>
                    <Education>
                        <StrongTitle text={ education.title }/>
                    </Education>
                </>
            }
        />
    )
};

export default Strong;