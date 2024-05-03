import { FC, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectProjects, setEditedProjectId, setIsProjects } from '~/slices/projects.slice';
import styles from './Projects.module.scss';
import { IEducation, removeEducation } from '~/slices/education.slice';
import { AddItemButton, EditButton, HideButton, RemoveButton } from '~/components';
import { setIsEdit } from '~/slices/edit.slice';
import nextId from 'react-id-generator';

interface IProjectsProps {
    children?: ReactNode;
    projectsItem?: IEducation | null;
}

export const Projects: FC<IProjectsProps> = ({children}) => {

    const projects = useSelector((state: RootState) => selectProjects(state));

    const {isProjects, title, data} = projects;

    const dispatch = useDispatch();

    const handlerSetEdit = (id: string) => {
        dispatch(setEditedProjectId(id));
        dispatch(setIsEdit('projects'));
    };

    const handlerAddProject = () => {
        dispatch(setEditedProjectId(nextId()));
        dispatch(setIsEdit('projects'));
    };

    return (
        <>
            { isProjects &&
                <section className={ styles.projects }>
                    { children }
                    <div className={ styles.wrapper }>
                        { data.map(pro => (
                            <div key={ pro.id } className={ styles.title }>
                                <EditButton
                                    style={ {left: '-3.7rem'} }
                                    title={ pro.projectName }
                                    onClick={ () => handlerSetEdit(pro.id) }
                                />
                                { data.length > 1 && <RemoveButton
                                    style={ {left: '-3.8rem', top: '1.5rem'} }
                                    removeOffset={ 20 }
                                    onRemove={ () => dispatch(removeEducation(pro.id)) }
                                /> }
                                <strong>{ pro.type }<em> </em></strong>
                                <span className={ styles.duration }>{ pro.duration }</span>
                                <div className={ styles.description }
                                     dangerouslySetInnerHTML={ {__html: pro.description} }></div>

                            </div>
                        )) }
                    </div>
                    <HideButton
                        title={ title }
                        style={ {bottom: '1.3rem'} }
                        offset={ 0 }
                        onClick={ () => dispatch(setIsProjects(false)) }
                    />
                    <AddItemButton
                        title="project"
                        onClick={ handlerAddProject }
                    />
                </section>
            }
        </>
    );
};