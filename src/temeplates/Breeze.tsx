import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectSkills } from '~/slices/skills.slice';
import { selectCertifications } from '~/slices/certifications.slice';
import {
    Additional,
    Aside,
    Body,
    BreezeTitle,
    Certifications,
    Contacts,
    Header,
    Languages,
    Main,
    Skills
} from '~/components/components';


export const Breeze: React.FC = () => {

    const aside = useSelector((state: RootState) => selectSkills(state));
    const certificates = useSelector((state: RootState) => selectCertifications(state));

    return (
        <>


            <Header/>

            <Body>
                <Main isOrder={false}/>
                <Aside>

                    <Skills>
                        <BreezeTitle text={aside?.skills.title}/>
                    </Skills>

                    <Additional>
                        <BreezeTitle text={aside?.additional.title}/>
                    </Additional>

                    <Certifications>
                        <BreezeTitle text={certificates.title}/>
                    </Certifications>

                    <Languages>
                        <BreezeTitle text='languages'/>
                    </Languages>

                    <Contacts>
                        <BreezeTitle text='contacts'/>
                    </Contacts>

                </Aside>
            </Body>
        </>
    )
}