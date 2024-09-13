import type React from "react";
import nextId from "react-id-generator";
import { useSelector } from "react-redux";
import TemplateConstants from "~/constants/template.constants";
import type { IAdditionalState } from "~/slices/skills.slice";
import { selectTheme } from "~/slices/theme.slice";
import type { RootState } from "~/store/store";
import styles from "./Additional.module.scss";

export const AdditionalList: React.FC<IAdditionalState> = (additional) => {
	const { data } = additional;

	const { template } = useSelector((state: RootState) => selectTheme(state));

	return (
		<>
			{data.length ? (
				<ul
					className={styles.additional}
					style={{
						minHeight:
							template === TemplateConstants.Breeze ? "7.4rem" : "auto",
					}}
				>
					{data?.map((a) => {
						return <li key={nextId()}>{a}</li>;
					})}
				</ul>
			) : (
				""
			)}
		</>
	);
};
