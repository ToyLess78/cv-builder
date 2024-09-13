import type React from "react";
import type { CSSProperties, ReactNode } from "react";
import { FaLinkedin, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AsideItem } from "~/components/common/Aside/AsideItem";
import {
	EditButton,
	HideButton,
	ShowAsideButton,
	ShowButton,
} from "~/components/common/Buttons/Buttons";
import { CollapsedWrapper } from "~/components/common/CollapsedWrapper/CollapsedWrapper";
import { IconsMap } from "~/components/modules/contacts/IconsMap";
import RootConstants from "~/constants/root.constants";
import TemplateConstants from "~/constants/template.constants";
import {
	type ContactsState,
	selectContacts,
	setIsSocials,
} from "~/slices/contacts.slice";
import { setIsEdit } from "~/slices/edit.slice";
import { selectTheme } from "~/slices/theme.slice";
import type { RootState } from "~/store/store";
import styles from "./Contacts.module.scss";

interface ISocialProps {
	data?: ContactsState | null;
	style?: CSSProperties;
}

interface IContactProps extends ISocialProps {
	isIcons?: boolean;
	isLinkedIn?: boolean;
	children?: ReactNode;
}

export const Social: React.FC<ISocialProps> = ({ data, style }) => {
	return (
		<div className={styles.social} style={style}>
			{data?.data?.map(
				(s) =>
					s?.isShow && (
						<a key={s?.id} href={s?.link}>
							{IconsMap.get(s?.id)}
						</a>
					),
			)}
		</div>
	);
};

export const Contacts: React.FC<IContactProps> = ({
	isIcons = false,
	children,
	data = null,
	isLinkedIn = false,
}) => {
	const contactState = useSelector((state: RootState) => selectContacts(state));
	const contacts = data || contactState;
	const { isSocials } = contacts;
	const dispatch = useDispatch();
	const handleSetIsSocial = () => {
		dispatch(setIsSocials(!isSocials));
	};

	const { template } = useSelector((state: RootState) => selectTheme(state));
	const iconClass = isSocials ? styles.opacity : styles.visible;
	const letterClass = !isSocials ? styles.opacity : styles.visible;
	const style = data ? { flexGrow: "1", padding: "2rem" } : {};

	return (
		<AsideItem style={style}>
			{!data && (
				<EditButton
					title={RootConstants.Contacts}
					onClick={() => dispatch(setIsEdit(RootConstants.Contacts))}
				/>
			)}

			{isSocials && !data && !isIcons && (
				<HideButton onClick={handleSetIsSocial} title={RootConstants.Social} />
			)}

			{children}

			<ul className={`${styles.contacts} ${styles[template]}`}>
				<li>
					{!isIcons && (
						<div className={styles.icon}>
							<FaLocationDot className={iconClass} />
							<span className={letterClass}>L: </span>
						</div>
					)}
					{isIcons && <FaLocationDot className={styles.visible} />}
					<a
						href={`https://www.google.com/maps/search/?api=1&query=${contacts.location}`}
					>
						{contacts.location}
					</a>
				</li>

				<li>
					{!isIcons && (
						<div className={styles.icon}>
							<IoMailSharp className={iconClass} style={{ bottom: "-.1rem" }} />
							<span className={letterClass}>E: </span>
						</div>
					)}

					{isIcons && (
						<IoMailSharp
							className={styles.visible}
							style={{ bottom: "-.1rem" }}
						/>
					)}
					<a href={`mailto:${contacts.email}`}>{contacts.email}</a>
				</li>

				<li>
					{!isIcons && (
						<div className={styles.icon}>
							<FaPhone className={iconClass} />
							<span className={letterClass}>T: </span>
						</div>
					)}

					{isIcons && <FaPhone className={styles.visible} />}

					<a href={`tel:${contacts.phone}`}>{contacts.phone}</a>
				</li>
				{isLinkedIn && (
					<li>
						<FaLinkedin className={styles.visible} />
						<a href={contacts.linkedIn}>www.linkedin.com</a>
					</li>
				)}
				{!isIcons && (
					<CollapsedWrapper
						isShow={isSocials}
						content={
							<li>
								<Social data={contacts} />
							</li>
						}
					/>
				)}

				{!isSocials && !data && !isIcons && (
					<ShowButton
						title={RootConstants.Social}
						offset={20}
						onClick={handleSetIsSocial}
					/>
				)}
			</ul>
		</AsideItem>
	);
};

export const SocialsBox: React.FC<IContactProps> = ({ data = null }) => {
	const contactState = useSelector((state: RootState) => selectContacts(state));
	const contacts = data || contactState;
	const { isSocials } = contacts;
	const dispatch = useDispatch();
	const handleSetIsSocial = () => {
		dispatch(setIsSocials(!isSocials));
	};
	const { template } = useSelector((state: RootState) => selectTheme(state));

	const style = data ? { flexGrow: "1", padding: "2rem" } : {};

	return (
		<div className={`${styles.socials} ${styles[template]}`}>
			{!isSocials && !data && (
				<ShowAsideButton
					title={RootConstants.Social}
					offset={20}
					onClick={handleSetIsSocial}
					toggleClass
				/>
			)}
			<CollapsedWrapper
				isShow={isSocials}
				buttons={
					<>
						{!data && (
							<EditButton
								title={RootConstants.Social}
								onClick={() => dispatch(setIsEdit(RootConstants.Social))}
							/>
						)}

						{isSocials && !data && (
							<HideButton
								onClick={handleSetIsSocial}
								title={RootConstants.Social}
							/>
						)}
					</>
				}
				content={
					template !== TemplateConstants.Advance ? (
						<AsideItem style={style}>
							<Social data={contacts} />
						</AsideItem>
					) : (
						<Social data={contacts} />
					)
				}
			/>
		</div>
	);
};
