import { FC, ReactNode, useState } from 'react';
import styles from './Education.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import {
    IEducation,
    removeEducation,
    selectEducation,
    setEditedEducationId,
    setIsEducation
} from '~/slices/education.slice';
import { setIsEdit } from '~/slices/edit.slice';
import nextId from 'react-id-generator';
import { AddItemButton, CollapsedWrapper, EditButton, HideButton, RemoveButton, ShowMaineButton } from '~/components';
import RootConstants from '~/constants/root.constants';
import { selectTheme } from '~/slices/theme.slice';
import TemplateConstants from '~/constants/template.constants';

interface IEducationProps {
    children?: ReactNode;
    educationItem?: IEducation | null;
}

export const Education: FC<IEducationProps> = ({children, educationItem = null}) => {

    const education = useSelector((state: RootState) => selectEducation(state));

    const {isEducation, title, data} = education;
    const dispatch = useDispatch();

    const handlerSetEdit = (id: string) => {
        dispatch(setEditedEducationId(id));
        dispatch(setIsEdit(RootConstants.Education));
    };

    const handlerAddEducation = () => {
        dispatch(setEditedEducationId(nextId()));
        dispatch(setIsEdit(RootConstants.Education));
    };

    const {template} = useSelector((state: RootState) => selectTheme(state));

    const [isItem, setIsItem] = useState([...data.map(pro => pro.id)]);

    const handleOnRemove = (id: string) => {
        setIsItem(isItem.filter((item) => item !== id));

        const timeoutId = setTimeout(() => {
            dispatch(removeEducation(id));
        }, 500);

        return () => clearTimeout(timeoutId);
    };

    return (
        <>
            {!educationItem &&
                <CollapsedWrapper
                    isShow={isEducation}
                    buttons={
                    <>
                        <HideButton
                            title={ title }
                            style={ {bottom: '.6rem'} }
                            offset={ 0 }
                            onClick={ () => dispatch(setIsEducation(false)) }
                        />
                        <AddItemButton
                            style={ {bottom: '-.4rem'} }
                            title={RootConstants.Education}
                            onClick={ handlerAddEducation }
                        />
                    </>
                    }

                    content={
                        <section className={`${styles.education} ${styles[template]}`}>
                            { children }
                            <div className={ styles.wrapper }>
                                { data.map(ed => (

                                    <CollapsedWrapper
                                        key={ ed.id }
                                        isShow={ isItem.some(id => id === ed.id) }
                                        content={
                                            <div className={ styles.title }>
                                                <EditButton
                                                    style={ {left: template === TemplateConstants.Breeze ? '-3.7rem' : '-1.9rem'} }
                                                    title={ ed.degree }
                                                    onClick={ () => handlerSetEdit(ed.id) }
                                                />
                                                { data.length > 1 && <RemoveButton
                                                    style={ {left: template === TemplateConstants.Breeze ? '-3.8rem' : '-2.1rem', top: '1.3rem'} }
                                                    removeOffset={ 20 }
                                                    onRemove={ () => handleOnRemove(ed.id) }
                                                /> }
                                                <strong>{ ed.degree }<em> { ed.location }</em></strong>
                                                <br/>
                                                {ed.school ? <strong><small
                                                >{ `[ ${ ed.school } ]` }</small></strong> : ''}
                                                <br/>
                                                <span className={ styles.duration }>{ ed.duration }</span>
                                                <div className={ styles.description }
                                                     dangerouslySetInnerHTML={ {__html: ed.description} }></div>

                                            </div>
                                        }
                                    />

                                )) }
                            </div>

                        </section>
                    }

                />
            }

            {!isEducation && !educationItem &&
                <div className={ styles.show }>
                    <ShowMaineButton
                        title={ title }
                        onClick={ () => dispatch(setIsEducation(true)) }
                    />
                </div>}

            { isEducation && educationItem &&
                <section className={ `${styles.education} ${styles[template]}` }>
                    { children }
                    <div className={ styles.wrapper }>
                        <div className={ styles.title }>
                            <strong>{ educationItem.degree }<em> { educationItem.location }</em></strong>
                            <br/>
                            {educationItem.school ? <strong><small
                            >{ `[ ${ educationItem.school } ]` }</small></strong> : ''}
                            <br/>
                            <span className={ styles.duration }>{ educationItem.duration }</span>
                            <div className={ styles.description }
                                 dangerouslySetInnerHTML={ {__html: educationItem.description} }>
                            </div>

                        </div>
                    </div>
                </section>
            }

        </>

    );
};