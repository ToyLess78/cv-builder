import type React from "react";
import type { ReactNode } from "react";
import styles from "./Aside.module.scss";

interface IAsideProps {
	children?: ReactNode | undefined;
}

export const Aside: React.FC<IAsideProps> = ({ children }) => {
	return <div className={styles.aside}>{children}</div>;
};
