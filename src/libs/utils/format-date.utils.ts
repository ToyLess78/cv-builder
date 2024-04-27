export const formatDateToString = (dateTime: Date | Date[], isYear: boolean): string | string[] => {
    const options: Intl.DateTimeFormatOptions = isYear ? {
        year: 'numeric'
    } : {
        month: 'short',
        year: 'numeric'
    };

    if (Array.isArray(dateTime)) {
        return dateTime?.map(date => new Intl.DateTimeFormat('en-GB', options).format(date));
    } else {
        return new Intl.DateTimeFormat('en-GB', options).format(dateTime);
    }
};

export const formatStringToDate = (dateTime: string | string[]): Date | Date[] => {

    if (Array.isArray(dateTime)) {
        return dateTime?.map(date => new Date(date) || new Date());
    } else {
        return new Date(dateTime) || new Date();
    }
};

export const formatDurationToString = (dateTime: string | string[]): string | string[] => {

    if (Array.isArray(dateTime)) {
        return `${ dateTime[0] } - ${ dateTime[1] }`;
    } else {
        return `${ dateTime } - Present`;
    }
};