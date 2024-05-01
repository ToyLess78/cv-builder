import { FC, ReactNode } from 'react';
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
import { AddItemButton, EditButton, HideButton, RemoveButton, ShowAsideButton } from '~/components';

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
        dispatch(setIsEdit('education'));
    };

    const handlerAddEducation = () => {
        dispatch(setEditedEducationId(nextId()));
        dispatch(setIsEdit('education'));
    };

    return (
        <>
            { isEducation && !educationItem &&
                <section className={ styles.education }>
                    { children }
                    <div className={ styles.wrapper }>
                        { data.map(ed => (
                            <div key={ ed.id } className={ styles.title }>
                                <EditButton
                                    style={ {left: '-3.7rem'} }
                                    title={ ed.degree }
                                    onClick={ () => handlerSetEdit(ed.id) }
                                />
                                { data.length > 1 && <RemoveButton
                                    style={ {left: '-3.8rem', top: '1.5rem'} }
                                    removeOffset={ 20 }
                                    onRemove={ () => dispatch(removeEducation(ed.id)) }
                                /> }
                                <strong>{ ed.degree }<em> { ed.location }</em></strong>
                                <br/>
                                <strong className={styles.school}>{ ed.school }</strong>
                                <br/>
                                <span className={ styles.duration }>{ ed.duration }</span>
                                <div className={ styles.description }
                                     dangerouslySetInnerHTML={ {__html: ed.description} }></div>

                            </div>
                        )) }
                    </div>
                    <HideButton
                        title={ title }
                        style={ {bottom: '1.3rem'} }
                        offset={ 0 }
                        onClick={ () => dispatch(setIsEducation(false)) }
                    />
                    <AddItemButton
                        title="education"
                        onClick={ handlerAddEducation }
                    />
                </section> }
            {!isEducation && !educationItem &&
                <div className={styles.show}>
                    <ShowAsideButton
                        title={ title }
                        style={ {top: '-1rem'} }
                        onClick={ () => dispatch(setIsEducation(true)) }
                    />
                </div>
 }

            { isEducation && educationItem &&
                <section className={ styles.education }>
                    { children }
                    <div className={ styles.wrapper }>
                        <div className={ styles.title }>
                            <strong>{ educationItem.degree }<em> { educationItem.location }</em></strong>
                            <br/>
                            <strong>{ educationItem.school }</strong>
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