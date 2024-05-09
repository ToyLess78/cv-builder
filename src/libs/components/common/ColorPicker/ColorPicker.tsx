import React, { useEffect, useState } from 'react';
import styles from './ColorPicker.module.scss';
import nextId from 'react-id-generator';
import { loadFromLocalStorage, saveToLocalStorage } from '~/utils/utils';
import { CssColor } from '~/types/color.types';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, setThemeColor } from '~/slices/theme.slice';
import palettesMap, { breezePalette } from '~/public/palettes';
import { RootState } from '~/store/store';

export const ColorPicker: React.FC = () => {

    const dispatch = useDispatch();
    const [lastActive, setLastActive] = useState('');

    const {template} = useSelector((state: RootState) => selectTheme(state));

    const [palette, setPalette] = useState<string[] | CssColor[]>(palettesMap.get(template) || breezePalette);

    const [color, setColor] = useState(loadFromLocalStorage(template) || palette[0]);

    useEffect(() => {
        const newColor = loadFromLocalStorage(template) || palettesMap.get(template)[0] || breezePalette[0]
        setColor(newColor);
        setPalette(palettesMap.get(template) || breezePalette);
        dispatch(setThemeColor(newColor));
    }, [template]);

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setLastActive(color);
        setColor(e.currentTarget.value)
        saveToLocalStorage(template, e.currentTarget.value)
        dispatch(setThemeColor(e.currentTarget.value));
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