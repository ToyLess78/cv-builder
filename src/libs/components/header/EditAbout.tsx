import React, { useEffect, useState } from 'react';
import styles from './EditHeader.module.scss';
import { UnderlineInput } from '~/components/common/Inputs/Inputs';
import { MainButton } from '~/components/common/Buttons/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectInfo, setInfo } from '~/slices/info.slice';
import { setIsEdit } from '~/slices/edit.slice';
import { About } from '~/components/header/About';
import { BreezeTitle } from '~/components/breeze/BreezeTitle/BreezeTitle';
import { EditorCustom } from '~/components/common/Editor/EditorCustom';

const EditAbout: React.FC = () => {

    const info = useSelector((state: RootState) => selectInfo(state));
    const [editeAbout, setEditAbout] = useState(info);
    const dispatch = useDispatch();

    const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setInfo(editeAbout));
        dispatch(setIsEdit(''));
    }
    const [text, setText] = useState<null | string>(editeAbout.summary);

    useEffect(() => {
        setEditAbout({ ...editeAbout, summary: text as string})
    }, [text])

    return (
        <div className={styles.about}>
            <About props={editeAbout}>
                <BreezeTitle text={editeAbout.title}/>
            </About>
            <form className={styles.form} onSubmit={handlerOnSubmit}>
                <UnderlineInput
                    label='title'
                    value={editeAbout.title}
                    onChange={(e) => setEditAbout({ ...editeAbout, title: e.currentTarget.value })}
                />
                <EditorCustom {...{ text, setText }}/>

                <MainButton type='submit'>Save Changes</MainButton>
            </form>
        </div>
    )
}
export default EditAbout;