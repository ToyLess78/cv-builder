import React, { ReactNode } from 'react';
import styles from './Overlay.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectIsEdite, setIsEdite } from '~/slices/editeSlice';

interface IOverlayProps {
    children: ReactNode;
}

export const Overlay: React.FC<IOverlayProps> = ({ children}) => {
    const dispatch = useDispatch();
    const isEdite = useSelector((state: RootState) => selectIsEdite(state));
    const handleClose = () => {
        dispatch(setIsEdite(''))
    }

    return (
        <div className={isEdite ? styles.open : styles.container}>
            <div className={styles.overlay} onClick={handleClose}>
                <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                    <AiOutlineClose className={styles.btn} onClick={handleClose}/>
                    {children}
                </div>
            </div>
        </div>
    )
}

interface IMenuOverlayProps  extends IOverlayProps{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const MenuOverlay: React.FC<IMenuOverlayProps> = ({ children, isOpen, setIsOpen}) => {
    return (
        <div className={isOpen ? styles.open : styles.container}>
            <div className={styles.overlay} onClick={() => {setIsOpen(!isOpen)}}>
                <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                        {children}
                </div>
            </div>
        </div>
    )
}