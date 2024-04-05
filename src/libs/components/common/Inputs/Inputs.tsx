import React from 'react';
import styles from './Inputs.module.css';

interface InputProps extends React.HTMLProps<HTMLElement> {
    label?: string;
    type?: string;
    value?: string | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export const BorderInput: React.FC<InputProps> = ({label, type='text', value, onChange }) => {
    return (
        <div className={styles.container}>
            <input className={styles.border} type={type} value={value} onChange={onChange} required/>
            <label>{label}</label>
            <span className={styles.focus}>
                <i/>
            </span>
        </div>
    )
}
export const UnderlineInput: React.FC<InputProps> = ({label, type='text', value, onChange }) => {
    return (
        <div className={styles.container}>
            <input className={styles.underline} type={type} value={value} onChange={onChange} required/>
            <label>{label}</label>
            <span className={styles.focus}>
                <i/>
            </span>
        </div>
    )
}
export const BgInput: React.FC<InputProps> = ({label, type='text', value, onChange }) => {
    return (
        <div className={styles.container}>
            <input className={styles.gray} type={type} value={value} onChange={onChange} required/>
            <label>{label}</label>
            <span className={styles.bg}>
                <i/>
            </span>
        </div>
    )
}
export const PrimaryInput: React.FC<InputProps> = ({ label, type='text', value, onChange }) => {
    return (
        <div className={styles.container}>
            <input className={styles.primary} type={type} value={value} onChange={onChange} required/>
            <label>{label}</label>
            <span className={styles.bg}>
                <i/>
            </span>
        </div>
    )
}
