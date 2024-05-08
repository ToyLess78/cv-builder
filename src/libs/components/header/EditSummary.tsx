import React, { FC, useEffect, useState } from 'react';
import { UnderlineInput } from '~/components/common/Inputs/Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectInfo, setInfo } from '~/slices/info.slice';
import { setIsEdit } from '~/slices/edit.slice';
import { Summary } from '~/components/header/Summary';
import { EditorCustom } from '~/components/common/Editor/EditorCustom';
import { MainEditWrapper } from '~/components/Main/MainEditWrapper';
import { CurrentTitle } from '~/components';

const EditSummary: FC = () => {

    const info = useSelector((state: RootState) => selectInfo(state));
    const [editSummary, setEditSummary] = useState(info);
    const dispatch = useDispatch();

    const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setInfo(editSummary));
        dispatch(setIsEdit(''));
    }
    const [text, setText] = useState<null | string>(editSummary.summary);

    useEffect(() => {
        setEditSummary({ ...editSummary, summary: text as string})
    }, [text])

    return (
       <MainEditWrapper
           onSubmit={handlerOnSubmit}
           preview={
               <Summary props={editSummary}>
                   <CurrentTitle text={editSummary.title}/>
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