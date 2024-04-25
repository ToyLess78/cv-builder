import React, { useEffect, useState } from 'react';
import styles from './ColourPicker.module.scss';
import nextId from 'react-id-generator';
import { saveToLocalStorage } from '~/utils/utils';
import { CssColor } from '~/types/color-types';
import { useDispatch } from 'react-redux';
import { setThemeColor } from '~/slices/themeSlice';

interface IColourPickerProps {
    theme: string;
    palette: string[] | CssColor[];
    color: string | CssColor;
    setColor: React.Dispatch<React.SetStateAction<string | CssColor>>;
}

export const ColourPicker: React.FC<IColourPickerProps> = ({ theme, palette, color, setColor }) => {

    const dispatch = useDispatch();
    const [lastActive, setLastAcctive] = useState('')

    useEffect(() => {
        dispatch(setThemeColor(color))
    }, [color, dispatch]);

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setLastAcctive(color);
        setColor(e.currentTarget.value)
        saveToLocalStorage(theme, e.currentTarget.value)
    };

    return (
        <div className={styles.container}>
            <div className={styles.colourPicker}>
                {palette.map(c => {
                    const id = nextId();
                    return <label htmlFor={id} key={nextId()}>
                        <input
                            type='radio'
                            id={id}
                            name='color'
                            value={c}
                            onChange={handleOnChange}
                            checked={color === c}
                        />
                        <span
                            className={lastActive === c ? `${styles.last} ${styles.color}` : styles.color}
                            style={{ backgroundColor: c }}
                        />
                    </label>
                })}
            </div>
        </div>
    )
}