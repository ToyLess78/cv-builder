import type React from "react";
import { type ReactNode, useState } from "react";
import nextId from "react-id-generator";
import { useDispatch, useSelector } from "react-redux";
import {
	AddItemButton,
	CollapsedWrapper,
	EditButton,
	HideButton,
	RemoveButton,
	ShowMaineButton,
} from "~/components";
import RootConstants from "~/constants/root.constants";
import TemplateConstants from "~/constants/template.constants";
import { setIsEdit } from "~/slices/edit.slice";
import {
	type IExperience,
	removeExperience,
	selectExperience,
	setEditedExperienceId,
	setIsExperience,
} from "~/slices/experiences.slice";
import { selectTheme } from "~/slices/theme.slice";
import type { RootState } from "~/store/store";
import styles from "./Experience.module.scss";

interface IExperienceProps {
	children?: ReactNode;
	experienceItem?: IExperience | null;
}

export const Experience: React.FC<IExperienceProps> = ({
	children,
	experienceItem = null,
}) => {
	const experience = useSelector((state: RootState) => selectExperience(state));
	const { isExperience, title, data } = experience;

	const dispatch = useDispatch();

	const handlerSetEdit = (id: string) => {
		dispatch(setEditedExperienceId(id));
		dispatch(setIsEdit(RootConstants.Experience));
	};

	const handlerAddExperience = () => {
		dispatch(setEditedExperienceId(nextId()));
		dispatch(setIsEdit(RootConstants.Experience));
	};

	const { template } = useSelector((state: RootState) => selectTheme(state));
	const [isItem, setIsItem] = useState([...data.map((exp) => exp.id)]);

	const handleOnRemove = (id: string) => {
		setIsItem(isItem.filter((item) => item !== id));

		const timeoutId = setTimeout(() => {
			dispatch(removeExperience(id));
		}, 500);

		return () => clearTimeout(timeoutId);
	};

	return (
		<>
			{!experienceItem && (
				<CollapsedWrapper
					isShow={isExperience}
					buttons={
						<>
							<HideButton
								title={title}
								style={{ bottom: "3rem" }}
								offset={0}
								onClick={() => dispatch(setIsExperience(false))}
							/>
							<AddItemButton
								style={{ bottom: "2rem" }}
								title={RootConstants.Experience}
								onClick={handlerAddExperience}
							/>
						</>
					}
					content={
						<section className={`${styles.experience} ${styles[template]}`}>
							{children}
							<div className={styles.wrapper}>
								{data.map((exp) => (
									<CollapsedWrapper
										key={exp.id}
										isShow={isItem.some((id) => id === exp.id)}
										content={
											<div className={styles.title}>
												<EditButton
													style={{
														left:
															template === TemplateConstants.Breeze ? "-3.7rem" : "-1.9rem",
													}}
													title={exp.jobTitle}
													onClick={() => handlerSetEdit(exp.id)}
												/>
												{data.length > 1 && (
													<RemoveButton
														style={{
															left:
																template === TemplateConstants.Breeze ? "-3.8rem" : "-2.1rem",
															top: "1.3rem",
														}}
														removeOffset={20}
														onRemove={() => handleOnRemove(exp.id)}
													/>
												)}
												<strong>
													{`${exp.jobTitle} `}
													{exp.employer ? <small>{`[ ${exp.employer} ]`}</small> : ""}
													<em> {exp.location}</em>
												</strong>
												<br />
												<span className={styles.duration}>{exp.duration}</span>
												<div
													className={styles.description}
													dangerouslySetInnerHTML={{ __html: exp.description }}
												/>
											</div>
										}
									/>
								))}
							</div>
						</section>
					}
				/>
			)}
			{!isExperience && !experienceItem && (
				<div className={styles.show}>
					<ShowMaineButton
						title={title}
						onClick={() => dispatch(setIsExperience(true))}
					/>
				</div>
			)}
			{isExperience && experienceItem && (
				<section className={`${styles.experience} ${styles[template]}`}>
					{children}
					<div className={styles.wrapper}>
						<div className={styles.title}>
							<strong>
								{`${experienceItem.jobTitle} `}
								{experienceItem.employer ? (
									<small>{`[ ${experienceItem.employer} ]`}</small>
								) : (
									""
								)}
								<em> {experienceItem.location}</em>
							</strong>
							<br />
							<span className={styles.duration}>{experienceItem.duration}</span>
							<div
								className={styles.description}
								dangerouslySetInnerHTML={{ __html: experienceItem.description }}
							/>
						</div>
					</div>
				</section>
			)}
		</>
	);
};
