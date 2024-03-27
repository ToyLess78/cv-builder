import React from 'react';
import { Header } from '../components/Header/Header.tsx';
import { Body } from '../components/Body/Body.tsx';
import { Main } from '../components/Main/Main.tsx';
import { Aside } from '../components/Aside/Aside.tsx';
import { AsideItem } from '../components/Aside/AsideItem.tsx';
import { FaRegEdit } from 'react-icons/fa';
import { Title } from '../components/Title/Title.tsx';
import { BiHide } from 'react-icons/bi';
import { Certificates } from '../components/Certificates/Certificates.tsx';
import { Languages } from '../components/Languages/Languages.tsx';
import { Contact } from '../components/Contact/Contact.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store.ts';
import { selectAside } from '../redux/slices/asideSlice.ts';
import { selectLanguages } from '../redux/slices/languagesSlice.ts';
import { Skills } from '../components/common/Skills.tsx';
import { Additional } from '../components/common/Additional.tsx';

interface IBreezeProps {
    // setIsCertificates: React.Dispatch<React.SetStateAction<boolean>>
    setIsLanguages: React.Dispatch<React.SetStateAction<boolean>>
    isLanguages: boolean
}

export const Breeze: React.FC<IBreezeProps> = ({ isLanguages, setIsLanguages }) => {

    const aside = useSelector((state: RootState) => selectAside(state));
    const languages = useSelector((state: RootState) => selectLanguages(state));


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

                    {languages && isLanguages &&
                        <AsideItem>
                            {isLanguages &&
                                <>
                                    <FaRegEdit
                                        className='edite'
                                        data-tooltip-id='tooltip'
                                        data-tooltip-content='Edite Languages'
                                        data-tooltip-offset={0}
                                    />
                                    <BiHide
                                        size='1.2rem'
                                        className='hide'
                                        data-tooltip-id='tooltip'
                                        data-tooltip-content='Hide Languages'
                                        data-tooltip-offset={20}
                                        onClick={() => setIsLanguages(!isLanguages)}
                                    />
                                </>}
                            <Title text='languages'/>
                            <ul className='languages'>
                                <Languages languages={languages.data}/>
                            </ul>
                        </AsideItem>
                    }
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