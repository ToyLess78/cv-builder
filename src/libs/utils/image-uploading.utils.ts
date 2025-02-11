import type React from "react";
import type { ImageListType } from "~/types/image-uploading.types";

export const openFileDialog = (
	inputRef: React.RefObject<HTMLInputElement>,
): void => {
	if (inputRef.current) inputRef.current.click();
};

export const getAcceptTypeString = (
	acceptType?: Array<string>,
	allowNonImageType?: boolean,
): string => {
	if (acceptType?.length) return acceptType.map((item) => `.${item}`).join(", ");
	if (allowNonImageType) return "";
	return "image/*";
};

const getBase64 = (file: File): Promise<string> => {
	const reader = new FileReader();
	return new Promise((resolve) => {
		reader.addEventListener("load", () => resolve(String(reader.result)));
		reader.readAsDataURL(file);
	});
};

export const getListFiles = (
	files: FileList,
	dataURLKey: string,
): Promise<ImageListType> => {
	const promiseFiles: Array<Promise<string>> = [];
	for (let i = 0; i < files.length; i += 1) {
		promiseFiles.push(getBase64(files[i]));
	}
	return Promise.all(promiseFiles).then((fileListBase64: Array<string>) => {
		const fileList: ImageListType = fileListBase64.map((base64, index) => ({
			[dataURLKey]: base64,
			file: files[index],
		}));
		return fileList;
	});
};
