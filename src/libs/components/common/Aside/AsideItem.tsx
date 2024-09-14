import type React from "react";
import type { CSSProperties, ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "~/slices/theme.slice";
import type { RootState } from "~/store/store";
import styles from "./Aside.module.scss";

interface IAsideItemProps {
	children?: ReactNode | undefined;
	style?: CSSProperties;
}

export const AsideItem: React.FC<IAsideItemProps> = ({ children, style }) => {
	const themeState = useSelector((state: RootState) => selectTheme(state));
	const template = themeState.template;

	return (
		<div className={`${styles.item} ${styles[template]}`} style={style}>
			{children}
		</div>
	);
};
