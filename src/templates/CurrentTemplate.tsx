import type React from "react";
import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "~/components";
import TemplateConstants from "~/constants/template.constants";
import { selectTheme, setTemplate } from "~/slices/theme.slice";
import type { RootState } from "~/store/store";
import { Breeze } from "./Breeze";
import Modern from "./Modern";

const Strong = lazy(() => import("./Strong"));
const Accent = lazy(() => import("./Accent"));
const Advance = lazy(() => import("./Advance"));
const Headway = lazy(() => import("./Headway"));
const Success = lazy(() => import("./Success"));

const CurrentTemplate: React.FC = () => {
	const { template } = useSelector((state: RootState) => selectTheme(state));
	const dispatch = useDispatch();

	switch (template) {
		case TemplateConstants.Breeze: {
			return <Breeze />;
		}
		case TemplateConstants.Strong: {
			return (
				<Suspense fallback={<Loading />}>
					<Strong />
				</Suspense>
			);
		}
		case TemplateConstants.Accent: {
			return (
				<Suspense fallback={<Loading />}>
					<Accent />
				</Suspense>
			);
		}
		case TemplateConstants.Advance: {
			return (
				<Suspense fallback={<Loading />}>
					<Advance />
				</Suspense>
			);
		}
		case TemplateConstants.Headway: {
			return (
				<Suspense fallback={<Loading />}>
					<Headway />
				</Suspense>
			);
		}
		case TemplateConstants.Success: {
			return (
				<Suspense fallback={<Loading />}>
					<Success />
				</Suspense>
			);
		}
		case TemplateConstants.Modern: {
			return (
				<Suspense fallback={<Loading />}>
					<Modern />
				</Suspense>
			);
		}
		default: {
			dispatch(setTemplate(TemplateConstants.Breeze));
			return <Breeze />;
		}
	}
};

export default CurrentTemplate;
