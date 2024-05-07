import React from 'react';
import { Info } from '~/components/header/Info';
import { useDispatch, useSelector } from 'react-redux';
import {
    Additional,
    Aside,
    Certifications,
    Contacts,
    EditButton,
    Languages,
    Skills,
    StrongLayout,
    StrongTitle
} from '~/components';
import { setIsEdit } from '~/slices/edit.slice';
import { RootState } from '~/store/store';
import { selectSkills } from '~/slices/skills.slice';
import { selectCertifications } from '~/slices/certifications.slice';

const Strong: React.FC = () => {
    const dispatch = useDispatch();
    const aside = useSelector((state: RootState) => selectSkills(state));
    const certificates = useSelector((state: RootState) => selectCertifications(state));
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
                        <StrongTitle text={certificates.title}/>
                    </Certifications>

                    <Languages>
                        <StrongTitle text='languages'/>
                    </Languages>
                </Aside>
            }
        />

    );
};

export default Strong;