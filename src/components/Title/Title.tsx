import React, { ReactNode } from 'react';
import styles from './Title.module.css'

interface ITitleProps {
    text: ReactNode
}

export const Title: React.FC<ITitleProps> = ({ text } ) => {
    return (
        <h4 className={styles.title}>{text}</h4>
    )
}