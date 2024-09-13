import type React from "react";
import { useSelector } from "react-redux";
import {
	Additional,
	Aside,
	Certifications,
	Contacts,
	Languages,
	Main,
	ModernLayout,
	Skills,
	SocialsBox,
	Title,
} from "~/components";
import RootConstants from "~/constants/root.constants";
import { selectCertifications } from "~/slices/certifications.slice";
import { selectSkills } from "~/slices/skills.slice";
import type { RootState } from "~/store/store";

const Modern: React.FC = () => {
	const aside = useSelector((state: RootState) => selectSkills(state));
	const certificates = useSelector((state: RootState) =>
		selectCertifications(state),
	);

	return (
		<ModernLayout
			aside={
				<Aside>
					<Contacts isIcons>
						<Title text={RootConstants.Contacts} />
					</Contacts>
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

					<SocialsBox />
				</Aside>
			}
			main={<Main />}
		/>
	);
};

export default Modern;
