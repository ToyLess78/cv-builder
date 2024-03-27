import React from 'react';
import { Header } from '../components/Header/Header.tsx';
import { Body } from '../components/Body/Body.tsx';
import { Main } from '../components/Main/Main.tsx';
import { Aside } from '../components/Aside/Aside.tsx';
import { AsideItem } from '../components/Aside/AsideItem.tsx';
import { FaRegEdit } from 'react-icons/fa';
import { Title } from '../components/Title/Title.tsx';
import { Certificates } from '../components/Certificates/Certificates.tsx';
import { Contact } from '../components/Contact/Contact.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store.ts';
import { selectAside } from '../redux/slices/asideSlice.ts';
import { Skills } from '../components/common/Skills.tsx';
import { Additional } from '../components/common/Additional.tsx';
import { Languages } from '../components/common/Languages.tsx';


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

                    <AsideItem>
                        <FaRegEdit
                            className='edite'
                            data-tooltip-id='tooltip'
                            data-tooltip-content='Edite Contact'
                            data-tooltip-offset={0}
                        />
                        <Title text='contact'/>
                        <Contact/>
                    </AsideItem>
                </Aside>
            </Body>
        </>
    )
}