import type { Nullable } from "primereact/ts-helpers";
import type React from "react";
import { type FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckBox, EditorCustom, Title, UnderlineInput } from "~/components";
import { MonthYearPickerWithRange } from "~/components/common/MonthPicker/MonthYearPicker";
import { MainEditWrapper } from "~/components/modules/Main/MainEditWrapper";
import { setIsEdit } from "~/slices/edit.slice";
import {
	selectExperience,
	setEditedExperience,
} from "~/slices/experiences.slice";
import type { RootState } from "~/store/store";
import {
	reformatDateRange,
	reformatDateSingle,
} from "~/utils/format-date.utils";
import { Experience } from "./Experience";
import styles from "./Experience.module.scss";

const EditExperience: FC = () => {
	const experienceState = useSelector((state: RootState) =>
		selectExperience(state),
	);

	const { data, editedId } = experienceState;

	const newExperience = {
		id: editedId,
		duration: "",
		isYear: false,
		isPresent: false,
		employer: "",
		jobTitle: "",
		location: "",
		description: "<p>Your Description</p>",
	};

	const [experienceItem, setExperienceItem] = useState(
		data.find((item) => item.id === editedId) || newExperience,
	);
	const [text, setText] = useState<null | string>(experienceItem.description);

	useEffect(() => {
		setExperienceItem({ ...experienceItem, description: text as string });
	}, [text]);

	const [duration, setDuration] =
		useState<Nullable<(Date | null)[] | Date>>(null);

	const { isYear, isPresent } = experienceItem;

	useEffect(() => {
		duration &&
			!experienceItem.isPresent &&
			setExperienceItem({
				...experienceItem,
				duration: inputRefRangeDates.current?.value || experienceItem.duration,
			});
	}, [duration, experienceItem.isYear, experienceItem.isPresent]);

	useEffect(() => {
		duration &&
			experienceItem.isPresent &&
			setExperienceItem({
				...experienceItem,
				duration: inputRefSingleDate.current?.value || experienceItem.duration,
			});
	}, [duration, experienceItem.isYear, experienceItem.isPresent]);

	const handleToggleYear = () => {
		setExperienceItem({ ...experienceItem, isYear: !isYear });
	};

	const inputRefRangeDates = useRef<HTMLInputElement>(null);
	const inputRefSingleDate = useRef<HTMLInputElement>(null);

	const handleToggleRange = () => {
		setExperienceItem({ ...experienceItem, isPresent: !isPresent });
	};
	const [singleValue, setSingleValue] = useState<Nullable<Date | null>>(null);
	const [rangeValue, setRangeValue] = useState<Nullable<(Date | null)[]>>(null);

	useEffect(() => {
		isPresent &&
			experienceItem.duration &&
			setSingleValue(reformatDateSingle(experienceItem.duration));
		!isPresent &&
			experienceItem.duration &&
			setRangeValue(reformatDateRange(experienceItem.duration));
	}, []);

	const dispatch = useDispatch();
	const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(setEditedExperience({ experience: experienceItem }));
		dispatch(setIsEdit(""));
	};

	return (
		<MainEditWrapper
			onSubmit={handlerOnSubmit}
			style={{ width: "90%" }}
			preview={
				<Experience experienceItem={experienceItem}>
					<Title text={experienceState.title} />
				</Experience>
			}
			edit={
				<>
					<div className={styles.inputs}>
						<UnderlineInput
							label="job title"
							value={experienceItem.jobTitle}
							onChange={(e) =>
								setExperienceItem({
									...experienceItem,
									jobTitle: e.currentTarget.value,
								})
							}
						/>
						<UnderlineInput
							label="employer"
							value={experienceItem.employer}
							onChange={(e) =>
								setExperienceItem({
									...experienceItem,
									employer: e.currentTarget.value,
								})
							}
						/>
					</div>
					<div className={styles.inputs}>
						<MonthYearPickerWithRange
							{...{
								duration,
								setDuration,
								isYear,
								inputRefRangeDates,
								inputRefSingleDate,
								isPresent,
								rangeValue,
								singleValue,
							}}
						>
							<CheckBox
								checked={isYear}
								onChange={handleToggleYear}
								title="Currently only Year"
							/>
							<CheckBox
								checked={isPresent}
								onChange={handleToggleRange}
								title="Currently work here"
							/>
						</MonthYearPickerWithRange>
						<UnderlineInput
							label="location"
							value={experienceItem.location}
							onChange={(e) =>
								setExperienceItem({
									...experienceItem,
									location: e.currentTarget.value,
								})
							}
						/>
					</div>

					<EditorCustom {...{ text, setText }} />
				</>
			}
		/>
	);
};

export default EditExperience;
