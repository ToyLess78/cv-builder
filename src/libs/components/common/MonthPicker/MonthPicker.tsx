import { Calendar } from 'primereact/calendar';
import React, { useEffect, useRef, useState } from 'react';
import { Nullable } from 'primereact/ts-helpers';
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
        dateWithPresent && setIsMonth(dateWithPresent)
        datesWithRange && setIsMonth(datesWithRange)
        console.log('isMonth', isMonth)

    }, [dateWithPresent, datesWithRange, isMonth])

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


    return (
        <div>
            <div className="card">
                <form className="p-fluid grid formgrid" onSubmit={() => console.log('submit')}>
                    <PresentCheck/>
                    { isPresent ?
                        <Calendar
                            inputId="monthpicker"
                            value={ dateWithPresent }
                            onChange={ (e) => {
                                setDateWithPresent(e.value);
                                console.log('inputRef', inputRefDateWithPresent.current?.value);
                            } }
                            view="month"
                            dateFormat="mm/yy - Present"
                            inputRef={ inputRefDateWithPresent }
                            // touchUI
                            placeholder="Start Date & Present"
                            required
                        /> :
                        <Calendar
                            panelClassName={ styles.panel }
                            id="monthpicker"
                            inputRef={ inputRefDatesWithRange }
                            value={ datesWithRange } onChange={ (e) => {
                            setDatesWithRange(e.value);
                            console.log('datesWithRange', datesWithRange);
                        } }
                            view="month"
                            dateFormat="mm/yy"
                            selectionMode="range"
                            readOnlyInput
                            hideOnRangeSelection
                            inputClassName={ 'input-class' }
                            placeholder="Start & End Date"
                            required
                        />
                    }

                    <p>{ isPresent ? inputRefDateWithPresent.current?.value : inputRefDatesWithRange.current?.value }</p>
                    <span>
                        { isPresent && dateWithPresent && `${ monthParser(dateWithPresent) }/${ dateWithPresent.getFullYear() } - Present` }
                        { !isPresent && datesWithRange && datesWithRange[0] !== null && datesWithRange[1] !== null &&
                            `${ monthParser(datesWithRange[0]) }/${ datesWithRange[0].getFullYear() } - ${ monthParser(datesWithRange[1]) }/${ datesWithRange[1].getFullYear() }` }
                    </span>
                    <p>{isMonth && isMonth.toString()}</p>
                    <button type='submit' >Submit</button>

                </form>
            </div>
        </div>
    );
};
