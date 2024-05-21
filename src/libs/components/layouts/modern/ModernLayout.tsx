import React, { ReactNode } from 'react';
import styles from './Modern.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Info } from '~/components/modules/header/Info';
import { EditButton } from '~/components/common/Buttons/Buttons';
import { setIsEdit } from '~/slices/edit.slice';
import RootConstants from '~/constants/root.constants';
import { Image } from '~/components/common/Image/Image';
import { Summary } from '~/components/modules/header/Summary';
import { Title } from '~/components/modules/Title/Title';
import { RootState } from '~/store/store';
import { selectInfo } from '~/slices/info.slice';

interface IModernLayoutProps {
    main: ReactNode;
    aside: ReactNode;
}

export const ModernLayout: React.FC<IModernLayoutProps> = ({main, aside}) => {

    const dispatch = useDispatch();
    const info = useSelector((state: RootState) => selectInfo(state));

    return (
        <div className={ styles.modern }>
            <div className={ styles.background }></div>
            <div className={ styles.gray }></div>
            <div className={ styles.header }>
                <div className={ styles.info }>
                    <Info>
                        <EditButton
                            onClick={ () => dispatch(setIsEdit(RootConstants.Info)) }
                            title="name & job title"
                        />
                    </Info>
                </div>
                <div className={ styles.image }>
                    <Image styles={ styles.img } isHide/>
                </div>
            </div>
            <div className={ styles.summary }>
                <Summary>
                    <EditButton
                        onClick={ () => dispatch(setIsEdit(RootConstants.Summary)) }
                        title={ info.title }
                    />
                    <Title text={ info.title }/>
                </Summary>
            </div>
            <div className={ styles.main }>{main}</div>
            <div className={ styles.aside }>{aside}</div>
        </div>

    )
}