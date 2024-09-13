import type React from "react";
import { useEffect, useState } from "react";
import nextId from "react-id-generator";
import { useDispatch, useSelector } from "react-redux";
import palettesMap, { breezePalette } from "~/public/palettes";
import { selectTheme, setThemeColor } from "~/slices/theme.slice";
import type { RootState } from "~/store/store";
import type { CssColor } from "~/types/color.types";
import { loadFromLocalStorage, saveToLocalStorage } from "~/utils/utils";
import styles from "./ColorPicker.module.scss";

export const ColorPicker: React.FC = () => {
	const dispatch = useDispatch();
	const [lastActive, setLastActive] = useState("");

	const { template } = useSelector((state: RootState) => selectTheme(state));

	const [palette, setPalette] = useState<string[] | CssColor[]>(
		palettesMap.get(template) || breezePalette,
	);

	const [color, setColor] = useState(
		loadFromLocalStorage(template) || palette[0],
	);

	useEffect(() => {
		const newColor =
			loadFromLocalStorage(template) ||
			palettesMap.get(template)[0] ||
			breezePalette[0];
		setColor(newColor);
		setPalette(palettesMap.get(template) || breezePalette);
		dispatch(setThemeColor(newColor));
	}, [template, dispatch]);

	const handleOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
		setLastActive(color);
		setColor(e.currentTarget.value);
		saveToLocalStorage(template, e.currentTarget.value);
		dispatch(setThemeColor(e.currentTarget.value));
	};

	return (
		<div className={styles.container}>
			<div className={styles.colourPicker}>
				{palette.map((c) => {
					const id = nextId();
					return (
						<label htmlFor={id} key={nextId()}>
							<input
								type="radio"
								id={id}
								name="color"
								value={c}
								onChange={handleOnChange}
								checked={color === c}
							/>
							<span
								className={
									lastActive === c
										? `${styles.last} ${styles.color}`
										: styles.color
								}
								style={{ backgroundColor: c }}
							/>
						</label>
					);
				})}
			</div>
		</div>
	);
};
