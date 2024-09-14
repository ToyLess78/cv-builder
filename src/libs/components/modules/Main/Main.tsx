import type React from "react";
import { useSelector } from "react-redux";
import { Education, Experience, Projects, Title } from "~/components";
import { selectEducation } from "~/slices/education.slice";
import { selectExperience } from "~/slices/experiences.slice";
import { selectProjects } from "~/slices/projects.slice";
import type { RootState } from "~/store/store";

export const Main: React.FC = () => {
	const experience = useSelector((state: RootState) => selectExperience(state));
	const education = useSelector((state: RootState) => selectEducation(state));
	const projects = useSelector((state: RootState) => selectProjects(state));

	return (
		<>
			<Experience>
				<Title text={experience.title} />
			</Experience>
			<Projects>
				<Title text={projects.title} />
			</Projects>
			<Education>
				<Title text={education.title} />
			</Education>
		</>
	);
};
