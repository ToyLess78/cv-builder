import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectSkills } from '~/slices/skills.slice';
import { selectCertificates } from '~/slices/certificates.slice';
import {
    Additional,
    Aside,
    Body,
    BreezeTitle,
    Certificates,
    Contacts,
    Header,
    Languages,
    Main,
    Skills
} from '~/components/components';


export const Breeze: React.FC = () => {

    const aside = useSelector((state: RootState) => selectSkills(state));
    const certificates = useSelector((state: RootState) => selectCertificates(state));

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

                    <Certificates>
                        <BreezeTitle text={certificates.title}/>
                    </Certificates>

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