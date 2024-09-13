import type { Nullable } from "primereact/ts-helpers";

const regexIsPresent = / - Present*/;
const regexIsRange = / - */;
const monthNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const parseMonthYearString = (dateString: string) => {
	const parts = dateString.split(" ");

	if (parts.length === 1) {
		const year = Number.parseInt(parts[0]);
		return new Date(year, 0);
	}
	const monthIndex = monthNames.findIndex(
		(month) => month.toLowerCase() === parts[0].toLowerCase(),
	);

	if (monthIndex === -1) {
		return null;
	}

	const year = Number.parseInt(parts[1]);

	return new Date(year, monthIndex);
};

export const reformatDateSingle = (
	datesString: string,
): Nullable<Date | null> => {
	if (!datesString) return null;

	if (regexIsPresent.test(datesString)) {
		const cleanedString = datesString.replace(regexIsPresent, "");
		return parseMonthYearString(cleanedString) || null;
	}
	return null;
};

export const reformatDateRange = (
	datesString: string,
): Nullable<(Date | null)[]> => {
	if (!datesString) return null;

	if (regexIsRange.test(datesString)) {
		const datesArray = datesString.split(" - ");
		return datesArray.map((date) => {
			if (!date) {
				return null;
			}
			return parseMonthYearString(date) || null;
		});
	}
	return null;
};
