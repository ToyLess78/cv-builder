import React from 'react';
import { Header } from '../components/Header/Header';
import { Body } from '../components/Body/Body';
import { Main } from '../components/Main/Main';
import { Aside } from '../components/Aside/Aside';
import { Title } from '../components/Title/Title';
import { Certificates } from '../components/Certificates/Certificates';
import { Contact } from '../components/Contact/Contact';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { selectAside } from '../redux/slices/asideSlice';
import { Skills } from '../components/common/Skills';
import { Additional } from '../components/common/Additional';
import { Languages } from '../components/common/Languages';


// setIsCertificates: React.Dispatch<React.SetStateAction<boolean>>


export const Breeze: React.FC = () => {

    const aside = useSelector((state: RootState) => selectAside(state));


    return (
        <>
            <Header/>

            <Body>
                <Main isOrder={false}/>
                <Aside>

                    <Skills>
                        <Title text={aside?.skills.title}/>
                    </Skills>

                    <Additional>
                        <Title text={aside?.additional.title}/>
                    </Additional>

                    <Certificates>
                        <Title text='certificates'/>
                    </Certificates>

                    <Languages>
                        <Title text='languages'/>
                    </Languages>

                    <Contact>
                        <Title text='contact'/>
                    </Contact>
                </Aside>
            </Body>
        </>
    )
}