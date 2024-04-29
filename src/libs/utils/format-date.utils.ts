import { Nullable } from 'primereact/ts-helpers';

const regexIsPresent = / - Present*/;
const regexIsRange = / - */;
const regexIsSlash = /(\d{2})\/(\d{4})/;

export const reformatDateSingle = (datesString: string): Nullable<Date | null> => {
    if (!datesString) return null;

    if (regexIsPresent.test(datesString)) {
        const cleanedString = datesString.replace(regexIsPresent, '');
        if (regexIsSlash.test(cleanedString)) {
            const formattedString = cleanedString.replace(regexIsSlash, '$2/$1');
            return new Date(formattedString);
        } else if (cleanedString) {
            return new Date(cleanedString) || null;
        }

    } else {
        return null;
    }
};

export const reformatDateRange = (datesString: string): Nullable<(Date | null)[]> => {
    if (!datesString) return null;

    if (regexIsRange.test(datesString)) {
        const datesArray = datesString.split(' - ');
        return datesArray.map(date => {
            if (!date) {
                return null;
            }
            if (regexIsSlash.test(date)) {
                return new Date(date.replace(regexIsSlash, '$2/$1')) || null;
            } else {
                return new Date(date) || null;
            }
        });
    } else {
        return null;
    }
};