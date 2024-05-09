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

    return (
        <>
            { isEducation && !educationItem &&
                <section className={`${styles.education} ${styles[template]}`}>
                    { children }
                    <div className={ styles.wrapper }>
                        { data.map(ed => (
                            <div key={ ed.id } className={ styles.title }>
                                <EditButton
                                    style={ {left: template === TemplateConstants.Breeze ? '-3.7rem' : '-1.9rem'} }
                                    title={ ed.degree }
                                    onClick={ () => handlerSetEdit(ed.id) }
                                />
                                { data.length > 1 && <RemoveButton
                                    style={ {left: template === TemplateConstants.Breeze ? '-3.8rem' : '-2.1rem', top: '1.3rem'} }
                                    removeOffset={ 20 }
                                    onRemove={ () => dispatch(removeEducation(ed.id)) }
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
                        )) }
                    </div>
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
                </section> }
            {!isEducation && !educationItem &&
                <div className={styles.show}>
                    <ShowAsideButton
                        title={ title }
                        style={ {top: template === TemplateConstants.Breeze ?'-3rem' : '-1rem'} }
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