import type React from "react";
import { type CSSProperties, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
	Certifications,
	CollapsedWrapper,
	ShowAsideButton,
	Title,
} from "~/components";
import { Additional } from "~/components/modules/additional/Additional";
import RootConstants from "~/constants/root.constants";
import {
	selectCertifications,
	setIsCertifications,
} from "~/slices/certifications.slice";
import { selectSkills, setIsAdditional } from "~/slices/skills.slice";
import type { RootState } from "~/store/store";
import styles from "./replace.module.scss";

interface ISelectAsideItemProps {
	style?: CSSProperties;
	offset?: number;
}

export const ReplaceAsideItem: React.FC<ISelectAsideItemProps> = ({
	style,
	offset = 40,
}) => {
	const certificates = useSelector((state: RootState) =>
		selectCertifications(state),
	);
	const { isCertifications } = certificates;

	const aside = useSelector((state: RootState) => selectSkills(state));
	const isAdditional = aside.additional.isAdditional;

	const dispatch = useDispatch();

	const handleSetIsItems = () => {
		!isCertifications && !isAdditional && dispatch(setIsCertifications(true));
		!isCertifications && dispatch(setIsCertifications(true));
		!isAdditional && dispatch(setIsAdditional(true));
	};

	const titleShow =
		!isAdditional && !isCertifications
			? certificates?.title
			: !isAdditional
				? aside?.additional.title
				: certificates?.title;

	const [isReplace, setIsReplace] = useState(true);

	const [isShow, setIsShow] = useState(true);

	const handleToggleItem = () => {
		setIsShow(false);
		const timeoutId = setTimeout(() => {
			setIsReplace(!isReplace);
			setIsShow(true);
		}, 600);

		return () => clearTimeout(timeoutId);
	};

	return (
		<CollapsedWrapper
			isShow={isShow}
			buttons={
				isCertifications && isAdditional ? (
					<FaArrowsRotate
						className={styles.replace}
						data-tooltip-id="tooltip"
						data-tooltip-content={`Replace with ${isReplace ? RootConstants.Additional : RootConstants.Certifications}`}
						data-tooltip-offset={offset}
						onClick={handleToggleItem}
						style={style}
					/>
				) : (
					<ShowAsideButton
						onClick={handleSetIsItems}
						title={titleShow}
						toggleClass
					/>
				)
			}
			content={
				isReplace ? (
					<Certifications>
						<Title text={certificates.title} />
					</Certifications>
				) : (
					<Additional>
						<Title text={aside?.additional.title} />
					</Additional>
				)
			}
		/>
	);
};
