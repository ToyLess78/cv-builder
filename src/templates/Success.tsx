import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Aside,
	EditButton,
	Languages,
	Skills,
	SuccessLayout,
	Title,
} from "~/components";
import { Main } from "~/components/modules/Main/Main";
import { Summary } from "~/components/modules/header/Summary";
import { ReplaceAsideItem } from "~/components/modules/replaceItems/ReplaceAsideItem";
import RootConstants from "~/constants/root.constants";
import { setIsEdit } from "~/slices/edit.slice";
import { selectInfo } from "~/slices/info.slice";
import { selectSkills } from "~/slices/skills.slice";
import type { RootState } from "~/store/store";

const Success: React.FC = () => {
	const dispatch = useDispatch();
	const aside = useSelector((state: RootState) => selectSkills(state));

	const info = useSelector((state: RootState) => selectInfo(state));

	return (
		<SuccessLayout
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
				</Aside>
			}
			main={<Main />}
		/>
	);
};

export default Success;
