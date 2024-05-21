import React from 'react';
import { Aside, EditButton, Languages, Main, ReplaceAsideItem, Skills, SuccessLayout, Title } from '~/components';
import RootConstants from '~/constants/root.constants';
import { Summary } from '~/components/modules/header/Summary';
import { setIsEdit } from '~/slices/edit.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectSkills } from '~/slices/skills.slice';
import { selectInfo } from '~/slices/info.slice';

const Success: React.FC = () => {
    const dispatch = useDispatch();
    const aside = useSelector((state: RootState) => selectSkills(state));

    const info = useSelector((state: RootState) => selectInfo(state));

    return (
        <SuccessLayout
            aside={
                <Aside>
                    <Summary>
                        <EditButton
                            onClick={ () => dispatch(setIsEdit(RootConstants.Summary)) }
                            title={ info.title }
                        />
                        <Title text={ info.title }/>
                    </Summary>

                    <Skills>
                        <Title text={aside?.skills.title}/>
                    </Skills>

                    <ReplaceAsideItem/>

                    <Languages>
                        <Title text={RootConstants.Languages}/>
                    </Languages>

                </Aside>
            }
            main={
                    <Main />
            }
        />
    )
};

export default Success;