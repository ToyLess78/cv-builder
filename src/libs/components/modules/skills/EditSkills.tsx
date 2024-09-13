import type React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	AutoCompleteCustom,
	EditWrapper,
	Skills,
	Title,
	UnderlineInput,
} from "~/components";
import { setIsEdit } from "~/slices/edit.slice";
import { selectSkills, setAdditional, setSkills } from "~/slices/skills.slice";
import type { RootState } from "~/store/store";
import styles from "./Skills.module.scss";

interface IEditSkillsAutoCompleteProps {
	isAdditional?: boolean;
}

const EditSkills: React.FC<IEditSkillsAutoCompleteProps> = ({
	isAdditional = false,
}) => {
	const dispatch = useDispatch();
	const aside = useSelector((state: RootState) => selectSkills(state));
	const data = isAdditional ? aside.additional : aside.skills;
	const [isSkills, setIsSkills] = useState(data);

	const [selectedSkillsOrTechnologies, setSelectedSkillsOrTechnologies] =
		useState<string[]>([...isSkills.data]);

	useEffect(() => {
		setIsSkills({ ...isSkills, data: selectedSkillsOrTechnologies });
	}, [selectedSkillsOrTechnologies]);

	const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSkills({ ...isSkills, data: selectedSkillsOrTechnologies });
		isAdditional
			? dispatch(setAdditional(isSkills))
			: dispatch(setSkills(isSkills));
		dispatch(setIsEdit(""));
	};

	return (
		<EditWrapper
			preview={
				<Skills isAdditional={isAdditional} isButtons={false} data={isSkills}>
					<Title text={isSkills.title} />
				</Skills>
			}
			edit={
				<>
					<div className={styles.container}>
						<UnderlineInput
							label="title"
							value={isSkills?.title}
							onChange={(e) =>
								setIsSkills({ ...isSkills, title: e.currentTarget.value })
							}
						/>
					</div>
					<AutoCompleteCustom
						{...{
							selectedSkillsOrTechnologies,
							setSelectedSkillsOrTechnologies,
							label: isSkills.title,
						}}
					/>
				</>
			}
			onSubmit={handlerOnSubmit}
		/>
	);
};

export default EditSkills;
