import React, { useEffect, useState } from 'react';
import styles from './EditeHeader.module.scss';
import { UnderlineInput } from '~/components/common/Inputs/Inputs';
import { MainButton } from '~/components/common/Buttons/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectInfo, setInfo } from '~/slices/infoSlice';
import { setIsEdite } from '~/slices/editeSlice';
import { About } from '~/components/Header/About';
import { BreezeTitle } from '~/components/breeze/BreezeTitle/BreezeTitle';
import { EditorCustom } from '~/components/Editor/EditorCustom';

const EditeAbout: React.FC = () => {

    const info = useSelector((state: RootState) => selectInfo(state));
    const [editeAbout, setEditeAbout] = useState(info);
    const dispatch = useDispatch();

    const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setInfo(editeAbout));
        dispatch(setIsEdite(''));
    }
    const [text, setText] = useState<null | string>(editeAbout.introduction);

    useEffect(() => {
        setEditeAbout({ ...editeAbout, introduction: text as string})
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
                    onChange={(e) => setEditeAbout({ ...editeAbout, title: e.currentTarget.value })}
                />
                <EditorCustom {...{ text, setText }}/>

                <MainButton type='submit'>Save Changes</MainButton>
            </form>
        </div>
    )
}
export default EditeAbout;