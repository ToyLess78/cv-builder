import type React from "react";
import type { ReactNode } from "react";
import styles from "./CollapsedWrapper.module.scss";

interface ICollapsedWrapperProps {
	isShow: boolean;
	buttons?: ReactNode;
	content: ReactNode;
}

export const CollapsedWrapper: React.FC<ICollapsedWrapperProps> = ({
	isShow,
	buttons,
	content,
}) => {
	return (
		<div className={`${styles.collapsed} ${isShow ? styles.open : ""}`}>
			{isShow && buttons ? buttons : ""}
			<div className={styles.content}>{content}</div>
		</div>
	);
};
