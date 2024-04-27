import React, { useEffect, useState } from 'react';
import styles from './EditHeader.module.scss';
import { Info } from '~/components/header/Info';
import { UnderlineInput } from '~/components/common/Inputs/Inputs';
import { MainButton } from '~/components/common/Buttons/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectInfo, setInfo } from '~/slices/info.slice';
import { setIsEdit } from '~/slices/edit.slice';

const EditInfo: React.FC = () => {

    const info = useSelector((state: RootState) => selectInfo(state));
    const [editeInfo, setEditInfo] = useState(info);
    const dispatch = useDispatch();

    const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setInfo(editeInfo));
        dispatch(setIsEdit(''));
    }
    useEffect(() => {
        document.title = `CV_${editeInfo.position}_${editeInfo.firstname} ${editeInfo.lastname}`;
    }, [editeInfo])

    return (
        <div className={styles.info}>
            <Info props={editeInfo}/>
            <form className={styles.inputs} onSubmit={handlerOnSubmit}>
                <div className={styles.name}>
                    <UnderlineInput
                        label='first name'
                        value={editeInfo.firstname}
                        onChange={(e) => setEditInfo({ ...editeInfo, firstname: e.currentTarget.value })}
                    />
                    <UnderlineInput
                        label='last name'
                        value={editeInfo.lastname}
                        onChange={(e) => setEditInfo({ ...editeInfo, lastname: e.currentTarget.value })}
                    />
                </div>
                <UnderlineInput
                    label='job title'
                    value={editeInfo.position}
                    onChange={(e) => setEditInfo({ ...editeInfo, position: e.currentTarget.value })}
                />
                <MainButton type='submit'>Save Changes</MainButton>
            </form>
        </div>
    )
}

export default EditInfo;