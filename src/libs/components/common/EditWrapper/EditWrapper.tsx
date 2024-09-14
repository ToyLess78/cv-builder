import type React from "react";
import type { ReactNode } from "react";
import { MainButton } from "~/components/common/Buttons/Buttons";
import styles from "./EditWrapper.module.scss";

interface IEditeWrapperProps {
	preview: ReactNode;
	edit: ReactNode;
	onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
	width?: string;
}

export const EditWrapper: React.FC<IEditeWrapperProps> = ({
	preview,
	edit,
	onSubmit,
	width = "70%",
}) => {
	return (
		<div className={styles.wrapper}>
			{preview}
			<form
				className={styles.form}
				onSubmit={onSubmit}
				style={{ width: width }}
			>
				{edit}
				<MainButton type="submit">Save Changes</MainButton>
			</form>
		</div>
	);
};
