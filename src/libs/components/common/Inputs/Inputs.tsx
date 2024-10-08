import {
	Dropdown,
	type DropdownChangeEvent,
	type DropdownProps,
} from "primereact/dropdown";
import type { SelectItemOptionsType } from "primereact/selectitem";
import type React from "react";
import type { IItems } from "~/slices/languages.slice";
import styles from "./Inputs.module.scss";

interface InputProps extends React.HTMLProps<HTMLElement> {
	label?: string;
	type?: string;
	value?: string | undefined;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
}

export const BorderInput: React.FC<InputProps> = ({
	label,
	type = "text",
	value,
	onChange,
}) => {
	return (
		<div className={styles.container}>
			<input
				className={styles.border}
				type={type}
				value={value}
				onChange={onChange}
				required
				aria-label={label}
			/>
			<label>{label}</label>
			<span className={styles.focus}>
				<i />
			</span>
		</div>
	);
};
export const UnderlineInput: React.FC<InputProps> = ({
	label,
	type = "text",
	value,
	onChange,
	disabled = false,
}) => {
	return (
		<div className={styles.container}>
			<input
				className={styles.underline}
				type={type}
				value={value}
				onChange={onChange}
				disabled={disabled}
				aria-label={label}
				required
			/>
			<label>{label}</label>
			<span className={styles.focus}>
				<i />
			</span>
		</div>
	);
};
export const BgInput: React.FC<InputProps> = ({
	label,
	type = "text",
	value,
	onChange,
}) => {
	return (
		<div className={styles.container}>
			<input
				className={styles.gray}
				type={type}
				value={value}
				onChange={onChange}
				aria-label={label}
				required
			/>
			<label>{label}</label>
			<span className={styles.bg}>
				<i />
			</span>
		</div>
	);
};
export const PrimaryInput: React.FC<InputProps> = ({
	label,
	type = "text",
	value,
	onChange,
}) => {
	return (
		<div className={styles.container}>
			<input
				className={styles.primary}
				type={type}
				value={value}
				onChange={onChange}
				aria-label={label}
				required
			/>
			<label>{label}</label>
			<span className={styles.bg}>
				<i />
			</span>
		</div>
	);
};

const OptionTemplate = (option: IItems) => {
	return (
		<div className={styles.option}>
			<span>{option.name}</span>
			<span className={styles.tooltip}>{option?.code}</span>
		</div>
	);
};

interface ISelectProps extends DropdownProps {
	options: SelectItemOptionsType | undefined;
	onChange: (event: DropdownChangeEvent) => void;
	value: IItems | null;
	title: string;
	filter?: boolean;
}

export const Select: React.FC<ISelectProps> = ({
	options,
	onChange,
	title,
	value,
	filter = false,
}) => {
	return (
		<>
			<Dropdown
				className={styles.dropdown}
				value={value}
				onChange={onChange}
				options={options}
				optionLabel="name"
				data-placeholder={value?.name.length ? "false" : "true"}
				placeholder={value?.name.length ? value?.name : `Select a ${title}`}
				itemTemplate={OptionTemplate}
				showClear
				panelClassName={styles.panel}
				filter={filter}
			/>
		</>
	);
};
