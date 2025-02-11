import type React from "react";
import type { ReactNode } from "react";
import { FiExternalLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AsideItem } from "~/components/common/Aside/AsideItem";
import {
	EditButton,
	EditButtonsBox,
	HideButton,
	ShowAsideButton,
} from "~/components/common/Buttons/Buttons";
import { CollapsedWrapper } from "~/components/common/CollapsedWrapper/CollapsedWrapper";
import RootConstants from "~/constants/root.constants";
import TemplateConstants from "~/constants/template.constants";
import {
	type ICertificate,
	selectCertifications,
	setIsCertifications,
} from "~/slices/certifications.slice";
import { setIsEdit } from "~/slices/edit.slice";
import { selectTheme } from "~/slices/theme.slice";
import type { RootState } from "~/store/store";
import styles from "./Certifications.module.scss";

interface ICertificatesProps {
	children: ReactNode;
	data?: ICertificate[] | null;
	onRemove?: (id: string) => void;
	onEdit?: (id: string) => void;
	edited?: ICertificate;
}

export const Certifications: React.FC<ICertificatesProps> = ({
	children,
	data = null,
	onRemove,
	onEdit,
	edited,
}) => {
	const certificates = useSelector((state: RootState) =>
		selectCertifications(state),
	);
	const { isCertifications } = certificates;
	const dispatch = useDispatch();
	const handleSetIsCertifications = () => {
		dispatch(setIsCertifications(!isCertifications));
	};

	const { template } = useSelector((state: RootState) => selectTheme(state));

	return (
		<>
			{!isCertifications && (
				<ShowAsideButton
					onClick={handleSetIsCertifications}
					title={certificates.title}
					toggleClass
				/>
			)}
			{!data && (
				<CollapsedWrapper
					isShow={isCertifications}
					buttons={
						<>
							<EditButton
								title={certificates.title}
								onClick={() => dispatch(setIsEdit(RootConstants.Certifications))}
							/>
							<HideButton
								onClick={handleSetIsCertifications}
								title={certificates.title}
							/>
						</>
					}
					content={
						<AsideItem>
							{children}
							<ul
								className={styles.certifications}
								style={{
									minHeight: template === TemplateConstants.Breeze ? "8.2rem" : "auto",
								}}
							>
								{certificates.data?.map((c) => {
									return (
										<li key={c.id}>
											<p>{c.title}</p>
											<a href={c.link}>
												<span>{c.issue}</span>
												<FiExternalLink />
											</a>
										</li>
									);
								})}
							</ul>
						</AsideItem>
					}
				/>
			)}

			{isCertifications && data && (
				<AsideItem style={{ flexGrow: "1", padding: "2rem" }}>
					{children}
					<ul
						className={styles.certifications}
						style={{
							minHeight: template === TemplateConstants.Breeze ? "8.2rem" : "auto",
						}}
					>
						{data?.map((c) => {
							return (
								<li key={c.id}>
									{data.length > 1 && (
										<EditButtonsBox
											onRemove={onRemove ? () => onRemove(c.id) : undefined}
											onEdit={onEdit ? () => onEdit(c.id) : undefined}
											editeStyle={{
												visibility: c.id === edited?.id ? "hidden" : "visible",
											}}
											removeStyle={{
												visibility: c.issue.length && c.title.length ? "visible" : "hidden",
											}}
										/>
									)}
									<p>{c.title}</p>
									{c.issue.length ? (
										<a href={c.link}>
											<span>{c.issue}</span>
											<FiExternalLink />
										</a>
									) : (
										""
									)}
								</li>
							);
						})}
					</ul>
				</AsideItem>
			)}
		</>
	);
};
