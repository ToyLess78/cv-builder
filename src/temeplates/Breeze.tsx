import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectSkills } from '~/slices/skillsSlice';
import { selectCertificates } from '~/slices/certificatesSlice';
import { loadFromLocalStorage } from '~/utils/utils';
import {
    Additional,
    Aside,
    Body,
    BreezeTitle,
    Certificates,
    ColourPicker,
    Contacts,
    Header,
    Languages,
    Main,
    Skills
} from '~/components/components';
import { breezePalette } from '~/public/palettes';


export const Breeze: React.FC = () => {

    const aside = useSelector((state: RootState) => selectSkills(state));
    const certificates = useSelector((state: RootState) => selectCertificates(state));

    const theme = 'breeze';
    const [color, setColor] = useState(loadFromLocalStorage(theme) || breezePalette[0]);



    return (
        <>

            <ColourPicker { ...{theme, palette: breezePalette, color, setColor} } />
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