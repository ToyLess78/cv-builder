import { FC, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { IProject, removeProject, selectProjects, setEditedProjectId, setIsProjects } from '~/slices/projects.slice';
import styles from './Projects.module.scss';
import { AddItemButton, EditButton, HideButton, RemoveButton, ShowAsideButton } from '~/components';
import { setIsEdit } from '~/slices/edit.slice';
import nextId from 'react-id-generator';
import { FiExternalLink } from 'react-icons/fi';

interface IProjectsProps {
    children?: ReactNode;
    projectsItem?: IProject | null;
}

export const Projects: FC<IProjectsProps> = ({children, projectsItem = null}) => {

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
            { isProjects && !projectsItem &&
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
                                    onRemove={ () => dispatch(removeProject(pro.id)) }
                                /> }
                                <div className={ styles.name }>
                                    <strong className={ styles.dots }>{ pro.projectName }</strong>{ pro.link ?
                                    <a className={ styles.link } href={ pro.link }><FiExternalLink/></a> : '' }
                                </div>

                                { pro.technologies.length ? <strong><small
                                >{ `[ ${ pro.technologies.join(', ') } ]` }</small></strong> : '' }
                                <em style={ {
                                    textTransform: 'capitalize'
                                } }>{ pro.type }</em>
                                <br/>
                                { pro.duration ? <span className={ styles.duration }>{ pro.duration }</span> : '' }
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
            {!isProjects && !projectsItem &&
                <div className={styles.show}>
                    <ShowAsideButton
                        title={ title }
                        style={ {top: '-3rem'} }
                        onClick={ () => dispatch(setIsProjects(true)) }
                    />
                </div>}
            {isProjects && projectsItem &&
                <section className={ styles.projects }>
                    { children }
                    <div className={ styles.wrapper }>
                            <div key={ projectsItem.id } className={ styles.title }>
                                <div className={ styles.name }>
                                    <strong className={ styles.dots }>{ projectsItem.projectName }</strong>{ projectsItem.link ?
                                    <a className={ styles.link } href={ projectsItem.link }><FiExternalLink/></a> : '' }
                                </div>

                                { projectsItem.technologies.length ? <strong><small
                                >{ `[ ${ projectsItem.technologies.join(', ') } ]` }</small></strong> : '' }
                                <em style={ {
                                    textTransform: 'capitalize'
                                } }>{ projectsItem.type }</em>
                                <br/>
                                { projectsItem.duration ? <span className={ styles.duration }>{ projectsItem.duration }</span> : '' }
                                <div className={ styles.description }
                                     dangerouslySetInnerHTML={ {__html: projectsItem.description} }></div>

                            </div>
                    </div>
                </section>
            }
        </>
    );
};