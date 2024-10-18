import {
	AutoComplete,
	type AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import type React from "react";
import { useState } from "react";
import { skillsTechnologies } from "~/public/skills&technologies";
import styles from "./AutoCompleteCustom.module.scss";

interface IAutoCompleteCustomProps {
	selectedSkillsOrTechnologies: string[];
	setSelectedSkillsOrTechnologies: React.Dispatch<
		React.SetStateAction<string[]>
	>;
	label?: string;
}

export const AutoCompleteCustom: React.FC<IAutoCompleteCustomProps> = ({
	selectedSkillsOrTechnologies,
	setSelectedSkillsOrTechnologies,
	label = "skills",
}) => {
	const search = (event: AutoCompleteCompleteEvent) => {
		const query = event.query.trim().toLowerCase();
		let _filteredSkills = [...skillsTechnologies];

		if (
			query &&
			!skillsTechnologies.some((skill) => skill.toLowerCase().startsWith(query)) &&
			!_filteredSkills.some((skill) => skill.toLowerCase() === query)
		) {
			_filteredSkills.push(event.query.trim());
		}

		if (query) {
			_filteredSkills = _filteredSkills.filter(
				(skill) =>
					skill.toLowerCase().startsWith(query) &&
					!selectedSkillsOrTechnologies.includes(skill),
			);
		}

		setFilteredSkills(_filteredSkills);
	};
	const [filteredSkills, setFilteredSkills] = useState<string[]>([]);
	return (
		<div className={styles.wrapper}>
			<span className={styles.label}>{label}</span>
			<AutoComplete
				multiple
				placeholder="+ more"
				value={selectedSkillsOrTechnologies}
				suggestions={filteredSkills}
				completeMethod={search}
				className={styles.autoComplete}
				panelClassName={styles.panel}
				inputClassName={styles.input}
				onChange={(e) => setSelectedSkillsOrTechnologies(e.value)}
			/>
		</div>
	);
};
