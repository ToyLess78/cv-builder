import React from 'react';
import styles from './Buttons.module.css';
import { FaRegEdit } from 'react-icons/fa';

export const MainButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children }) => {
    return (
        <button className={styles.button}><span>{children}</span></button>
    )
};

export const EditeButton: React.FC<{onClick?: React.MouseEventHandler<SVGElement>}> = ({onClick}) => {
    return(
        <FaRegEdit className={styles.edite} onClick={onClick}/>
    )
}