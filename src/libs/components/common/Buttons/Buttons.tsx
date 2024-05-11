import React from 'react';
import styles from './Buttons.module.scss';
import { FaRegEdit } from 'react-icons/fa';
import { BsArrowReturnRight } from 'react-icons/bs';
import { BiHide } from 'react-icons/bi';
import { MdOutlineVisibility } from 'react-icons/md';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';
import { LuUpload } from 'react-icons/lu';
import { HiOutlineSave } from 'react-icons/hi';
import { RiMoreLine } from 'react-icons/ri';
import { TbRestore } from 'react-icons/tb';

export const MainButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({children}) => {
    return (
        <button className={ styles.button }><span>{ children }</span></button>
    );
};

interface IEditButtonProps {
    onClick?: React.MouseEventHandler<SVGElement>;
    title?: string;
    offset?: number;
    style?: React.CSSProperties | undefined;
    toggleClass?: boolean;
}

export const EditButton: React.FC<IEditButtonProps> = ({onClick, title, style}) => {
    return (
        <FaRegEdit
            className={ styles.edit }
            onClick={ onClick }
            data-tooltip-id="tooltip"
            data-tooltip-content={ `Edit ${ title }` }
            data-tooltip-offset={ 0 }
            style={ style }
        />
    );
};

export const HideButton: React.FC<IEditButtonProps> = ({onClick, title, offset = 20, style = {top: '1.3rem'}}) => {
    return (
        <BiHide
            size="1.3rem"
            className={ styles.hide }
            onClick={ onClick }
            data-tooltip-id="tooltip"
            data-tooltip-content={ `Hide ${ title }` }
            data-tooltip-offset={ offset }
            style={ style }
        />
    );
};

export const UploadButton: React.FC<IEditButtonProps> = ({onClick, offset = 0}) => {
    return (
        <LuUpload
            size="1.1rem"
            className={ styles.edit }
            onClick={ onClick }
            data-tooltip-id="tooltip"
            data-tooltip-content="Upload Photo"
            data-tooltip-offset={ offset }
        />
    );
};

export const ShowAsideButton: React.FC<IEditButtonProps> = ({
                                                                onClick,
                                                                title,
                                                                offset = 0,
                                                                style,
                                                                toggleClass = false
                                                            }) => {
    return (
        <div className={ toggleClass ? styles.toggle : styles.show }>
            <MdOutlineVisibility
                size="1.2rem"
                className={ styles.hide }
                data-tooltip-id="tooltip"
                data-tooltip-content={ `Show ${ title }` }
                data-tooltip-offset={ offset }
                onClick={ onClick }
                style={ style }
            />
        </div>
    );
};

export const ShowButton: React.FC<IEditButtonProps> = ({onClick, title, offset = 0}) => {
    return (
        <MdOutlineVisibility
            className={ styles.visible }
            size="1.3rem"
            data-tooltip-id="tooltip"
            data-tooltip-content={ `Show ${ title }` }
            data-tooltip-offset={ offset }
            onClick={ onClick }
        />
    );
};

export const AddItemButton: React.FC<IEditButtonProps> = ({onClick, title, offset = 20, style = {bottom: '0'}}) => {
    return (
        <IoMdAddCircleOutline
            className={ styles.hide }
            size="1.2rem"
            data-tooltip-id="tooltip"
            data-tooltip-content={ `Add ${ title }` }
            data-tooltip-offset={ offset }
            onClick={ onClick }
            style={ style }
        />
    );
};

export const MoreButton: React.FC<IEditButtonProps> = ({onClick, offset = -15}) => {
    return (
        <RiMoreLine
            className={ styles.more }
            size="2rem"
            data-tooltip-id="tooltip"
            data-tooltip-content="More Templates"
            data-tooltip-offset={ offset }
            onClick={ onClick }
        />
    );
};

export const SaveButton: React.FC<IEditButtonProps> = ({onClick}) => {
    return (
        <HiOutlineSave
            className={ styles.save }
            size="1.3rem"
            onClick={ onClick }
            data-tooltip-id="tooltip"
            data-tooltip-content="Save PDF"
            data-tooltip-offset={ 0 }
        />
    );
};
export const ClearButton: React.FC<IEditButtonProps> = ({onClick}) => {
    return (
        <TbRestore
            className={ styles.clear }
            size="1.2rem"
            onClick={ onClick }
            data-tooltip-id="tooltip"
            data-tooltip-content="Clear Local Storage"
            data-tooltip-offset={ 0 }
        />
    );
};

export const ReturnButton: React.FC<IEditButtonProps> = ({onClick, title}) => {
    return (
        <BsArrowReturnRight
            data-tooltip-id="tooltip"
            data-tooltip-content={ `Return default data ${ title }` }
            data-tooltip-offset={ 0 } className={ styles.edit } onClick={ onClick }/>
    );
};

interface IRemoveButtonProps {
    onRemove?: () => void;
    removeStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    removeOffset?: number;
}

export const RemoveButton: React.FC<IRemoveButtonProps> = ({onRemove, removeStyle, style, removeOffset = 0}) => {
    return (
        <div className={ styles.remove } style={style}>
            <IoMdRemoveCircleOutline
                data-tooltip-content="Remove"
                data-tooltip-id="tooltip"
                size="1.2rem"
                data-tooltip-offset={ removeOffset }
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