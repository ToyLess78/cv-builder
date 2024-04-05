import { useEffect, useState } from 'react';
import { MonthPicker, MonthInput } from 'react-lite-month-picker';

export interface MonthData {
    month: number
    year: number
    monthName?: string
    monthShortName?: string
}
function Example() {
    const [selectedMonthData, setSelectedMonthData] = useState<MonthData>({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    });
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    useEffect(() => {
        const {monthShortName, year} = selectedMonthData;
        if (monthShortName) console.log(new Date(monthShortName + ' ' + year))
    }, [selectedMonthData]);

    return (
        <>
            <div className='month-picker'>
                <MonthInput
                    selected={selectedMonthData}
                    setShowMonthPicker={setIsPickerOpen}
                    showMonthPicker={isPickerOpen}
                    size='small'


                />
                {isPickerOpen ? (
                    <MonthPicker
                        setIsOpen={setIsPickerOpen}
                        selected={selectedMonthData}
                        onChange={setSelectedMonthData}
                        bgColorMonthActive='#D9D9D9'
                        borderRadiusMonth='2px'
                        size='small'


                    />
                ) : null}
            </div>
        </>
    );
}

export default Example;