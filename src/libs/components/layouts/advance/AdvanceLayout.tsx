import React, {ReactNode, useState} from "react";
import styles from './Advance.module.scss';
import {Image} from "~/components/common/Image/Image";
import {Info} from "~/components/modules/header/Info";
import {EditButton, HideButton, ShowButton} from "~/components/common/Buttons/Buttons";
import {setIsEdit} from "~/slices/edit.slice";
import RootConstants from "~/constants/root.constants";
import {useDispatch} from "react-redux";
import {CollapsedWrapper} from "~/components/common/CollapsedWrapper/CollapsedWrapper";

interface IAdvanceLayoutProps {
    aside: ReactNode;
    main: ReactNode;
}

export const AdvanceLayout: React.FC<IAdvanceLayoutProps> = ({aside, main}) => {
    const dispatch = useDispatch();

    const [isShowImg, setIsShowImg] = useState(true)

    return (
        <div className={styles.advance}>
            <div className={styles.header}>
                <div className={styles.buttons}>
                    {isShowImg && <HideButton
                        offset={ 0 }
                        title="Photo"
                        onClick={ () => setIsShowImg(!isShowImg)}
                    />}
                    { !isShowImg &&
                        <ShowButton
                            title="Photo"
                            onClick={ () => setIsShowImg(!isShowImg) }
                        /> }
                </div>
                    <CollapsedWrapper
                        isShow={isShowImg}
                        content={
                            <Image styles={styles.img} isHide/>
                        }

                    />
                    <Info>
                        <EditButton
                            onClick={() => dispatch(setIsEdit(RootConstants.Info))}
                            title="name & job title"
                        />
                    </Info>
            </div>
            <div className={styles.aside}>{aside}</div>
            <div className={styles.main}>{main}</div>
        </div>
    )
}