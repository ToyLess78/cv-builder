import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Aside,
	Contacts,
	EditButton,
	HeadwayLayout,
	Languages,
	Skills,
	SocialsBox,
	Title,
} from "~/components";
import { Main } from "~/components/modules/Main/Main";
import { Info } from "~/components/modules/header/Info";
import { Summary } from "~/components/modules/header/Summary";
import { ReplaceAsideItem } from "~/components/modules/replaceItems/ReplaceAsideItem";
import RootConstants from "~/constants/root.constants";
import { setIsEdit } from "~/slices/edit.slice";
import { selectInfo } from "~/slices/info.slice";
import { selectSkills } from "~/slices/skills.slice";
import type { RootState } from "~/store/store";

const Headway: React.FC = () => {
	const dispatch = useDispatch();
	const aside = useSelector((state: RootState) => selectSkills(state));

	const info = useSelector((state: RootState) => selectInfo(state));

	return (
		<HeadwayLayout
			contacts={<Contacts isIcons />}
			info={
				<Info>
					<EditButton
						onClick={() => dispatch(setIsEdit(RootConstants.Info))}
						title="name & job title"
					/>
				</Info>
			}
			main={<Main />}
			aside={
				<Aside>
					<Summary>
						<EditButton
							onClick={() => dispatch(setIsEdit(RootConstants.Summary))}
							title={info.title}
						/>
						<Title text={info.title} />
					</Summary>

					<Skills>
						<Title text={aside?.skills.title} />
					</Skills>

					<ReplaceAsideItem />

					<Languages>
						<Title text={RootConstants.Languages} />
					</Languages>
					<SocialsBox />
				</Aside>
			}
		/>
	);
};

export default Headway;
