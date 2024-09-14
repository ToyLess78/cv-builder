import type React from "react";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "~/slices/theme.slice";
import type { RootState } from "~/store/store";
import styles from "./Title.module.scss";

export const Title: React.FC<{ text: ReactNode }> = ({ text }) => {
	const { template } = useSelector((state: RootState) => selectTheme(state));

	return <h4 className={`${styles.title} ${styles[template]}`}>{text}</h4>;
};
