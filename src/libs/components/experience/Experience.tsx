import React, { ReactNode } from 'react';
import styles from './Experience.module.scss';
import { formatDurationToString } from '~/utils/utils';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectExperiences } from '~/slices/experience.slice';

interface IAboutProps {
    description: string
}

const Experience: React.FC<{ children?: ReactNode, props?: IAboutProps }> = ({children, props}) => {

    const experience = useSelector((state: RootState) => selectExperiences(state));

    return (
        <section className={styles.experience}>
            {children}
            <div className={styles.wrapper}>
            {experience.data.map(exp => (
                <div key={exp.id}>
                    <strong>{ `${ exp.jobTitle } - ${ exp.employer }`} <em> { exp.location }</em></strong>
                    <br/>
                    <span className={styles.duration}>{formatDurationToString(exp.duration)}</span>
                    <div className={styles.description} dangerouslySetInnerHTML={{ __html: props?.description || exp.description }}></div>

                </div>
            ))}
            </div>
        </section>
    )
}

export default Experience;