import { Calendar } from 'primereact/calendar';
import React, { FC, useEffect, useState } from 'react';
import { FormEvent, Nullable } from 'primereact/ts-helpers';
import styles from './MonthYearPicker.module.scss';
import { CheckBox } from '~/components/components';

export const MonthYearPickerWithRange: FC = () => {
    // const today = new Date();
    // const month = today.getMonth();
    // const year = today.getFullYear();
    // const prevMonth = (month === 0) ? 11 : month - 1;
    // const prevYear = (prevMonth === 11) ? year - 1 : year;
    // const nextMonth = (month === 11) ? 0 : month + 1;
    // const nextYear = (nextMonth === 0) ? year + 1 : year;
    //
    //
    // const minDate = new Date();
    // minDate.setMonth(prevMonth);
    // minDate.setFullYear(prevYear);
    //
    // const maxDate = new Date();
    // maxDate.setMonth(nextMonth);
    // maxDate.setFullYear(nextYear);

    const [isPresent, setIsPresent] = useState(false);
    const [rangeDates, setRangeDates] = useState<Nullable<(Date | null)[]>>(null);
    const [singleDate, setSingleDate] = useState<Nullable<Date>>(new Date("2024-04-30T21:00:00.000Z"));

    const [duration, setDuration] = useState<Nullable<(Date | null)[] | Date>>([new Date("2022-04-30T21:00:00.000Z"), new Date("2024-04-30T21:00:00.000Z")]);

    const [isYear, setIsYear] = useState(false);

    const handleToggleYear = () => {
        setIsYear(!isYear);
    };

    useEffect(() => {
        singleDate && setDuration(singleDate);
        rangeDates && setDuration(rangeDates);

    }, [singleDate, rangeDates, duration]);

    const handleToggleRange = () => {
        setIsPresent(!isPresent);
        isPresent && setRangeDates(null);
        !isPresent && setSingleDate(null);
    };


    const handleChangeRangeDates = (e: FormEvent<(Date | null)[], React.SyntheticEvent<Element, Event>>) => {
        setRangeDates(e.value);
    };
    const handleChangeSingleDate = (e: FormEvent<Date, React.SyntheticEvent<Element, Event>>) => {
        setSingleDate(e.value);
        console.log(e.value);
    };

    return (
        <div className={ styles.container }>
            <CheckBox
                checked={ isYear }
                onChange={ handleToggleYear }
                title="Currently only Year"
            />
            <CheckBox
                checked={ isPresent }
                onChange={ handleToggleRange }
                title="Currently work here"
            />
            { isYear && isPresent &&
                <Calendar
                    onChange={ handleChangeSingleDate }
                    value={ singleDate }
                    dateFormat="yy - Present"
                    placeholder="Start Date & Present"
                    view="year"
                    className={ styles.calendar }
                    panelClassName={ styles.panel }
                    inputClassName={ styles.input }
                    hideOnRangeSelection
                    readOnlyInput
                    required
                /> }
            { !isYear && isPresent &&
                <Calendar
                    onChange={ handleChangeSingleDate }
                    value={ singleDate }
                    dateFormat="mm/yy - Present"
                    placeholder="Start Date & Present"
                    view="month"
                    className={ styles.calendar }
                    panelClassName={ styles.panel }
                    inputClassName={ styles.input }
                    hideOnRangeSelection
                    readOnlyInput
                    required
                /> }
            { isYear && !isPresent &&
                <Calendar
                    onChange={ handleChangeRangeDates }
                    selectionMode="range"
                    value={ rangeDates }
                    dateFormat="yy"
                    placeholder="Start & End Date"
                    view="year"
                    className={ styles.calendar }
                    panelClassName={ styles.panel }
                    inputClassName={ styles.input }
                    hideOnRangeSelection
                    readOnlyInput
                    required
                />
            }
            { !isYear && !isPresent &&
                <Calendar
                    onChange={ handleChangeRangeDates }
                    selectionMode="range"
                    value={ rangeDates }
                    dateFormat="mm/yy"
                    placeholder="Start & End Date"
                    view="month"
                    className={ styles.calendar }
                    panelClassName={ styles.panel }
                    inputClassName={ styles.input }
                    hideOnRangeSelection
                    readOnlyInput
                    required
                />
            }

            <span className={ styles.border }></span>

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
            <CheckBox
                checked={ isYear }
                onChange={ handleToggleYear }
                title="Currently only Year"
            />

            { isYear &&
                <Calendar
                    onChange={ handleChangeDate }
                    value={ date }
                    dateFormat="yy"
                    placeholder="Year"
                    view="year"
                    className={ styles.calendar }
                    panelClassName={ styles.panel }
                    inputClassName={ styles.input }
                    hideOnRangeSelection
                    readOnlyInput
                    required
                /> }
            { !isYear &&
                <Calendar
                    onChange={ handleChangeDate }
                    value={ date }
                    dateFormat="mm/yy"
                    placeholder="Month & Year"
                    view="month"
                    className={ styles.calendar }
                    panelClassName={ styles.panel }
                    inputClassName={ styles.input }
                    hideOnRangeSelection
                    readOnlyInput
                    required
                /> }

            <span className={ styles.border }></span>
        </div>
    );
};
