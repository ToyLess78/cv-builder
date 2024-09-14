import type React from "react";
import { useSelector } from "react-redux";
import {
	Additional,
	Aside,
	Body,
	Certifications,
	Contacts,
	Header,
	Languages,
	Main,
	Skills,
	Title,
} from "~/components/components";
import RootConstants from "~/constants/root.constants";
import { selectCertifications } from "~/slices/certifications.slice";
import { selectSkills } from "~/slices/skills.slice";
import type { RootState } from "~/store/store";

export const Breeze: React.FC = () => {
	const aside = useSelector((state: RootState) => selectSkills(state));
	const certificates = useSelector((state: RootState) =>
		selectCertifications(state),
	);

	return (
		<>
			<Header />

			<Body>
				<section className="main" style={{ position: "relative" }}>
					<Main />
				</section>
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

					<Contacts>
						<Title text={RootConstants.Contacts} />
					</Contacts>
				</Aside>
			</Body>
		</>
	);
};
