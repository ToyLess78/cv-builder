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

interface IEditButtonProps {
    onClick?: React.MouseEventHandler<SVGElement>;
    title: string;
}

export const EditButton: React.FC<IEditButtonProps> = ({onClick, title}) => {
    return (
        <FaRegEdit
            className={ styles.edit }
            onClick={ onClick }
            data-tooltip-id='tooltip'
            data-tooltip-content={ `Edit ${ title }` }
            data-tooltip-offset={ 0 }
        />
    );
};

export const HideButton: React.FC<IEditButtonProps> = ({onClick, title}) => {
    return (
        <BiHide
            size='1.3rem'
            className={ styles.hide }
            onClick={ onClick }
            data-tooltip-id='tooltip'
            data-tooltip-content={ `Hide ${ title }` }
            data-tooltip-offset={ 20 }
        />
    );
};

export const ShowButton: React.FC<IEditButtonProps> = ({onClick, title}) => {
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

export const ReturnButton: React.FC<IEditButtonProps> = ({onClick, title}) => {
    return (
        <BsArrowReturnRight
            data-tooltip-id='tooltip'
            data-tooltip-content={ `Return default data ${ title }` }
            data-tooltip-offset={ 0 } className={ styles.edit } onClick={ onClick }/>
    );
};

interface IRemoveButtonProps {
    onRemove?: () => void;
    removeStyle?: React.CSSProperties;
}

export const RemoveButton: React.FC<IRemoveButtonProps> = ({onRemove, removeStyle}) => {
    return (
        <div className={ styles.box }>
            <IoMdRemoveCircleOutline
                data-tooltip-content='Remove'
                data-tooltip-id='tooltip'
                size='1.2rem'
                data-tooltip-offset={ 0 }
                onClick={ onRemove }
                style={ removeStyle }
            />
        </div>
    );
};

interface IEditButtonsBoxProps extends IRemoveButtonProps {
    onEdit?: () => void;
    editeStyle?: React.CSSProperties;
}

export const EditButtonsBox: React.FC<IEditButtonsBoxProps> = ({onRemove, onEdit, removeStyle, editeStyle}) => {
    return (
        <div className={ styles.box }>
            <FaRegEdit
                data-tooltip-id='tooltip'
                data-tooltip-content='Edit'
                data-tooltip-offset={ 0 }
                onClick={onEdit}
                style={editeStyle}
            />
            <IoMdRemoveCircleOutline
                data-tooltip-content='Remove'
                data-tooltip-id='tooltip'
                size='1.2rem'
                data-tooltip-offset={ 20 }
                onClick={onRemove}
                style={removeStyle}
            />
        </div>
    )
}

interface IAddButtonProps {
    text?: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)  => void;
    style?: React.CSSProperties;
}

export const AddButton: React.FC<IAddButtonProps> = ({text, onClick, style}) => {
    return (
        <div className={styles.add}>
            <button className={styles.btn} onClick={onClick} style={style}>
                + Add {text}
            </button>
        </div>

    )
}