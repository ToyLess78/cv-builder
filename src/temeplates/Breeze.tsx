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
import { selectIsEdit } from '~/slices/editSlice';
import { breezePalette } from '~/public/palettes';

const EditCertificates = lazy(() => import('~/components/certificates/EditCertificates'));
const EditAbout = lazy(() => import('~/components/header/EditAbout'));
const EditInfo = lazy(() => import('~/components/header/EditInfo'));
const EditSkills = lazy(() => import('~/components/skills/EditSkills'));
const EditLanguage = lazy(() => import('~/components/languages/EditLanguage'));
const EditContacts = lazy(() => import('~/components/contacts/EditContacts'));


export const Breeze: React.FC = () => {

    const aside = useSelector((state: RootState) => selectSkills(state));
    const certificates = useSelector((state: RootState) => selectCertificates(state));

    const theme = 'breeze';
    const [color, setColor] = useState(loadFromLocalStorage(theme) || breezePalette[0]);


    const isEdit = useSelector((state: RootState) => selectIsEdit(state));

    return (
        <>
            <Overlay>
                <Suspense fallback={ <Loading/> }>
                    { isEdit === 'additional' && <EditSkills isAdditional/> }
                    { isEdit === 'info' && <EditInfo/> }
                    { isEdit === 'about' && <EditAbout/> }
                    { isEdit === 'skills' && <EditSkills/> }
                    { isEdit === 'certificates' && <EditCertificates/> }
                    { isEdit === 'languages' && <EditLanguage/> }
                    { isEdit === 'contacts' && <EditContacts/> }
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