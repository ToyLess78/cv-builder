import { Calendar } from 'primereact/calendar';
import React, { useEffect, useRef, useState } from 'react';
import { FormEvent, Nullable } from 'primereact/ts-helpers';
import styles from './MonthYearPicker.module.scss';

interface YearCheckProps {
    isYear: boolean;
    setIsYear: React.Dispatch<React.SetStateAction<boolean>>;
}

const YearCheck: React.FC<YearCheckProps> = ({isYear, setIsYear}) => {
    const handleToggleYear = () => {
        setIsYear(!isYear);
    };
    return (
        <div className={ styles.present }>
            <label className={ styles.switch }>
                <input type="checkbox" checked={ isYear } onChange={ handleToggleYear }/>
                <span className={ styles.slider }></span>
            </label>
            <span className={ isYear ? styles.checked : styles.uncheck }>Currently only Year</span>
        </div>
    );
};
export const MonthYearPickerWithRange = () => {
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
    const [singleDate, setSingleDate] = useState<Nullable<Date>>(null);

    const inputRefSingleDate = useRef<HTMLInputElement>(null);
    const inputRefRangeDates = useRef<HTMLInputElement>(null);
    const [isMonth, setIsMonth] = useState<Nullable<(Date | null)[] | Date>>(null);

    const [isYear, setIsYear] = useState(false);

    useEffect(() => {
        singleDate && setIsMonth(singleDate);
        rangeDates && setIsMonth(rangeDates);
        console.log('isMonth', isMonth);

    }, [singleDate, rangeDates, isMonth]);

    const handleToggleRange = () => {
        setIsPresent(!isPresent);
        isPresent && setRangeDates(null);
        !isPresent && setSingleDate(null);
    };

    const RangeCheck: React.FC = () => {
        return (
            <div className={ styles.present }>
                <label className={ styles.switch }>
                    <input type="checkbox" checked={ isPresent } onChange={ handleToggleRange }/>
                    <span className={ styles.slider }></span>
                </label>
                <span className={ isPresent ? styles.checked : styles.uncheck }>Currently work here</span>
            </div>
        );
    };

    const monthParser = (date: Date) => String(date.getMonth() + 1).padStart(2, '0');

    const handleChangeRangeDates = (e: FormEvent<(Date | null)[], React.SyntheticEvent<Element, Event>>) => {
        setRangeDates(e.value);
    };
    const handleChangeSingleDate = (e: FormEvent<Date, React.SyntheticEvent<Element, Event>>) => {
        setSingleDate(e.value);
    };

    return (
        <div className={ styles.container }>
            <YearCheck { ...{isYear, setIsYear} } />
            <RangeCheck/>
            { isYear && isPresent &&
                <Calendar
                    onChange={ handleChangeSingleDate }
                    value={ singleDate }
                    inputRef={ inputRefSingleDate }
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
                    inputRef={ inputRefSingleDate }
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
                    inputRef={ inputRefRangeDates }
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
                    inputRef={ inputRefRangeDates }
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

            <p>{ isPresent ? inputRefSingleDate.current?.value : inputRefRangeDates.current?.value }</p>
            <span>
                        { isPresent && singleDate && `${ monthParser(singleDate) }/${ singleDate.getFullYear() } - Present` }
                { !isPresent && rangeDates && rangeDates[0] !== null && rangeDates[1] !== null &&
                    `${ monthParser(rangeDates[0]) }/${ rangeDates[0].getFullYear() } - ${ monthParser(rangeDates[1]) }/${ rangeDates[1].getFullYear() }` }
                    </span>
            <p>{ isYear && isYear.toString() }</p>
        </div>
    );
};

export const MonthYearPickerSingle: React.FC = () => {

    const [isYear, setIsYear] = useState(false);
    const [date, setDate] = useState<Nullable<Date>>(null);

    const handleChangeDate = (e: FormEvent<Date, React.SyntheticEvent<Element, Event>>) => {
        setDate(e.value);
    };

    return (
        <div className={ styles.container }>
            <YearCheck { ...{isYear, setIsYear} } />

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
