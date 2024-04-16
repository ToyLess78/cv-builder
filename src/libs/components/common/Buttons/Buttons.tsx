import React from 'react';
import styles from './Buttons.module.scss';
import { FaRegEdit } from 'react-icons/fa';
import { BsArrowReturnRight } from 'react-icons/bs';
import { BiHide } from 'react-icons/bi';
import { MdOutlineVisibility } from 'react-icons/md';
import { IoMdRemoveCircleOutline } from 'react-icons/io';

export const MainButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({children}) => {
    return (
        <button className={ styles.button }><span>{ children }</span></button>
    );
};

interface IEditeButtonProps {
    onClick?: React.MouseEventHandler<SVGElement>;
    title: string;
}

export const EditeButton: React.FC<IEditeButtonProps> = ({onClick, title}) => {
    return (
        <FaRegEdit
            className={ styles.edite }
            onClick={ onClick }
            data-tooltip-id="tooltip"
            data-tooltip-content={ `Edite ${ title }` }
            data-tooltip-offset={ 0 }
        />
    );
};

export const HideButton: React.FC<IEditeButtonProps> = ({onClick, title}) => {
    return (
        <BiHide
            size='1.3rem'
            className={ styles.hide }
            onClick={ onClick }
            data-tooltip-id="tooltip"
            data-tooltip-content={ `Hide ${ title }` }
            data-tooltip-offset={ 20 }
        />
    );
};

export const ShowButton: React.FC<IEditeButtonProps> = ({onClick, title}) => {
    return (
        <div className={styles.show}>
            <MdOutlineVisibility
                size='1.2rem'
                className={styles.hide}
                data-tooltip-id='tooltip'
                data-tooltip-content={`Show ${ title }`}
                data-tooltip-offset={0}
                onClick={ onClick }
            />
        </div>
    );
};

export const ReturnButton: React.FC<IEditeButtonProps> = ({onClick, title}) => {
    return (
        <BsArrowReturnRight
            data-tooltip-id="tooltip"
            data-tooltip-content={ `Return default data ${ title }` }
            data-tooltip-offset={ 0 } className={ styles.edite } onClick={ onClick }/>
    );
};

interface IEditeButtonsBoxProps {
    onRemove?: () => void;
    onEdite?: () => void;
}

export const EditeButtonsBox: React.FC<IEditeButtonsBoxProps> = ({onRemove, onEdite}) => {
    return (
        <div className={styles.box}>
            <FaRegEdit
                data-tooltip-id='tooltip'
                data-tooltip-content='Edite'
                data-tooltip-offset={ 0 }
                onClick={onEdite}
            />
            <IoMdRemoveCircleOutline
                data-tooltip-content='Remove'
                data-tooltip-id='tooltip'
                size='1.2rem'
                data-tooltip-offset={ 20 }
                onClick={onRemove}
            />
        </div>
    )
}