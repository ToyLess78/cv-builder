import { Calendar } from 'primereact/calendar';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { FormEvent, Nullable } from 'primereact/ts-helpers';
import styles from './MonthYearPicker.module.scss';
import { CheckBox } from '~/components/components';

interface IMonthYearPickerWithRangeProps {
    singleValue?: Nullable<Date | null>;
    rangeValue?: Nullable<(Date | null)[]>;
    duration: Nullable<Date | (Date | null)[]>;
    setDuration: React.Dispatch<React.SetStateAction<Nullable<Date | (Date | null)[]>>>;
    children?: ReactNode;
    isYear: boolean;
    isPresent?: boolean;
    inputRefRangeDates?: React.RefObject<HTMLInputElement>;
    inputRefSingleDate?: React.RefObject<HTMLInputElement>;
}

export const MonthYearPickerWithRange: FC<IMonthYearPickerWithRangeProps> = (
    {
        singleValue,
        rangeValue,
        duration,
        setDuration,
        isYear,
        children,
        inputRefRangeDates,
        inputRefSingleDate,
        isPresent = false
    }) => {

    const [rangeDates, setRangeDates] = useState<Nullable<(Date | null)[]>>(null);
    const [singleDate, setSingleDate] = useState<Nullable<Date | null>>(null);

    useEffect(() => {
        singleDate && setDuration(singleDate);
        rangeDates && setDuration(rangeDates);

    }, [singleDate, rangeDates, duration]);

    useEffect(() => {
        isPresent && setRangeDates(null);
        !isPresent && setSingleDate(null);
    }, [isPresent]);


    const handleChangeRangeDates = (e: FormEvent<(Date | null)[], React.SyntheticEvent<Element, Event>>) => {
        setRangeDates(e.value);
    };
    const handleChangeSingleDate = (e: FormEvent<Date, React.SyntheticEvent<Element, Event>>) => {
        setSingleDate(e.value);
    };

    return (
        <div className={ styles.container }>

            { isYear && isPresent &&
                <>
                    <Calendar
                        onChange={ handleChangeSingleDate }
                        value={ singleDate || singleValue }
                        dateFormat="yy - Present"
                        view="year"
                        inputRef={ inputRefSingleDate }
                        inputId="single-year-calendar"
                        className={ styles.calendar }
                        panelClassName={ styles.panel }
                        inputClassName={ styles.input }
                        hideOnRangeSelection
                        required
                    />
                    <label
                        htmlFor="single-year-calendar"
                        className={ styles.label }>
                        Start Year & Present</label>
                </> }
            { !isYear && isPresent &&
                <>
                    <Calendar
                        onChange={ handleChangeSingleDate }
                        value={ singleDate || singleValue }
                        dateFormat="M yy - Present"
                        inputId="single-month-calendar"
                        view="month"
                        inputRef={ inputRefSingleDate }
                        className={ styles.calendar }
                        panelClassName={ styles.panel }
                        inputClassName={ styles.input }
                        hideOnRangeSelection
                        required
                    />
                    <label
                        htmlFor="single-month-calendar"
                        className={ styles.label }>
                        Start Date & Present</label>
                </> }
            { isYear && !isPresent &&
                <>
                    <Calendar
                        onChange={ handleChangeRangeDates }
                        selectionMode="range"
                        value={ rangeDates || rangeValue }
                        dateFormat="yy"
                        inputId="range-year-calendar"
                        view="year"
                        inputRef={ inputRefRangeDates }
                        className={ styles.calendar }
                        panelClassName={ styles.panel }
                        inputClassName={ styles.input }
                        hideOnRangeSelection
                        required
                    />
                    <label
                        htmlFor="range-year-calendar"
                        className={ styles.label }>
                        Start & End Year</label>
                </> }
            { !isYear && !isPresent &&
                <>
                    <Calendar
                        onChange={ handleChangeRangeDates }
                        selectionMode="range"
                        value={ rangeDates || rangeValue }
                        dateFormat="M yy"
                        inputId="range-month-calendar"
                        view="month"
                        inputRef={ inputRefRangeDates }
                        className={ styles.calendar }
                        panelClassName={ styles.panel }
                        inputClassName={ styles.input }
                        hideOnRangeSelection
                        required
                    />
                    <label
                        htmlFor="range-month-calendar"
                        className={ styles.label }>
                        Start & End Date</label>
                </>
            }

            <span className={ styles.border }></span>

            { children }

        </div>
    );
};

export const MonthYearPickerSingle: FC = () => {

    const [isYear, setIsYear] = useState(false);
    const [date, setDate] = useState<Nullable<Date>>(null);

    const handleChangeDate = (e: FormEvent<Date, React.SyntheticEvent<Element, Event>>) => {
        setDate(e.value);
    };
    const handleToggleYear = () => {
        setIsYear(!isYear);
    };

    return (
        <div className={ styles.container }>

            { isYear &&
                <>
                    <Calendar
                        onChange={ handleChangeDate }
                        value={ date }
                        dateFormat="yy"
                        inputId="single-year"
                        view="year"
                        className={ styles.calendar }
                        panelClassName={ styles.panel }
                        inputClassName={ styles.input }
                        hideOnRangeSelection
                        required
                    />
                    <label
                        htmlFor="single-year"
                        className={ styles.label }>
                        Year</label>
                </> }
            { !isYear &&
                <>
                    <Calendar
                        onChange={ handleChangeDate }
                        value={ date }
                        dateFormat="M yy"
                        inputId="single-month"
                        view="month"
                        className={ styles.calendar }
                        panelClassName={ styles.panel }
                        inputClassName={ styles.input }
                        hideOnRangeSelection
                        required
                    />
                    <label
                        htmlFor="single-month"
                        className={ styles.label }>
                        Month & Year</label>
                </> }

            <span className={ styles.border }></span>
            <CheckBox
                checked={ isYear }
                onChange={ handleToggleYear }
                title="Currently only Year"
            />
        </div>
    );
};
