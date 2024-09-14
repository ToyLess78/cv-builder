import type React from "react";
import type { ReactNode } from "react";
import { Image } from "~/components/common/Image/Image";
import styles from "./Headway.module.scss";

interface IHeadwayLayoutProps {
	aside: ReactNode;
	contacts: ReactNode;
	info: ReactNode;
	main: ReactNode;
}

export const HeadwayLayout: React.FC<IHeadwayLayoutProps> = ({
	main,
	aside,
	info,
	contacts,
}) => {
	return (
		<div className={styles.headway}>
			<div className={styles.contacts}>{contacts}</div>
			<div className={styles.header} />
			<div className={styles.info}>{info}</div>
			<div className={styles.image}>
				<Image styles={styles.img} />
			</div>
			<div className={styles.aside}>{aside}</div>
			<div className={styles.main}>{main}</div>
		</div>
	);
};
