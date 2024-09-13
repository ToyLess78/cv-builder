import type React from "react";
import type { FC, ReactNode } from "react";
import { MainButton } from "~/components";
import styles from "./Main.module.scss";

interface IMainEditWrapperProps {
	preview?: ReactNode;
	edit?: ReactNode;
	onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
	style?: React.CSSProperties;
}

export const MainEditWrapper: FC<IMainEditWrapperProps> = ({
	preview,
	onSubmit,
	edit,
	style = { width: "70%" },
}) => {
	return (
		<div className={styles.wrapper} style={style}>
			{preview}
			<form className={styles.form} onSubmit={onSubmit}>
				{edit}
				<MainButton type="submit">Save Changes</MainButton>
			</form>
		</div>
	);
};
