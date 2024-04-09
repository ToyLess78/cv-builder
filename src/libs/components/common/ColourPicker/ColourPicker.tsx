import React, { useEffect } from 'react';
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

    useEffect(() => {
        dispatch(setThemeColor(color))
    }, [color, dispatch]);

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
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
                            key={nextId()}
                            onChange={handleOnChange}
                            checked={color === c}
                        />
                        <span
                            className={styles.color}
                            style={{ backgroundColor: c }}
                            key={nextId()}
                        />
                    </label>
                })}
            </div>
        </div>
    )
}