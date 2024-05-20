import React from "react";
import {
    Additional,
    AdvanceLayout, Aside,
    Certifications,
    Contacts,
    EditButton,
    Languages,
    Main,
    Skills, SocialsBox,
    Title
} from "~/components";
import {Summary} from "~/components/header/Summary";
import {setIsEdit} from "~/slices/edit.slice";
import RootConstants from "~/constants/root.constants";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "~/store/store";
import {selectSkills} from "~/slices/skills.slice";
import {selectInfo} from "~/slices/info.slice";
import {selectCertifications} from "~/slices/certifications.slice";

const Advance: React.FC = () => {
    const dispatch = useDispatch();
    const aside = useSelector((state: RootState) => selectSkills(state));

    const info = useSelector((state: RootState) => selectInfo(state));
    const certificates = useSelector((state: RootState) => selectCertifications(state));

    return (
        <AdvanceLayout

            aside={
                <Aside>

                    <Skills>
                        <Title text={aside?.skills.title}/>
                    </Skills>

                    <Additional>
                        <Title text={aside?.additional.title}/>
                    </Additional>

                    <Certifications>
                        <Title text={certificates.title}/>
                    </Certifications>

                    <Languages>
                        <Title text={RootConstants.Languages}/>
                    </Languages>

                    <Contacts isIcons>
                        <Title text={RootConstants.Contacts}/>
                    </Contacts>

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
                <Main />
                <SocialsBox/>
            </>
            }
        />
    )
}

export default Advance;