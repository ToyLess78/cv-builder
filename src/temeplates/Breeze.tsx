import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/store';
import {selectAside} from '~/slices/asideSlice';
import {selectCertificates} from '~/slices/certificatesSlice';
import {loadFromLocalStorage} from '~/utils/utils';
import {
    Additional,
    Aside,
    Body,
    BreezeTitle,
    Certificates,
    ColourPicker,
    Contacts,
    EditAdditional,
    Header,
    Languages,
    Main,
    Overlay,
    Skills
} from '~/components/components';
import {selectIsEdite} from '~/slices/editeSlice';
import {EditeInfo} from '~/components/Header/EditeInfo';
import {EditeAbout} from '~/components/Header/EditeAbout';

export const Breeze: React.FC = () => {

    const aside = useSelector((state: RootState) => selectAside(state));
    const certificates = useSelector((state: RootState) => selectCertificates(state));
    const palette = [
        'rgba(25, 118, 210, 1)',
        'rgba(230, 126, 34, 1)',
        'rgba(241, 196, 15, 1)',
        'rgba(231, 76, 60, 1)',
        'rgba(46, 204, 113, 1)',
        'rgba(155, 89, 182, 1)'
    ]

    const theme = 'breeze';
    const [color, setColor] = useState(loadFromLocalStorage(theme) || palette[0]);


    const isEdite = useSelector((state: RootState) => selectIsEdite(state));

    return (
        <>
            <Overlay>
                {isEdite === 'additional' && <EditAdditional />}
                {isEdite === 'info' && <EditeInfo />}
                {isEdite === 'about' && <EditeAbout />}

            </Overlay>
            <ColourPicker {...{ theme, palette, color, setColor }} />
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