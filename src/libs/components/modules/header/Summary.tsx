import type React from "react";
import type { CSSProperties, ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectInfo } from "~/slices/info.slice";
import { selectTheme } from "~/slices/theme.slice";
import type { RootState } from "~/store/store";
import styles from "./Header.module.scss";

interface ISummaryProps {
	summary: string;
}

export const Summary: React.FC<{
	children?: ReactNode;
	props?: ISummaryProps;
	style?: CSSProperties;
}> = ({ children, props, style }) => {
	const info = useSelector((state: RootState) => selectInfo(state));
	const { template } = useSelector((state: RootState) => selectTheme(state));

	return (
		<section className={`${styles.summary} ${styles[template]}`} style={style}>
			{children}
			<div dangerouslySetInnerHTML={{ __html: props?.summary || info.summary }} />
		</section>
	);
};
