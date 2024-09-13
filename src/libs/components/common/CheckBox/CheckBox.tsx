import type { FC } from "react";
import styles from "./CheckBox.module.scss";

interface ICheckBoxProps {
	checked: boolean;
	onChange: () => void;
	title: string;
}

export const CheckBox: FC<ICheckBoxProps> = ({ checked, onChange, title }) => {
	return (
		<div className={styles.present}>
			<label className={styles.switch}>
				<input type="checkbox" checked={checked} onChange={onChange} />
				<span className={styles.slider} />
			</label>
			<span className={checked ? styles.checked : styles.uncheck}>{title}</span>
		</div>
	);
};
