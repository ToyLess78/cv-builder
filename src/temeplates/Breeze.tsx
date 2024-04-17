import React, { lazy, Suspense, useState } from 'react';
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
    Loading,
    Main,
    Overlay,
    Skills
} from '~/components/components';
import { selectIsEdite } from '~/slices/editeSlice';
import { breezePalette } from '~/public/palettes';

const EditeCertificates = lazy(() => import('~/components/certificates/EditeCertificates'));
const EditeAbout = lazy(() => import('~/components/Header/EditeAbout'));
const EditeInfo = lazy(() => import('~/components/Header/EditeInfo'));
const EditeSkills = lazy(() => import('~/components/common/skills/EditeSkills'));


export const Breeze: React.FC = () => {

    const aside = useSelector((state: RootState) => selectSkills(state));
    const certificates = useSelector((state: RootState) => selectCertificates(state));

    const theme = 'breeze';
    const [color, setColor] = useState(loadFromLocalStorage(theme) || breezePalette[0]);


    const isEdite = useSelector((state: RootState) => selectIsEdite(state));

    return (
        <>
            <Overlay>
                <Suspense fallback={ <Loading/> }>
                    { isEdite === 'additional' && <EditeSkills isAdditional/> }
                    { isEdite === 'info' && <EditeInfo/> }
                    { isEdite === 'about' && <EditeAbout/> }
                    { isEdite === 'skills' && <EditeSkills/> }
                    { isEdite === 'certificates' && <EditeCertificates />}
                </Suspense>
            </Overlay>
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