import type React from "react";
import type { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { EditButton } from "~/components/common/Buttons/Buttons";
import { Image } from "~/components/common/Image/Image";
import { Contacts } from "~/components/modules/contacts/Contacts";
import { Info } from "~/components/modules/header/Info";
import RootConstants from "~/constants/root.constants";
import { setIsEdit } from "~/slices/edit.slice";
import styles from "./Success.module.scss";

interface ISuccessLayoutProps {
	main: ReactNode;
	aside: ReactNode;
}

export const SuccessLayout: React.FC<ISuccessLayoutProps> = ({
	main,
	aside,
}) => {
	const dispatch = useDispatch();

	return (
		<div className={styles.success}>
			<div className={styles.header}>
				<div className={styles.left} />
				<div className={styles.info}>
					<Info>
						<EditButton
							onClick={() => dispatch(setIsEdit(RootConstants.Info))}
							title="name & job title"
						/>
					</Info>
				</div>
				<div className={styles.right} />

				<div className={styles.image}>
					<Image styles={styles.img} />
				</div>
				<div className={styles.contacts}>
					<Contacts isLinkedIn isIcons />
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.aside}>{aside}</div>
				<div className={styles.main}>{main}</div>
			</div>
		</div>
	);
};
