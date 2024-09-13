import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditButton, Title } from "~/components";
import { Image } from "~/components/common/Image/Image";
import RootConstants from "~/constants/root.constants";
import { setIsEdit } from "~/slices/edit.slice";
import { selectInfo } from "~/slices/info.slice";
import type { RootState } from "~/store/store";
import styles from "./Header.module.scss";
import { Info } from "./Info";
import { Summary } from "./Summary";

export const Header: React.FC = () => {
	const info = useSelector((state: RootState) => selectInfo(state));
	const dispatch = useDispatch();

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Info>
					<EditButton
						onClick={() => dispatch(setIsEdit(RootConstants.Info))}
						title="name & job title"
					/>
				</Info>

				<Summary>
					<EditButton
						onClick={() => dispatch(setIsEdit(RootConstants.Summary))}
						title={info.title}
					/>
					<Title text={info.title} />
				</Summary>
			</div>
			<Image styles={styles.img} isPolygon />
		</header>
	);
};
