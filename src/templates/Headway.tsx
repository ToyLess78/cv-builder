import React from 'react';
import {
    Aside,
    Certifications,
    Contacts,
    EditButton,
    HeadwayLayout,
    Languages,
    Main,
    Skills,
    Title
} from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { Info } from '~/components/header/Info';
import { setIsEdit } from '~/slices/edit.slice';
import RootConstants from '~/constants/root.constants';
import { RootState } from '~/store/store';
import { selectSkills } from '~/slices/skills.slice';
import { selectCertifications } from '~/slices/certifications.slice';
import { selectInfo } from '~/slices/info.slice';
import { Summary } from '~/components/header/Summary';


const Headway: React.FC = () => {
    const dispatch = useDispatch();
    const aside = useSelector((state: RootState) => selectSkills(state));
    const certificates = useSelector((state: RootState) => selectCertifications(state));
    const info = useSelector((state: RootState) => selectInfo(state));
    return (
        <HeadwayLayout
            contacts={
            <Contacts isIcons />
        }
            info={
                <Info>
                    <EditButton
                        onClick={ () => dispatch(setIsEdit(RootConstants.Info)) }
                        title="name & job title"
                    />
                </Info>
            }
            main={<Main />}
            aside={
                <Aside>
                    <Summary>
                        <EditButton
                            onClick={() => dispatch(setIsEdit(RootConstants.Summary))}
                            title={info.title}
                        />
                        <Title text={info.title}/>
                    </Summary>

                    <Skills>
                        <Title text={aside?.skills.title}/>
                    </Skills>

                    <Certifications>
                        <Title text={ certificates.title }/>
                    </Certifications>

                    <Languages>
                        <Title text={RootConstants.Languages}/>
                    </Languages>
                </Aside>
            }
            // image={
            //     <Image styles={styles.img}/>
            // }
        />
    )
};

export default Headway;