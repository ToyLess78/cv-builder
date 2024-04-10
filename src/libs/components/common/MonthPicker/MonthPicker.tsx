import { Calendar } from 'primereact/calendar';
import React, { useEffect, useRef, useState } from 'react';
import { FormEvent, Nullable } from 'primereact/ts-helpers';
import styles from './MonthPicker.module.scss';
import './RippleDemo.css';


export const MonthPicker = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const prevMonth = (month === 0) ? 11 : month - 1;
    const prevYear = (prevMonth === 11) ? year - 1 : year;
    const nextMonth = (month === 11) ? 0 : month + 1;
    const nextYear = (nextMonth === 0) ? year + 1 : year;


    const minDate = new Date();
    minDate.setMonth(prevMonth);
    minDate.setFullYear(prevYear);

    const maxDate = new Date();
    maxDate.setMonth(nextMonth);
    maxDate.setFullYear(nextYear);

    const [isPresent, setIsPresent] = useState(false);
    const [datesWithRange, setDatesWithRange] = useState<Nullable<(Date | null)[]>>(null);
    const [dateWithPresent, setDateWithPresent] = useState<Nullable<Date>>(null);

    const inputRefDateWithPresent = useRef<HTMLInputElement>(null);
    const inputRefDatesWithRange = useRef<HTMLInputElement>(null);
    const [isMonth, setIsMonth] = useState<Nullable<(Date | null)[] | Date>>(null);

    useEffect(() => {
        dateWithPresent && setIsMonth(dateWithPresent);
        datesWithRange && setIsMonth(datesWithRange);
        console.log('isMonth', isMonth);

    }, [dateWithPresent, datesWithRange, isMonth]);

    const handleToggle = () => {
        setIsPresent(!isPresent);
        isPresent && setDatesWithRange(null);
        !isPresent && setDateWithPresent(null);
    };

    const PresentCheck: React.FC = () => {
        return (
            <div className={ styles.present }>
                <label className={ styles.switch }>
                    <input type="checkbox" checked={ isPresent } onChange={ handleToggle }/>
                    <span className={ styles.slider }></span>
                </label>
                <span className={ isPresent ? styles.checked : styles.uncheck }>Currently work here</span>
            </div>
        );
    };

    const monthParser = (date: Date) => String(date.getMonth() + 1).padStart(2, '0');


    const handleChangeRangeDate = (e: FormEvent<(Date | null)[], React.SyntheticEvent<Element, Event>>) => {
        setDatesWithRange(e.value);
    };
    const handleChangePresentDate = (e: FormEvent<Date, React.SyntheticEvent<Element, Event>>) => {
        setDateWithPresent(e.value);
    };

    return (
        <div className={ styles.container }>
            <PresentCheck/>
            { isPresent ?
                <Calendar
                    onChange={handleChangePresentDate}
                    selectionMode='single'
                    value={dateWithPresent}
                    inputRef={inputRefDateWithPresent}
                    dateFormat='mm/yy - Present'
                    placeholder='Start Date & Present'
                    view="month"
                    className={styles.calendar}
                    panelClassName={styles.panel}
                    inputClassName={styles.input}
                    hideOnRangeSelection
                    readOnlyInput
                    required
                /> :
                <Calendar
                    onChange={handleChangeRangeDate}
                    selectionMode='range'
                    value={datesWithRange}
                    inputRef={inputRefDatesWithRange}
                    dateFormat='mm/yy'
                    placeholder='Start & End Date'
                    view="month"
                    className={styles.calendar}
                    panelClassName={styles.panel}
                    inputClassName={styles.input}
                    hideOnRangeSelection
                    readOnlyInput
                    required
                />
            }

            <span className={ styles.border }></span>


            <p>{ isPresent ? inputRefDateWithPresent.current?.value : inputRefDatesWithRange.current?.value }</p>
            <span>
                        { isPresent && dateWithPresent && `${ monthParser(dateWithPresent) }/${ dateWithPresent.getFullYear() } - Present` }
                { !isPresent && datesWithRange && datesWithRange[0] !== null && datesWithRange[1] !== null &&
                    `${ monthParser(datesWithRange[0]) }/${ datesWithRange[0].getFullYear() } - ${ monthParser(datesWithRange[1]) }/${ datesWithRange[1].getFullYear() }` }
                    </span>
            <p>{ isMonth && isMonth.toString() }</p>
            <button type="submit">Submit</button>

        </div>
    );
};
