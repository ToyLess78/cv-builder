import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	AccentLayout,
	Aside,
	Certifications,
	Contacts,
	EditButton,
	Languages,
	Skills,
	Title,
} from "~/components";
import { Main } from "~/components/modules/Main/Main";
import { Additional } from "~/components/modules/additional/Additional";
import { Info } from "~/components/modules/header/Info";
import { Summary } from "~/components/modules/header/Summary";
import RootConstants from "~/constants/root.constants";
import { selectCertifications } from "~/slices/certifications.slice";
import { setIsEdit } from "~/slices/edit.slice";
import { selectInfo } from "~/slices/info.slice";
import { selectSkills } from "~/slices/skills.slice";
import type { RootState } from "~/store/store";

const Accent: React.FC = () => {
	const dispatch = useDispatch();
	const aside = useSelector((state: RootState) => selectSkills(state));
	const certificates = useSelector((state: RootState) =>
		selectCertifications(state),
	);
	const info = useSelector((state: RootState) => selectInfo(state));

	return (
		<AccentLayout
			info={
				<Info>
					<EditButton
						onClick={() => dispatch(setIsEdit(RootConstants.Info))}
						title="name & job title"
					/>
				</Info>
			}
			contacts={
				<Aside>
					<Contacts />
				</Aside>
			}
			summary={
				<Summary>
					<EditButton
						onClick={() => dispatch(setIsEdit(RootConstants.Summary))}
						title={info.title}
					/>
					<Title text={info.title} />
				</Summary>
			}
			main={<Main />}
			aside={
				<Aside>
					<Skills>
						<Title text={aside?.skills.title} />
					</Skills>

					<Additional>
						<Title text={aside?.additional.title} />
					</Additional>

					<Certifications>
						<Title text={certificates.title} />
					</Certifications>

					<Languages>
						<Title text={RootConstants.Languages} />
					</Languages>
				</Aside>
			}
		/>
	);
};

export default Accent;
