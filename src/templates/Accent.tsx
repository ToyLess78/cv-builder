import React from 'react';
import {
    AccentLayout,
    Aside,
    Certifications,
    Contacts,
    EditButton,
    Languages,
    Skills,
    Title
} from '~/components';
import RootConstants from '~/constants/root.constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectSkills } from '~/slices/skills.slice';
import { selectCertifications } from '~/slices/certifications.slice';
import { selectInfo } from '~/slices/info.slice';
import { setIsEdit } from '~/slices/edit.slice';
import { Summary } from '~/components/modules/header/Summary';
import { Info } from '~/components/modules/header/Info';
import { Additional } from '~/components/modules/additional/Additional';
import { Main } from '~/components/modules/Main/Main';

const Accent: React.FC = () => {

    const dispatch = useDispatch();
    const aside = useSelector((state: RootState) => selectSkills(state));
    const certificates = useSelector((state: RootState) => selectCertifications(state));
    const info = useSelector((state: RootState) => selectInfo(state));

    return (
        <AccentLayout
            info={
                <Info>
                    <EditButton
                        onClick={ () => dispatch(setIsEdit(RootConstants.Info)) }
                        title="name & job title"
                    />
                </Info>
            }
            contacts={
                <Aside>
                    <Contacts />
                </Aside> }

            summary={
                <Summary>
                    <EditButton
                        onClick={ () => dispatch(setIsEdit(RootConstants.Summary)) }
                        title={ info.title }
                    />
                    <Title text={ info.title }/>
                </Summary> }

            main={ <Main/> }
            aside={
                <Aside>
                    <Skills>
                        <Title text={ aside?.skills.title }/>
                    </Skills>

                    <Additional>
                        <Title text={ aside?.additional.title }/>
                    </Additional>

                    <Certifications>
                        <Title text={ certificates.title }/>
                    </Certifications>

                    <Languages>
                        <Title text={ RootConstants.Languages }/>
                    </Languages>
                </Aside>
            }
        />
    );
}

export default Accent;