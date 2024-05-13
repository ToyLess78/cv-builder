import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectSkills } from '~/slices/skills.slice';
import { selectCertifications } from '~/slices/certifications.slice';
import {
    Additional,
    Aside,
    Body,
    Title,
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
                <section className="main" style={{position: 'relative'}}>
                    <Main />
                </section>
                <Aside>

                    <Skills>
                        <Title text={aside?.skills.title}/>
                    </Skills>

                    <Additional>
                        <Title text={aside?.additional.title}/>
                    </Additional>

                    <Certifications>
                        <Title text={certificates.title}/>
                    </Certifications>

                    <Languages>
                        <Title text='languages'/>
                    </Languages>

                    <Contacts>
                        <Title text='contacts'/>
                    </Contacts>

                </Aside>
            </Body>
        </>
    )
}