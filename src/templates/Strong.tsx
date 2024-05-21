import React from 'react';
import { Info } from '~/components/modules/header/Info';
import { useDispatch, useSelector } from 'react-redux';
import {
    Aside,
    Certifications,
    Contacts,
    EditButton,
    Languages,
    Skills,
    StrongLayout,
    Title
} from '~/components';
import { setIsEdit } from '~/slices/edit.slice';
import { RootState } from '~/store/store';
import { selectSkills } from '~/slices/skills.slice';
import { selectCertifications } from '~/slices/certifications.slice';
import { Summary } from '~/components/modules/header/Summary';
import RootConstants from '~/constants/root.constants';
import { selectInfo } from '~/slices/info.slice';
import { Additional } from '~/components/modules/additional/Additional';
import { Main } from '~/components/modules/Main/Main';

const Strong: React.FC = () => {

    const dispatch = useDispatch();
    const aside = useSelector((state: RootState) => selectSkills(state));
    const certificates = useSelector((state: RootState) => selectCertifications(state));
    const info = useSelector((state: RootState) => selectInfo(state));

    return (
        <StrongLayout
            info={
                <Info>
                    <EditButton
                        onClick={ () => dispatch(setIsEdit(RootConstants.Info)) }
                        title="name & job title"
                    />
                </Info>
            }
            aside={
                <Aside>
                <Contacts>
                    <Title text={RootConstants.Contacts} />
                </Contacts>
                    <Skills>
                        <Title text={aside?.skills.title}/>
                    </Skills>

                    <Additional>
                        <Title text={aside?.additional.title}/>
                    </Additional>

                    <Certifications>
                        <Title text={ certificates.title }/>
                    </Certifications>

                    <Languages>
                        <Title text={RootConstants.Languages}/>
                    </Languages>
                </Aside>
            }
            main={
                <>
                    <Summary>
                        <EditButton
                            onClick={ () => dispatch(setIsEdit(RootConstants.Summary)) }
                            title={ info.title }
                        />
                        <Title text={ info.title }/>
                    </Summary>
                    <Main/>
                </>
            }
        />
    )
};

export default Strong;