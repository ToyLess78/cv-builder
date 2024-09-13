import type React from "react";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectInfo } from "~/slices/info.slice";
import { selectTheme } from "~/slices/theme.slice";
import type { RootState } from "~/store/store";
import styles from "./Header.module.scss";

interface IInfoProps {
	firstname: string;
	lastname: string;
	position: string;
}
export const Info: React.FC<{ children?: ReactNode; props?: IInfoProps }> = ({
	children,
	props,
}) => {
	const info = useSelector((state: RootState) => selectInfo(state));
	const { template } = useSelector((state: RootState) => selectTheme(state));

	return (
		<section className={`${styles.info} ${styles[template]}`}>
			{children}
			<div className={styles[template]}>
				<h2>{props?.firstname || info.firstname}</h2>
				<h2>{props?.lastname || info.lastname}</h2>
			</div>
			<h4>{props?.position || info.position}</h4>
		</section>
	);
};
