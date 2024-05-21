import React, { FC, useEffect, useState } from 'react';
import { UnderlineInput } from '~/components/common/Inputs/Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectInfo, setInfo } from '~/slices/info.slice';
import { setIsEdit } from '~/slices/edit.slice';
import { Summary } from '~/components/modules/header/Summary';
import { EditorCustom } from '~/components/common/Editor/EditorCustom';
import { MainEditWrapper } from '~/components/modules/Main/MainEditWrapper';
import { Title } from '~/components';
import { selectTheme } from '~/slices/theme.slice';
import TemplateConstants from '~/constants/template.constants';

const EditSummary: FC = () => {

    const info = useSelector((state: RootState) => selectInfo(state));
    const [editSummary, setEditSummary] = useState(info);
    const dispatch = useDispatch();

    const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setInfo(editSummary));
        dispatch(setIsEdit(''));
    };
    const [text, setText] = useState<null | string>(editSummary.summary);

    useEffect(() => {
        setEditSummary({...editSummary, summary: text as string});
    }, [text]);

    const {template} = useSelector((state: RootState) => selectTheme(state));


    const style = template === TemplateConstants.Modern ? {backgroundColor: 'var(--primary)', color: 'white', padding: '1rem'} : {};

    return (
        <MainEditWrapper
            onSubmit={ handlerOnSubmit }
            preview={
                <Summary props={ editSummary } style={ style }>
                    <Title text={ editSummary.title }/>
                </Summary>
            }
            edit={
           <>
               <UnderlineInput
                   label='title'
                   value={editSummary.title}
                   onChange={(e) => setEditSummary({ ...editSummary, title: e.currentTarget.value })}
               />
               <EditorCustom {...{ text, setText }}/>
           </>
           }
       />
    )
}
export default EditSummary;