import { ProgressSpinner } from "primereact/progressspinner";
import type React from "react";
import styles from "./Loading.module.scss";

export const Loading: React.FC = () => {
	return (
		<div className={styles.spinner}>
			<ProgressSpinner strokeWidth="1" />
		</div>
	);
};
