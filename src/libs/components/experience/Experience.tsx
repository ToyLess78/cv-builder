import React, { ReactNode } from 'react';
import styles from './Experience.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import {
    IExperience,
    removeExperience,
    selectExperiences,
    setEditedExperienceId,
    setIsExperiences
} from '~/slices/experiences.slice';
import { AddItemButton, EditButton, HideButton, RemoveButton, ShowAsideButton } from '~/components';
import { setIsEdit } from '~/slices/edit.slice';
import nextId from 'react-id-generator';

interface IExperienceProps {
    children?: ReactNode;
    experienceItem?: IExperience | null;
}

export const Experience: React.FC<IExperienceProps> = ({children, experienceItem = null}) => {

    const experience = useSelector((state: RootState) => selectExperiences(state));
    const {isExperiences, title, data} = experience;

    const dispatch = useDispatch();

    const handlerSetEdit = (id: string) => {
        dispatch(setEditedExperienceId(id));
        dispatch(setIsEdit('experience'));
    };

    const handlerAddExperience = () => {
        dispatch(setEditedExperienceId(nextId()));
        dispatch(setIsEdit('experience'));
    };

    return (
        <>
            { isExperiences && !experienceItem &&
                <section className={ styles.experience }>
                    { children }
                    <div className={ styles.wrapper }>
                        { data.map(exp => (
                            <div key={ exp.id } className={ styles.title }>
                                <EditButton
                                    style={ {left: '-3.7rem'} }
                                    title={ exp.jobTitle }
                                    onClick={ () => handlerSetEdit(exp.id) }
                                />
                                { data.length > 1 && <RemoveButton
                                    style={ {left: '-3.8rem', top: '1.5rem'} }
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
                        onClick={ () => dispatch(setIsExperiences(false)) }
                    />
                    <AddItemButton
                        title="experience"
                        onClick={ handlerAddExperience }
                    />
                </section>}
            {!isExperiences && !experienceItem &&
                <ShowAsideButton
                    title={ title }
                    style={ {top: '-1rem'} }
                    onClick={ () => dispatch(setIsExperiences(true)) }
                /> }
            {isExperiences && experienceItem &&
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
