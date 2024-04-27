import React, { ReactNode } from 'react';
import styles from './Experience.module.scss';
import { formatDurationToString } from '~/utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectExperiences, setEditedId, setIsExperiences } from '~/slices/experiences.slice';
import { AddItemButton, EditButton, HideButton, ShowAsideButton } from '~/components';
import { setIsEdit } from '~/slices/edit.slice';

const Experience: React.FC<{children?: ReactNode}> = ({children}) => {

    const experience = useSelector((state: RootState) => selectExperiences(state));
    const {isExperiences, title, data} = experience;

    const dispatch = useDispatch();

    const handlerSetEdit = (id: string) => {
        dispatch(setIsEdit('experience'));
        dispatch(setEditedId(id));
    };

    const handlerAddExperience = () => {
        dispatch(setIsEdit('experience'));
        dispatch(setEditedId(''));
    };

    return (
        <>
            { isExperiences ?
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
                                <strong>{ `${ exp.jobTitle } - ${ exp.employer }` } <em> { exp.location }</em></strong>
                                <br/>
                                <span className={ styles.duration }>{ formatDurationToString(exp.duration) }</span>
                                <div className={ styles.description }
                                     dangerouslySetInnerHTML={ {__html: exp.description} }></div>

                            </div>
                        )) }
                    </div>
                    <HideButton
                        title={ title }
                        style={ {bottom: '1.3rem'} }
                        onClick={ () => dispatch(setIsExperiences(false)) }
                    />
                    <AddItemButton
                        title="experience"
                        style={ {left: '-1.2rem', bottom: '0'} }
                        onClick={ handlerAddExperience }
                    />
                </section> :
                <ShowAsideButton
                    title={ title }
                    style={ {top: '-1rem'} }
                    onClick={ () => dispatch(setIsExperiences(true)) }
                /> }

        </>
    )
}

export default Experience;