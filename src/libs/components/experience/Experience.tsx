import React, { ReactNode } from 'react';
import styles from './Experience.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import {
    IExperience,
    removeExperience,
    selectExperience,
    setEditedExperienceId,
    setIsExperience
} from '~/slices/experiences.slice';
import { AddItemButton, EditButton, HideButton, RemoveButton, ShowAsideButton } from '~/components';
import { setIsEdit } from '~/slices/edit.slice';
import nextId from 'react-id-generator';
import RootConstants from '~/constants/root.constants';
import { selectTheme } from '~/slices/theme.slice';
import TemplateConstants from '~/constants/template.constants';

interface IExperienceProps {
    children?: ReactNode;
    experienceItem?: IExperience | null;
}

export const Experience: React.FC<IExperienceProps> = ({children, experienceItem = null}) => {

    const experience = useSelector((state: RootState) => selectExperience(state));
    const {isExperience, title, data} = experience;

    const dispatch = useDispatch();

    const handlerSetEdit = (id: string) => {
        dispatch(setEditedExperienceId(id));
        dispatch(setIsEdit(RootConstants.Experience));
    };

    const handlerAddExperience = () => {
        dispatch(setEditedExperienceId(nextId()));
        dispatch(setIsEdit(RootConstants.Experience));
    };

    const {template} = useSelector((state: RootState) => selectTheme(state));

    return (
        <>
            { isExperience && !experienceItem &&
                <section className={`${styles.experience} ${styles[template]}`}>
                    { children }
                    <div className={ styles.wrapper }>
                        { data.map(exp => (
                            <div key={ exp.id } className={ styles.title }>
                                <EditButton
                                    style={ {left: template === TemplateConstants.Breeze ? '-3.7rem' : '-1.9rem'} }
                                    title={ exp.jobTitle }
                                    onClick={ () => handlerSetEdit(exp.id) }
                                />
                                { data.length > 1 && <RemoveButton
                                    style={ {left: template === TemplateConstants.Breeze ? '-3.8rem' : '-2.1rem', top: '1.5rem'} }
                                    removeOffset={ 20 }
                                    onRemove={ () => dispatch(removeExperience(exp.id)) }
                                /> }
                                <strong>{ `${ exp.jobTitle } ` }
                                    {exp.employer ? <small
                                    >{ `[ ${ exp.employer } ]` }</small> : ''}
                                    <em> { exp.location }</em></strong>
                                <br/>
                                <span className={ styles.duration }>{ exp.duration }</span>
                                <div className={ styles.description }
                                     dangerouslySetInnerHTML={ {__html: exp.description} }></div>

                            </div>
                        )) }
                    </div>
                    <HideButton
                        title={ title }
                        style={ {bottom: '1.3rem'} }
                        offset={ 0 }
                        onClick={ () => dispatch(setIsExperience(false)) }
                    />
                    <AddItemButton
                        title={RootConstants.Experience}
                        onClick={ handlerAddExperience }
                    />
                </section>}
            {!isExperience && !experienceItem &&
                <div className={`${styles.show} ${styles[template]}`}>
                    <ShowAsideButton
                        title={ title }
                        style={ {top: template === TemplateConstants.Breeze ?'-3rem' : '2rem'} }
                        onClick={ () => dispatch(setIsExperience(true)) }
                    />
                </div>}
            {isExperience && experienceItem &&
                <section className={ styles.experience }>
                    { children }
                    <div className={ styles.wrapper }>
                        <div className={ styles.title }>
                            <strong>{ `${ experienceItem.jobTitle } ` }
                                {experienceItem.employer ? <small
                            >{ `[ ${ experienceItem.employer } ]` }</small> : ''}
                                <em> { experienceItem.location }</em></strong>
                            <br/>
                            <span className={ styles.duration }>{ experienceItem.duration }</span>
                            <div className={ styles.description }
                                 dangerouslySetInnerHTML={ {__html: experienceItem.description} }>
                            </div>

                        </div>
                    </div>
                </section>
            }
        </>
    )
};
