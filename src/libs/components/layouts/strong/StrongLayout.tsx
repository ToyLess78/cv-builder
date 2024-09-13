import type React from "react";
import type { ReactNode } from "react";
import styles from "./Strong.module.scss";

interface IStrongLayoutProps {
	info: ReactNode;
	aside: ReactNode;
	main: ReactNode;
}
export const StrongLayout: React.FC<IStrongLayoutProps> = ({
	info,
	aside,
	main,
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.column} />
			<section className={styles.header}>
				<div className={styles.head}>
					<div className={styles.text}>{info}</div>
				</div>
			</section>
			<section className={styles.main}>{main}</section>
			<section className={styles.aside}>{aside}</section>
		</div>
	);
};
