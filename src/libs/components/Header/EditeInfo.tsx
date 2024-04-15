import React, { useEffect, useState } from 'react';
import styles from './EditeHeader.module.scss';
import { Info } from '~/components/Header/Info';
import { UnderlineInput } from '~/components/common/Inputs/Inputs';
import { MainButton } from '~/components/Buttons/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectInfo, setInfo } from '~/slices/infoSlice';
import { setIsEdite } from '~/slices/editeSlice';

const EditeInfo: React.FC = () => {

    const info = useSelector((state: RootState) => selectInfo(state));
    const [editeInfo, setEditeInfo] = useState(info);
    const dispatch = useDispatch();

    const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setInfo(editeInfo));
        dispatch(setIsEdite(''));
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
                        onChange={(e) => setEditeInfo({ ...editeInfo, firstname: e.currentTarget.value })}
                    />
                    <UnderlineInput
                        label='last name'
                        value={editeInfo.lastname}
                        onChange={(e) => setEditeInfo({ ...editeInfo, lastname: e.currentTarget.value })}
                    />
                </div>
                <UnderlineInput
                    label='job title'
                    value={editeInfo.position}
                    onChange={(e) => setEditeInfo({ ...editeInfo, position: e.currentTarget.value })}
                />
                <MainButton type='submit'>Save Changes</MainButton>
            </form>
        </div>
    )
}

export default EditeInfo;