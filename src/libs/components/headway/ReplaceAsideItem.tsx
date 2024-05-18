import React, { CSSProperties, useState } from 'react';
import styles from './Headway.module.scss';
import { FaArrowsRotate } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectCertifications, setIsCertifications } from '~/slices/certifications.slice';
import { selectSkills, setIsAdditional } from '~/slices/skills.slice';
import { Additional, Certifications, CollapsedWrapper, ShowAsideButton, Title } from '~/components/components';
import RootConstants from '~/constants/root.constants';

interface ISelectAsideItemProps {
    style?: CSSProperties;
    offset?: number;
}

export const ReplaceAsideItem: React.FC<ISelectAsideItemProps> = (
    {
        style,
        offset = 40
    }) => {
    const certificates = useSelector((state: RootState) => selectCertifications(state));
    const {isCertifications} = certificates;

    const aside = useSelector((state: RootState) => selectSkills(state));
    const isAdditional = aside.additional.isAdditional;

    const dispatch = useDispatch();

    const handleSetIsItems = () => {
        !isCertifications && !isAdditional &&
        dispatch(setIsCertifications(true));
        !isCertifications && dispatch(setIsCertifications(true));
        !isAdditional && dispatch(setIsAdditional(true));
    };

    const titleShow = (!isAdditional && !isCertifications) ? certificates?.title :
        !isAdditional ? aside?.additional.title : certificates?.title;

    const [isReplace, setIsReplace] = useState(true);

    const [isShow, setIsShow] = useState(true);

    const handleToggleItem = () => {
        setIsShow(false);
        const timeoutId = setTimeout(() => {
            setIsReplace(!isReplace);
            setIsShow(true);
        }, 600);

        return () => clearTimeout(timeoutId);
    };

    return (
        <CollapsedWrapper
            isShow={ isShow }
            buttons={ (isCertifications && isAdditional) ? <FaArrowsRotate
                    className={ styles.replace }
                    data-tooltip-id="tooltip"
                    data-tooltip-content={ `Replace with ${ isReplace ? RootConstants.Additional : RootConstants.Certifications }` }
                    data-tooltip-offset={ offset }
                    onClick={ handleToggleItem }
                    style={ style }/> :
                <ShowAsideButton
                    onClick={ handleSetIsItems }
                    title={ titleShow }
                    toggleClass
                /> }
            content={
                isReplace ? <Certifications>
                        <Title text={ certificates.title }/>
                    </Certifications> :
                    <Additional>
                        <Title text={ aside?.additional.title }/>
                    </Additional>
            }
        />
    );
};