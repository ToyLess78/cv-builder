import type { Nullable } from "primereact/ts-helpers";
import type React from "react";
import { type FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckBox, EditorCustom, Title, UnderlineInput } from "~/components";
import { MonthYearPickerWithRange } from "~/components/common/MonthPicker/MonthYearPicker";
import { MainEditWrapper } from "~/components/modules/Main/MainEditWrapper";
import { Education } from "~/components/modules/education/Education";
import styles from "~/components/modules/education/Education.module.scss";
import { setIsEdit } from "~/slices/edit.slice";
import { selectEducation, setEditedEducation } from "~/slices/education.slice";
import type { RootState } from "~/store/store";
import {
	reformatDateRange,
	reformatDateSingle,
} from "~/utils/format-date.utils";

const EditEducation: FC = () => {
	const educationState = useSelector((state: RootState) =>
		selectEducation(state),
	);

	const { data, editedId } = educationState;

	const newEducation = {
		id: editedId,
		duration: "",
		isYear: false,
		isPresent: false,
		school: "",
		degree: "",
		location: "",
		description: "<p>Your Description</p>",
	};

	const [educationItem, setEducationItem] = useState(
		data.find((item) => item.id === editedId) || newEducation,
	);
	const [text, setText] = useState<null | string>(educationItem.description);

	useEffect(() => {
		setEducationItem({ ...educationItem, description: text as string });
	}, [text]);

	const [duration, setDuration] =
		useState<Nullable<(Date | null)[] | Date>>(null);

	const { isYear, isPresent } = educationItem;

	useEffect(() => {
		duration &&
			!educationItem.isPresent &&
			setEducationItem({
				...educationItem,
				duration: inputRefRangeDates.current?.value || educationItem.duration,
			});
	}, [duration, educationItem.isYear, educationItem.isPresent]);

	useEffect(() => {
		duration &&
			educationItem.isPresent &&
			setEducationItem({
				...educationItem,
				duration: inputRefSingleDate.current?.value || educationItem.duration,
			});
	}, [duration, educationItem.isYear, educationItem.isPresent]);

	const handleToggleYear = () => {
		setEducationItem({ ...educationItem, isYear: !isYear });
	};

	const inputRefRangeDates = useRef<HTMLInputElement>(null);
	const inputRefSingleDate = useRef<HTMLInputElement>(null);

	const handleToggleRange = () => {
		setEducationItem({ ...educationItem, isPresent: !isPresent });
	};
	const [singleValue, setSingleValue] = useState<Nullable<Date | null>>(null);
	const [rangeValue, setRangeValue] = useState<Nullable<(Date | null)[]>>(null);

	useEffect(() => {
		isPresent &&
			educationItem.duration &&
			setSingleValue(reformatDateSingle(educationItem.duration));
		!isPresent &&
			educationItem.duration &&
			setRangeValue(reformatDateRange(educationItem.duration));
	}, []);

	const dispatch = useDispatch();
	const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(setEditedEducation({ education: educationItem }));
		dispatch(setIsEdit(""));
	};

	return (
		<MainEditWrapper
			onSubmit={handlerOnSubmit}
			style={{ width: "90%" }}
			preview={
				<Education educationItem={educationItem}>
					<Title text={educationState.title} />
				</Education>
			}
			edit={
				<>
					<div className={styles.inputs}>
						<UnderlineInput
							label="degree"
							value={educationItem.degree}
							onChange={(e) =>
								setEducationItem({
									...educationItem,
									degree: e.currentTarget.value,
								})
							}
						/>
						<UnderlineInput
							label="school"
							value={educationItem.school}
							onChange={(e) =>
								setEducationItem({
									...educationItem,
									school: e.currentTarget.value,
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
								title="Currently study here"
							/>
						</MonthYearPickerWithRange>
						<UnderlineInput
							label="location"
							value={educationItem.location}
							onChange={(e) =>
								setEducationItem({
									...educationItem,
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
export default EditEducation;
