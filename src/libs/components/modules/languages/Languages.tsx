import type React from "react";
import type { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AsideItem } from "~/components/common/Aside/AsideItem";
import {
	EditButton,
	HideButton,
	RemoveButton,
	ShowAsideButton,
} from "~/components/common/Buttons/Buttons";
import { CollapsedWrapper } from "~/components/common/CollapsedWrapper/CollapsedWrapper";
import RootConstants from "~/constants/root.constants";
import TemplateConstants from "~/constants/template.constants";
import { setIsEdit } from "~/slices/edit.slice";
import {
	type ILanguage,
	selectLanguages,
	setIsLanguages,
} from "~/slices/languages.slice";
import { selectTheme } from "~/slices/theme.slice";
import type { RootState } from "~/store/store";
import styles from "./Languages.module.scss";

interface ILanguagesProps {
	children: ReactNode;
	data?: ILanguage[] | null;
	onRemove?: (id: string) => void;
}

export const Languages: React.FC<ILanguagesProps> = ({
	children,
	data = null,
	onRemove,
}) => {
	const languages = useSelector((state: RootState) => selectLanguages(state));
	const { isLanguages } = languages;
	const dispatch = useDispatch();
	const handleSetIsLanguages = () => {
		dispatch(setIsLanguages(!isLanguages));
	};

	const { template } = useSelector((state: RootState) => selectTheme(state));

	return (
		<>
			{!isLanguages && !data && (
				<ShowAsideButton
					onClick={handleSetIsLanguages}
					title="Languages"
					toggleClass
				/>
			)}
			{!data && languages.data.length && (
				<CollapsedWrapper
					isShow={isLanguages}
					buttons={
						<>
							<EditButton
								title={RootConstants.Languages}
								onClick={() => dispatch(setIsEdit(RootConstants.Languages))}
							/>
							<HideButton
								onClick={handleSetIsLanguages}
								title={RootConstants.Languages}
							/>
						</>
					}
					content={
						<AsideItem>
							{children}
							<ul
								className={styles.languages}
								style={{
									minHeight: template === TemplateConstants.Breeze ? "7.4rem" : "auto",
								}}
							>
								{languages.data?.map((l) => {
									return (
										<li key={l.id}>
											<span>{l.language?.name}</span>
											<p>{l.level?.name}</p>
										</li>
									);
								})}
							</ul>
						</AsideItem>
					}
				/>
			)}

			{data && isLanguages && (
				<AsideItem style={{ padding: "2rem" }}>
					{children}
					<ul
						className={styles.languages}
						style={{
							minHeight: template === TemplateConstants.Breeze ? "7.4rem" : "auto",
						}}
					>
						{data?.map((l) => {
							return (
								l?.language?.name.length && (
									<li key={l.id}>
										<span>{l?.language?.name}</span>
										<p>{l?.level?.name}</p>
										{data.length > 1 && (
											<RemoveButton
												onRemove={onRemove ? () => onRemove(l.id) : undefined}
											/>
										)}
									</li>
								)
							);
						})}
					</ul>
				</AsideItem>
			)}
		</>
	);
};
