import type { MenuItem } from "primereact/menuitem";
import { SpeedDial } from "primereact/speeddial";
import { TabPanel, TabView } from "primereact/tabview";
import type React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	AsideItem,
	CheckBox,
	CollapsedWrapper,
	Contacts,
	EditWrapper,
	Title,
	UnderlineInput,
} from "~/components";
import { Social } from "~/components/modules/contacts/Contacts";
import { IconsMap } from "~/components/modules/contacts/IconsMap";
import RootConstants from "~/constants/root.constants";
import TemplateConstants from "~/constants/template.constants";
import { selectContacts, setContacts } from "~/slices/contacts.slice";
import { setIsEdit } from "~/slices/edit.slice";
import { selectTheme } from "~/slices/theme.slice";
import type { RootState } from "~/store/store";
import styles from "./Contacts.module.scss";

const EditContacts: React.FC<{ isShare?: boolean }> = ({ isShare = false }) => {
	const contactState = useSelector((state: RootState) => selectContacts(state));
	const [editContacts, setEditContacts] = useState(contactState);

	const setLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditContacts({ ...editContacts, location: e.currentTarget.value });
	};
	const setIsSocials = () => {
		setEditContacts({ ...editContacts, isSocials: !editContacts.isSocials });
	};

	const setEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditContacts({ ...editContacts, email: e.currentTarget.value });
	};

	const setPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditContacts({ ...editContacts, phone: e.currentTarget.value });
	};

	const setLinkedIn = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditContacts({ ...editContacts, linkedIn: e.currentTarget.value });
	};

	const editLink = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
		setEditContacts({
			...editContacts,
			data: editContacts.data.map((x) =>
				x.id === id ? { ...x, link: e.currentTarget.value } : x,
			),
		});
	};

	const setIsShow = (id: string) => {
		setActiveIndex(activeIndex ? activeIndex - 1 : 1);
		setEditContacts({
			...editContacts,
			data: editContacts.data.map((x) =>
				x.id === id ? { ...x, isShow: !x.isShow } : x,
			),
		});
	};

	const dispatch = useDispatch();

	const handlerOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(setContacts(editContacts));
		dispatch(setIsEdit(""));
	};

	const menuItems: MenuItem[] = editContacts.data
		.filter((s) => s.isShow === false)
		.map((s) => ({
			label: s.id,
			icon: IconsMap.get(s?.id),
			command: () => setIsShow(s?.id),
		}));

	const [activeIndex, setActiveIndex] = useState<number>(
		editContacts.data
			.map((x, i) => (x.isShow === true ? i : -1))
			.filter((index) => index !== -1)[0],
	);

	useEffect(() => {
		setActiveIndex(
			editContacts.data
				.map((x, i) => (x.isShow === true ? i : -1))
				.filter((index) => index !== -1)[0],
		);
	}, [editContacts.data]);

	const { template } = useSelector((state: RootState) => selectTheme(state));
	const isIcons =
		template === TemplateConstants.Headway ||
		template === TemplateConstants.Advance ||
		template === TemplateConstants.Success ||
		template === TemplateConstants.Modern;
	const isLinkedIn = template === TemplateConstants.Success;

	return (
		<EditWrapper
			preview={
				!isShare ? (
					<Contacts data={editContacts} isIcons={isIcons} isLinkedIn={isLinkedIn}>
						<Title text={RootConstants.Contacts} />
					</Contacts>
				) : (
					<div className={`${styles.socials} ${styles[template]}`}>
						{template !== TemplateConstants.Advance ? (
							<AsideItem style={{ padding: "1rem" }}>
								<Social data={editContacts} style={{ margin: "0" }} />
							</AsideItem>
						) : (
							<Social data={editContacts} style={{ margin: "0" }} />
						)}
					</div>
				)
			}
			edit={
				<div className={styles.wrapper}>
					{!isShare && (
						<div className={styles.column}>
							<UnderlineInput
								label="location"
								value={editContacts.location}
								onChange={setLocation}
							/>

							<UnderlineInput
								type="email"
								label="email"
								value={editContacts.email}
								onChange={setEmail}
							/>

							<UnderlineInput
								label="phone"
								type="tel"
								value={editContacts.phone}
								onChange={setPhone}
							/>
							{isLinkedIn ? (
								<UnderlineInput
									label="linkedIn"
									type="link"
									value={editContacts.linkedIn}
									onChange={setLinkedIn}
								/>
							) : (
								""
							)}

							{!isIcons && !isShare && (
								<CheckBox
									checked={editContacts.isSocials}
									onChange={setIsSocials}
									title="Show socials"
								/>
							)}
						</div>
					)}
					{(!isIcons || isShare) && (
						<CollapsedWrapper
							isShow={editContacts.isSocials}
							content={
								<>
									<SpeedDial
										model={menuItems}
										direction="left"
										className={`${styles.menu} ${styles[template]}`}
										data-tooltip-id="tooltip"
										data-tooltip-content="Add social"
										data-tooltip-place="top-end"
									/>

									<TabView
										className={`${styles.tab} ${styles[template]}`}
										activeIndex={activeIndex}
										onTabChange={(e) => {
											setActiveIndex(e.index);
										}}
									>
										{editContacts.data?.map((s) => {
											return (
												s.isShow && (
													<TabPanel
														className={styles.item}
														key={s.id}
														header={IconsMap.get(s?.id)}
													>
														<div style={{ padding: "2.5rem 0" }}>
															<UnderlineInput
																label={s.id}
																type="link"
																value={s.link}
																onChange={(e) => editLink(e, s.id)}
															/>
														</div>
														<CheckBox
															checked={s.isShow}
															onChange={() => {
																setIsShow(s?.id);
															}}
															title={s.id}
														/>
													</TabPanel>
												)
											);
										})}
									</TabView>
								</>
							}
						/>
					)}
				</div>
			}
			onSubmit={handlerOnSubmit}
		/>
	);
};

export default EditContacts;
