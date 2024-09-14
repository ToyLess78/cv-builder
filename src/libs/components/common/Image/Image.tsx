import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
	HideButton,
	ShowButton,
	UploadButton,
} from "~/components/common/Buttons/Buttons";
import TemplateConstants from "~/constants/template.constants";
import { selectInfo } from "~/slices/info.slice";
import { selectTheme } from "~/slices/theme.slice";
import type { RootState } from "~/store/store";
import type { ImageType } from "~/types/image-uploading.types";
import classes from "./Image.module.scss";
import ImageUploading from "./ImageUploading";

interface IImageProps {
	styles: string;
	isPolygon?: boolean;
	isHide?: boolean;
}

export const Image: React.FC<IImageProps> = ({
	styles,
	isPolygon = false,
	isHide = false,
}) => {
	const [image, setImage] = React.useState<ImageType | null>(null);
	const [opacity, setOpacity] = useState(true);
	const info = useSelector((state: RootState) => selectInfo(state));
	const { color } = useSelector((state: RootState) => selectTheme(state));

	const onChange = (imageList: ImageType[]) => {
		setImage(imageList[0] || null);
	};

	const { template } = useSelector((state: RootState) => selectTheme(state));
	const avatar =
		template === TemplateConstants.Breeze
			? "avatar-breeze.jpg"
			: template === TemplateConstants.Modern
				? "avatar-modern.jpg"
				: "avatar.jpg";

	return (
		<ImageUploading value={image ? [image] : []} onChange={onChange}>
			{({ onImageUpdate }) => (
				<section className={styles} data-opacity={opacity}>
					{isPolygon && (
						<div
							className={classes.polygon}
							style={{ background: color, opacity: Number(!opacity) }}
						>
							<h2>{info.firstname.trim().charAt(0)}</h2>
							<h2>{info.lastname.trim().charAt(0)}</h2>
						</div>
					)}
					{opacity && (
						<>
							<UploadButton onClick={() => onImageUpdate(0)} />
							{!isHide && (
								<HideButton
									offset={0}
									title="Photo"
									onClick={() => setOpacity(!opacity)}
								/>
							)}
						</>
					)}

					{!opacity && (
						<ShowButton title="Photo" onClick={() => setOpacity(!opacity)} />
					)}
					<img
						src={image?.dataURL || avatar}
						alt="User avatar"
						style={{ opacity: Number(opacity), filter: "grayscale(85%)" }}
					/>
				</section>
			)}
		</ImageUploading>
	);
};
