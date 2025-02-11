import { type FC, type ReactNode, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
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
	type IProject,
	removeProject,
	selectProjects,
	setEditedProjectId,
	setIsProjects,
} from "~/slices/projects.slice";
import { selectTheme } from "~/slices/theme.slice";
import type { RootState } from "~/store/store";
import styles from "./Projects.module.scss";

interface IProjectsProps {
	children?: ReactNode;
	projectsItem?: IProject | null;
}

export const Projects: FC<IProjectsProps> = ({
	children,
	projectsItem = null,
}) => {
	const projects = useSelector((state: RootState) => selectProjects(state));

	const { isProjects, title, data } = projects;

	const dispatch = useDispatch();

	const handlerSetEdit = (id: string) => {
		dispatch(setEditedProjectId(id));
		dispatch(setIsEdit(RootConstants.Projects));
	};

	const handlerAddProject = () => {
		dispatch(setEditedProjectId(nextId()));
		dispatch(setIsEdit(RootConstants.Projects));
	};

	const { template } = useSelector((state: RootState) => selectTheme(state));
	const [isItem, setIsItem] = useState([...data.map((pro) => pro.id)]);

	const handleOnRemove = (id: string) => {
		setIsItem(isItem.filter((item) => item !== id));

		const timeoutId = setTimeout(() => {
			dispatch(removeProject(id));
		}, 500);

		return () => clearTimeout(timeoutId);
	};

	return (
		<>
			{!projectsItem && (
				<CollapsedWrapper
					isShow={isProjects}
					buttons={
						<>
							<HideButton
								title={title}
								style={{ bottom: "3rem" }}
								offset={0}
								onClick={() => dispatch(setIsProjects(false))}
							/>
							<AddItemButton
								style={{ bottom: "2rem" }}
								title="project"
								onClick={handlerAddProject}
							/>
						</>
					}
					content={
						<section className={`${styles.projects} ${styles[template]}`}>
							{children}
							<div className={styles.wrapper}>
								{data.map((pro) => (
									<CollapsedWrapper
										key={pro.id}
										isShow={isItem.some((id) => id === pro.id)}
										content={
											<div className={styles.title}>
												<EditButton
													style={{
														left:
															template === TemplateConstants.Breeze ? "-3.7rem" : "-1.9rem",
													}}
													title={pro.projectName}
													onClick={() => handlerSetEdit(pro.id)}
												/>
												{data.length > 1 && (
													<RemoveButton
														style={{
															left:
																template === TemplateConstants.Breeze ? "-3.8rem" : "-2.1rem",
															top: "1.3rem",
														}}
														removeOffset={20}
														onRemove={() => handleOnRemove(pro.id)}
													/>
												)}
												<div className={styles.name}>
													<strong className={styles.dots}>{pro.projectName}</strong>
													{pro.link ? (
														<a className={styles.link} href={pro.link}>
															<FiExternalLink />
														</a>
													) : (
														""
													)}
												</div>

												{pro.technologies.length ? (
													<strong>
														<small>{`[ ${pro.technologies.join(", ")} ]`}</small>
													</strong>
												) : (
													""
												)}
												<em
													style={{
														textTransform: "capitalize",
													}}
												>
													{pro.type}
												</em>
												<br />
												{pro.duration ? (
													<span className={styles.duration}>{pro.duration}</span>
												) : (
													""
												)}
												<div
													className={styles.description}
													dangerouslySetInnerHTML={{ __html: pro.description }}
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

			{!isProjects && !projectsItem && (
				<div className={styles.show}>
					<ShowMaineButton
						title={title}
						onClick={() => dispatch(setIsProjects(true))}
					/>
				</div>
			)}
			{isProjects && projectsItem && (
				<section className={`${styles.projects} ${styles[template]}`}>
					{children}
					<div className={styles.wrapper}>
						<div key={projectsItem.id} className={styles.title}>
							<div className={styles.name}>
								<strong className={styles.dots}>{projectsItem.projectName}</strong>
								{projectsItem.link ? (
									<a className={styles.link} href={projectsItem.link}>
										<FiExternalLink />
									</a>
								) : (
									""
								)}
							</div>

							{projectsItem.technologies.length ? (
								<strong>
									<small>{`[ ${projectsItem.technologies.join(", ")} ]`}</small>
								</strong>
							) : (
								""
							)}
							<em
								style={{
									textTransform: "capitalize",
								}}
							>
								{projectsItem.type}
							</em>
							<br />
							{projectsItem.duration ? (
								<span className={styles.duration}>{projectsItem.duration}</span>
							) : (
								""
							)}
							<div
								className={styles.description}
								dangerouslySetInnerHTML={{ __html: projectsItem.description }}
							/>
						</div>
					</div>
				</section>
			)}
		</>
	);
};
