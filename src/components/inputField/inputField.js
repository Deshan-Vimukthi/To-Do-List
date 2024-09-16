import './style.css'
import {useEffect, useRef, useState} from "react";
import icon from "../../icon";


const daysOfWeek=[
       'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
];
const months=[
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'];

export {months,daysOfWeek};

export const InputField = ({ name, placeholder, type, className, value, onChange, onBlur, suggestList }) => {

    const drawSuggest = () => {
        if (suggestList && suggestList.length > 1) {
            return (
                <datalist className='suggest-list' id={`${name}-list`}>
                    {suggestList.map(suggest => (
                        <option key={suggest.text || suggest} value={suggest.text ? suggest.text : suggest}>
                            {suggest.hint ? suggest.hint : ''}
                        </option>
                    ))}
                </datalist>
            );
        }
    };

    return (
        <div className={`input-field ${className}`}>
            <div className='input-container'>
                <input
                    list={`${name}-list`}
                    type={type || 'text'}
                    className={`input-field-input`}
                    placeholder={placeholder || name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur} // added onBlur to handle Formik's blur event
                />
                <div>{placeholder}</div>
                {drawSuggest()}
            </div>
        </div>
    );
};

export const MaskedTextBox = ({
                                  name,
                                  placeholder,
                                  maskChar = '*',
                                  minLength = 0,
                                  maxLength,
                                  isToggle = false,
                                  initialVisibility = false,
                                  onChangeValue,
                                  onToggle,
                                  showImage,
                                  hideImage,
                                  className
                              }) => {
    const [unmasked, setUnmasked] = useState(initialVisibility);
    const [value, setValue] = useState('');
    const [mask, setMask] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        let text = e.target.value;
        const selectionStart = e.target.selectionStart;

        if (!unmasked) {
            if (text.length > value.length) {
                let firstHalf = (selectionStart < value.length) ? value.substring(0, selectionStart - 1) : value;
                let secondHalf = value.substring(selectionStart - 1, value.length);
                setValue(firstHalf + text.charAt(selectionStart - 1) + secondHalf);
            } else {
                let firstHalf = (text.length < value.length) ? value.substring(0, selectionStart) : value.substring(0, selectionStart - 1);
                let secondHalf = value.substring(selectionStart + (value.length - text.length), value.length);
                let add = text.charAt(selectionStart - 1);
                let returnValue = firstHalf;
                returnValue += (add !== maskChar) ? add : '';
                returnValue += secondHalf;
                setValue(returnValue);
            }
        } else {
            if (maxLength && text.length > maxLength)
                text = text.substring(0, maxLength);
            setValue(text);
        }

        let temp = '';
        for (let i = 0; i < text.length; i++) {
            temp += maskChar;
        }
        setMask(temp);

        if (text.length < minLength) {
            createError(`Add at least ${minLength} characters`);
        } else {
            createError('');
        }

        if (onChangeValue) {
            onChangeValue(text);
        }
    }

    const togglePassword = () => {
        setUnmasked(!unmasked);
        if (onToggle) {
            onToggle(!unmasked);
        }
    }

    const handleBlur = () => {
        if (value.length < minLength) {
            createError(`Add at least ${minLength} characters`);
        } else {
            createError('');
        }
    }

    const createError = (message) => {
        setError(message);
    }

    return (
        <div className={`input-field ${className}`} onBlur={handleBlur}>
            <div className={'divided-content'}>
                <div className='input-container' aria-invalid={error !== ''}>
                    <input
                        type={unmasked ? 'text' : 'password'}
                        minLength={minLength}
                        maxLength={maxLength || undefined}
                        placeholder={placeholder || name}
                        style={{ width: "auto" }}
                        value={unmasked ? value : mask}
                        onChange={handleChange}
                    />
                    <div>{name}</div>
                    {isToggle &&
                        <button type="button" onClick={togglePassword}>
                            {(unmasked ? (hideImage || 'Hide') : (showImage || 'Show'))}
                        </button>
                    }
                </div>
                {error &&
                    <div className='error-message'>
                        {error}
                    </div>
                }
            </div>
        </div>
    );
}

export const TextButton = ({name,text,icon,onClick,className,active}) =>{
    const handleClick=()=>{
        try{
            onClick();
        }catch (e) {

        }
    }
    return(
        <div aria-selected={active || false} className={`text-button ${className}`} id={name} onClick={handleClick}>
            <div id={`${name}-icon`}>{icon}</div>
            <div id={`${name}-text`}>{text}</div>
        </div>
    )
}

const Calendar = ({ onSelectDate }) => {

    const DisplayType = {
        Year:'year',
        Month:'month',
        Day:'day'
    }

    const [currentDate, setCurrentDate] = useState(new Date());
    const [displayType,setDisplayType] = useState(DisplayType.Day);
    // Get current month and year
    const [currentYear,setCurrentYear] = useState(currentDate.getFullYear());
    const [currentMonth,setCurrentMonth] = useState(currentDate.getMonth());
    const today = new Date();


    const [focusDecade,setDecade] = useState(parseInt(`${currentYear/10}`)*10);
    const renderYears=()=>{
        const years = [];
        const threshHold = 20;
        const getYears=()=>{
            for(let  i = focusDecade;i<focusDecade+threshHold;i++){
                years.push(i);
            }
        }
        getYears();
        const handleClickYear = (year)=>{
            setCurrentYear(year);
            setDisplayType(DisplayType.Day);
        }
        const handlePrevDecade = ()=>{
            setDecade(focusDecade - threshHold);
        }
        const handleNextDecade = ()=>{
            setDecade(focusDecade+threshHold);
        }

        return(
            <div>
                <div className="calendar-header">
                    <button onClick={handlePrevDecade}><i className="arrow left"></i></button>
                    <div>
                        <div className='calendar-title'>
                            {`${focusDecade} - ${focusDecade+threshHold}`}
                        </div>
                    </div>
                    <button onClick={handleNextDecade}><i className="arrow right"></i></button>
                </div>
                <div className='years'>
                    {years.map(year=>(
                        <div aria-selected={year===currentYear} className='year' onClick={()=>handleClickYear(year)}>
                            {year}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    const renderMonths=()=>{
        const handleClickMonth = (month,index)=>{
            setCurrentMonth(index);
            setDisplayType(DisplayType.Day);
        }
        return(
            <div>
                <div className="calendar-header">
                    <div>
                        <div className='calendar-title'>
                            {currentYear}
                        </div>
                    </div>
                </div>
                <div className='months'>
                    {months.map((month,index)=>(
                        <div aria-selected={index===currentMonth} className='month' onClick={()=>handleClickMonth(month,index)}>
                            {month.toString().substring(0,3)}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const renderCalendar = () => {
        const handleDateClick = (year, month, day) => {
            const selectedDate = new Date(year, month, day);
            const formattedDate = `${year} / ${String(month + 1).padStart(2, '0')} / ${String(day).padStart(2, '0')}`;
            onSelectDate(formattedDate,selectedDate);
        };

        const getDaysInMonth = (year, month) => {
            return new Date(year, month + 1, 0).getDate();
        };

        // Function to generate an array of dates for a given month
        const generateDatesForMonth = (year, month) => {
            const totalDays = getDaysInMonth(year, month);
            const dates = [];
            for (let i = 1; i <= totalDays; i++) {
                dates.push(new Date(year, month, i));
            }
            return dates;
        };

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        // Generate dates for the current month
        const datesForCurrentMonth = generateDatesForMonth(currentYear, currentMonth);

        // Generate dates for the previous month with reduced opacity
        const datesForPreviousMonth = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            const date = new Date(currentYear, currentMonth, -i);
            datesForPreviousMonth.unshift(date);
        }
        const datesForNextMonth = [];
        const nextMonthDates = 7-(datesForCurrentMonth.length+datesForPreviousMonth.length)%7;
        for (let i = 0; i < nextMonthDates; i++) {
            const date = new Date(currentYear, currentMonth + 1, i+1);
            datesForNextMonth.push(date);
        }
        return(<div className="calendar-grid">
            <div className="days-of-week">
                {daysOfWeek.map((day) => (
                    <div key={day} className="day">{day}</div>
                ))}
            </div>
            <div className="dates">
                {datesForPreviousMonth.map((date) => (
                    <div key={date} className="date" style={{ opacity: 0.5 }}>
                        {date.getDate()}
                    </div>
                ))}
                {datesForCurrentMonth.map((date) => (
                    <button key={date} onClick={()=>handleDateClick(date.getFullYear(),date.getMonth(),date.getDate())} className={(today.getDate()===date.getDate() && today.getFullYear()===currentYear && today.getMonth()===currentMonth)?'today':'date'} >
                        {date.getDate()}
                    </button>
                ))}
                {datesForNextMonth.map((date) => (
                    <div key={date} className="date" style={{ opacity: 0.5 }}>
                        {date.getDate()}
                    </div>
                ))}
            </div>
        </div>);
    };

    const handlePrevMonth = () => {
        if(currentMonth===0){
            setCurrentYear(currentYear-1);
            setCurrentMonth(11);
        }
        else setCurrentMonth(currentMonth-1);
        setCurrentDate(new Date(currentYear,currentMonth+1,1));
    };
    const handleNextMonth = () => {
        if(currentMonth===11){
            setCurrentYear(currentYear+1);
        }
        setCurrentMonth((currentMonth+1)%12);
        setCurrentDate(new Date(currentYear,currentMonth,1));
    };

    return (
        <div className="popup">
            {displayType===DisplayType.Day &&
                <div>
                    <div className="calendar-header">
                        <button onClick={handlePrevMonth}><i className="arrow left"></i></button>
                        <div>
                            <div className='calendar-title' onClick={()=>setDisplayType(DisplayType.Year)}>
                                {`${currentYear}`}
                            </div>
                            <div className='calendar-title' onClick={()=>setDisplayType(DisplayType.Month)}>
                                {`${months[currentMonth]}`}
                            </div>
                        </div>
                        <button onClick={handleNextMonth}><i className="arrow right"></i></button>
                    </div>
                    <div style={{padding:'5px'}}>
                        {renderCalendar()}
                    </div>
                </div>}
            {displayType===DisplayType.Year && renderYears()}
            {displayType===DisplayType.Month && renderMonths()}
        </div>
    );
};
const DateInputMask = ({ name,value,onDateChange }) => {
    const [inputValue, setInputValue] = useState(value||'');

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const formatDate = (thisValue) =>{
        let formattedValue = '';

        if (thisValue.length >= 4) {
            formattedValue += thisValue.substring(0, 4) + ' / ';
        } else {
            formattedValue = thisValue;
        }

        if (thisValue.length >= 6) {
            formattedValue += thisValue.substring(4, 6) + ' / ';
            formattedValue += thisValue.substring(6, 8);
        } else if (thisValue.length > 4) {
            formattedValue += thisValue.substring(4);
        }

        return formattedValue;
    }
    const handleInputChange = (e) => {
        let thisValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        let formattedValue = formatDate(thisValue);
        setInputValue(formattedValue);
    };

    const parseDate = () => {
        if(inputValue !== '' && inputValue!==null){
            const parts = inputValue.split(' / ').map((part) => parseInt(part, 10));
            if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
                const year = parts[0];
                const month = parts[1] - 1; // Months are 0-indexed in JS Date objects
                const day = parts[2];
                return new Date(year, month, day);
            }
        }
        return null;
    };

    const handleBlur = () => {
        const date = parseDate();
        if(date!==null){
            const formattedDate = `${date.getFullYear()} / ${String(date.getMonth() + 1).padStart(2, '0')} / ${String(date.getDate()).padStart(2, '0')}`;

            if (date) {
                onDateChange(formattedDate,date);
            }
        }
    };

    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder={`${name?`${name} : `:''}YYYY / MM / DD`}
            maxLength={14} // 'YYYY / MM / DD' is 14 characters long
        />
    );
};
export const DatePicker = ({name,onChangeDate}) => {
    const [date, setDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);

    const inputRef = useRef(null);
    const calendarRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            inputRef.current &&
            !inputRef.current.contains(event.target) &&
            calendarRef.current &&
            !calendarRef.current.contains(event.target)
        ) {
            setShowCalendar(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDateChange = (formattedDate,selectedDate) => {
        setDate(formattedDate);
        setShowCalendar(false);
        try{
            onChangeDate(selectedDate);
        }catch (e) {

        }

    };

    const toggleCalendar = () => {
        setShowCalendar((prev) => !prev);
    };

    return (
        <div className="input-field" ref={inputRef}>
            <div className="input-container">
                <DateInputMask name={name} value={date} onDateChange={handleDateChange} />
                <div>{name}</div>
                <button onClick={toggleCalendar}>{icon.calendar}</button>
            </div>

            {showCalendar && (
                <div ref={calendarRef}>
                    <Calendar onSelectDate={handleDateChange} />
                </div>
            )}
        </div>
    );
};

export const DrawRotator = ({initialIndex,valueList,textLength,startValue,endValue,valueDifference,onIncrease,onDecrease,onTypeValue,initialValue,onChangeValue})=>{
    const [selectedIndex,selectIndex]=useState(0);
    const [srcList,setSrcList] = useState([]);
    const [value,setValue] = useState('');

    function Value(){
        let index = srcList.indexOf(`${initialValue}`.padStart(textLength,'0'));
        if (index>=0)
            selectIndex(index);
    }
    const handleOnchange = (value,circle)=>{
        try{
            onChangeValue(value,circle);
        }catch (e) {
            console.log('Poorly defined onChange Function');
        }
    }

    const createSrc = ()=>{
        if(valueList === undefined || valueList.null || valueList.length<=0){
            valueDifference = valueDifference || 1;
            if(startValue!==undefined && endValue!==undefined){
                let temp = [];
                let count = (endValue-startValue)/valueDifference;
                for(let i = 0;i<=count;i++){
                    if(startValue<endValue)
                        temp.push((startValue + (valueDifference*i)).toString().padStart(textLength,'0'));
                    else if(startValue>endValue)
                        temp.push((startValue - (valueDifference*i)).toString().padStart(textLength,'0'));
                }
                setSrcList(temp);
            }
        }
    }
    useEffect(() => {
        Value();
    }, [srcList]);
    useEffect(() => {
        createSrc();
        Value();
        if(selectedIndex<srcList.length)
            setValue(srcList[selectedIndex]);
    }, [selectedIndex]);
    useEffect(() => {
        Value();
    }, [initialValue]);

    const handleOnIncrease = () =>{
        let newValue = selectedIndex+1;
        let circle = (newValue>=srcList.length)?1:0;
        newValue = (newValue>=srcList.length)?newValue%srcList.length:newValue;

        if(srcList.length>0)
            selectIndex(newValue);
        try{
            onIncrease(srcList[selectedIndex]);
        }catch (e) {}
        handleOnchange(parseInt(srcList[newValue]),circle);
    }
    const handleOnDecrease = ()=>{
        let newValue = selectedIndex-1;
        let circle = (newValue<0)?-1:0;
        newValue = (newValue<0)?(srcList.length+newValue)%srcList.length:newValue;

        if(srcList.length>0)
            selectIndex(newValue);
        try{
            onDecrease(srcList[selectedIndex]);
        }
        catch (e){

        }

        handleOnchange(parseInt(srcList[newValue]),circle);
    }
    const handleOnChangeValue = (e)=>{
        let newValue = 0;
        let text = e.target.value;
        if(textLength && textLength<text.length)
            text = text.substring(0,textLength);
        setValue(text);
        let temp = srcList.filter((item)=>item.toString().startsWith(text.toString().trim()))
        if(temp.length===1) newValue = srcList.indexOf(temp[0]);
        if(temp.length===0) {
            setValue(srcList[selectedIndex])
            newValue=selectedIndex;
        }

        handleOnchange(parseInt(srcList[newValue]),0);
    }
    const handleOnBlur=()=>{
        if(srcList.includes(value))
            selectIndex(Math.max(srcList.indexOf(value),0));
        setValue(srcList[selectedIndex]);
    }


    return(
        <div className='body-container'>
            <div className='value-rotator' onBlur={handleOnBlur}>
                <button  onClick={handleOnIncrease}>{`${srcList[(srcList.length+selectedIndex+1)%srcList.length]}`.padStart(textLength,'0')}</button>
                <input value={value} onChange={handleOnChangeValue}/>
                <button onClick={handleOnDecrease}>{`${srcList[(srcList.length+selectedIndex-1)%srcList.length]}`.padStart(textLength,'0')}</button>
            </div>
        </div>
    )
}
export const TimeFormat = {
    HOURS_AND_MINUTES_ONLY:'HH : MM',
    HOURS_AND_MINUTES_SECONDS_ONLY:'HH : MM : SS',
    MINUTE_SECONDS_ONLY:'MM : SS',
    SECONDS_AND_MILLISECONDS_ONLY:'SS . mmm',
    TIME_WITH_MILLISECONDS:'HH : MM : SS . mmm',

}
export const TimeType = {
    HOURS_24:24,
    HOURS_12:12,
}
const DigitalClock = ({value,timeType,timeFormat,OnChangeTime,onCancel})=>{

    let time = parseTime(value||'',timeType,timeFormat);
    timeType = timeType || TimeType.HOURS_12;
    timeFormat = timeFormat || TimeFormat.HOURS_AND_MINUTES_SECONDS_ONLY;

    const [selectedTime,selectTime] = useState(time || new Date());
    const [amToggleIndex,setAmPm] = useState(0);
    const handleChangeTime = () =>{
        try{
            OnChangeTime(selectedTime);
        }catch (e) {

        }
    }
    const handleOnCancel = ()=>{
        try {
            onCancel()
        }catch (e){
            console.log(e.toString());
        }
    }
    const getHours=(hours)=>{
        if(timeType === TimeType.HOURS_24){
            return parseInt(`${hours}`);
        }else{
            return (hours%12===0)?12:hours%12;
        }
    }

    useEffect(() => {
        if(timeType === TimeType.HOURS_12){
            selectTime(new Date(
                selectedTime.getFullYear(),
                selectedTime.getMonth(),
                selectedTime.getDate(),
                (selectedTime.getHours()===12)?
                    amToggleIndex*12:
                    selectedTime.getHours() + amToggleIndex*12,
                selectedTime.getMinutes(),
                selectedTime.getSeconds(),
                selectedTime.getMilliseconds()
            ));
        }
    }, [amToggleIndex]);
    useEffect(() => {
        time = parseTime(value,timeType,timeFormat);
        selectTime(time);
        if(time.getHours()>11 && time.getHours()<24) setAmPm(1);
        else if(time.getHours()<12 && time.getHours()>=0) setAmPm(0);
    }, [value]);
    const drawSelectors = ()=>{
        switch (timeFormat){
            case TimeFormat.HOURS_AND_MINUTES_SECONDS_ONLY:
                return(
                    <div className='body-container'>
                        <DrawRotator startValue={timeType===TimeType.HOURS_24?0:1} valueDifference={1} endValue={timeType===TimeType.HOURS_24?23:12}  textLength={2} initialValue={getHours(selectedTime.getHours())} onChangeValue={handleHour}/>
                        <div> : </div>
                        <DrawRotator startValue={0} valueDifference={1} endValue={59}  textLength={2} initialValue={selectedTime.getMinutes()} onChangeValue={handleMinute}/>
                        <div> : </div>
                        <DrawRotator startValue={0} valueDifference={1} endValue={59}  textLength={2} initialValue={selectedTime.getSeconds()} onChangeValue={handleSeconds}/>
                        {timeType===TimeType.HOURS_12?
                            <div className='toggle-switch'>
                                <div aria-selected={amToggleIndex===0} onClick={()=>setAmPm(0)}>AM</div>
                                <div aria-selected={amToggleIndex===1} onClick={()=>setAmPm(1)}>PM</div>
                            </div>
                            :''}
                    </div>
                )
        }
        return (
            <div>
                Your are an idiot.
            </div>
        );
    }

    const handleHour=(value,circle)=>{
        if(circle!==0 && timeType === TimeType.HOURS_12) setAmPm((amToggleIndex+1)%2);
        const date = new Date(selectedTime.getFullYear(),
            selectedTime.getMonth(),
            selectedTime.getDate(),
            value,
            selectedTime.getMinutes(),
            selectedTime.getSeconds(),
            selectedTime.getMilliseconds());
        selectTime(date);
    }
    const handleMinute=(value,circle)=> {
        const date = new Date(selectedTime.getFullYear(),
            selectedTime.getMonth(),
            selectedTime.getDate(),
            selectedTime.getHours()+circle,
            value,
            selectedTime.getSeconds(),
            selectedTime.getMilliseconds());
        selectTime(date);
    }
    const handleSeconds=(value,circle)=>{
        const date = new Date(selectedTime.getFullYear(),
            selectedTime.getMonth(),
            selectedTime.getDate(),
            selectedTime.getHours(),
            selectedTime.getMinutes()+circle,
            value,
            selectedTime.getMilliseconds());
        selectTime(date);
    }
    return(
        <div className={'popup'}>
            <div>
                <div className='calendar-header'>
                    Header
                </div>
                <div>
                    {drawSelectors()}
                </div>
            </div>
            <div className='bottom-action'>
                <TextButton text={'Cancel'} active={false} name={'cancel'} onClick={handleOnCancel}/>
                <TextButton text={'Set Time'} name={'submit'} active={true} onClick={handleChangeTime}/>
            </div>
        </div>
    )

}
const parseTime = (inputText,timeType,timeFormat) => {
    let hour = 0;
    let minute = 0;
    let seconds = 0
    let decimal = 0;

    if(inputText !== '' && inputText!==null){
        const am_pm = (timeType===TimeType.HOURS_12 && inputText.toString().endsWith(' PM'))?12:0;
        const parts = inputText.toString().split(' : ').map((part) => parseInt(part, 10));
        let fraction = parseInt(inputText.toString().split(' . ')[1]) || 0;
        if(parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2]) && timeFormat ===TimeFormat.HOURS_AND_MINUTES_SECONDS_ONLY){
            hour = parts[0] || 0;
            minute = parts[1] || 0; // Months are 0-indexed in JS Date objects
            seconds = parts[2] || 0;
            return new Date(0,0,0,hour+am_pm,minute,seconds,decimal);
        }
        if(parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && timeFormat ===TimeFormat.HOURS_AND_MINUTES_ONLY){
            hour = parts[0] || 0;
            minute = parts[1] || 0; // Months are 0-indexed in JS Date objects
            return new Date(0,0,0,hour+am_pm,minute,seconds,decimal);
        }
        if(parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && timeFormat ===TimeFormat.MINUTE_SECONDS_ONLY){
            minute = parts[0] || 0; // Months are 0-indexed in JS Date objects
            seconds = parts[1] || 0;
            return new Date(0,0,0,hour,minute,seconds,decimal);
        }
        if(parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2]) &&!isNaN(fraction) && timeFormat ===TimeFormat.TIME_WITH_MILLISECONDS){
            hour = parts[0] || 0;
            minute = parts[1] || 0; // Months are 0-indexed in JS Date objects
            seconds = parts[2] || 0;
            decimal = fraction || 0;
            return new Date(0,0,0,hour,minute,seconds,decimal);
        }
        if(parts.length === 1 && !isNaN(parts[0]) && !isNaN(fraction) && timeFormat ===TimeFormat.SECONDS_AND_MILLISECONDS_ONLY){
            seconds = parts[0] || 0;
            decimal = fraction || 0;
            return new Date(0,0,0,hour,minute,seconds,decimal);
        }
        if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
            hour = parts[0] || 0;
            minute = parts[1] || 0; // Months are 0-indexed in JS Date objects
            seconds = parts[2] || 0;
            return new Date(0,0,0,hour+am_pm,minute,seconds,0);
        }
    }
    return new Date();

};
const formatTime = (thisValue,timeType,timeFormat) =>{
    let am_pm = '';
    let formattedValue ='';

    switch (timeFormat) {
        case TimeFormat.HOURS_AND_MINUTES_SECONDS_ONLY:
            if(thisValue.trimEnd().endsWith('A')) am_pm=' A';
            if(thisValue.trimEnd().endsWith('P')) am_pm=' P';
            if(thisValue.trimEnd().endsWith('AM')) am_pm=' AM';
            if(thisValue.trimEnd().endsWith('PM')) am_pm=' PM';
            thisValue = thisValue.replace(/\D/g, '');
            if (thisValue.length >= 2) {
                formattedValue += thisValue.substring(0,2) + ' : ';
            } else {
                formattedValue = thisValue;
            }
            if (thisValue.length >= 4) {
                formattedValue += thisValue.substring(2, 4) + ' : ';
                formattedValue += thisValue.substring(4, 6);
            } else if (thisValue.length > 2) {
                formattedValue += thisValue.substring(2);
            }
            formattedValue += (timeType===TimeType.HOURS_12)?am_pm:'';
            return formattedValue;
        case TimeFormat.HOURS_AND_MINUTES_ONLY:
        case TimeFormat.MINUTE_SECONDS_ONLY:
            if(thisValue.trimEnd().endsWith('A')) am_pm=' A';
            if(thisValue.trimEnd().endsWith('P')) am_pm=' P';
            if(thisValue.trimEnd().endsWith('AM')) am_pm=' AM';
            if(thisValue.trimEnd().endsWith('PM')) am_pm=' PM';
            thisValue = thisValue.replace(/\D/g, '');
            if (thisValue.length >= 2) {
                formattedValue += thisValue.substring(0,2) + ' : ';
            } else {
                formattedValue = thisValue;
            }
            if (thisValue.length >= 4) {
                formattedValue += thisValue.substring(2, 4);
            } else if (thisValue.length > 2) {
                formattedValue += thisValue.substring(2);
            }
            formattedValue += (timeType===TimeType.HOURS_12)?am_pm:'';
            return formattedValue;
        case TimeFormat.TIME_WITH_MILLISECONDS:
            thisValue = thisValue.replace(/\D/g, '');
            if (thisValue.length >= 2) {
                formattedValue += thisValue.substring(0,2) + ' : ';
            } else {
                formattedValue = thisValue;
            }
            if (thisValue.length >= 4) {
                formattedValue += thisValue.substring(2, 4) + ' : ';
            } else if (thisValue.length > 2) {
                formattedValue += thisValue.substring(2);
            }
            if (thisValue.length >= 6) {
                formattedValue += thisValue.substring(4, 6) + ' . ';
                formattedValue += thisValue.substring(6, 9);
            } else if (thisValue.length > 4) {
                formattedValue += thisValue.substring(4);
            }
            formattedValue += am_pm;
            return formattedValue;
        case TimeFormat.SECONDS_AND_MILLISECONDS_ONLY:
            const digitPoint = thisValue.toString().indexOf('.');
            thisValue = thisValue.replace(/\D/g, '');
            if(digitPoint<0){
                if(thisValue.length>=2) formattedValue = thisValue.substring(0,2).padStart(2,'0')+ '.';
                else formattedValue = thisValue;
                if(thisValue.length>=6) formattedValue = thisValue.substring(0,2).padStart(2,'0')+ '.' +thisValue.substring(2,5).padStart(3,'0');
            }
            else{

                formattedValue = thisValue.substring(0,digitPoint).padStart(2,'0')+ '.' + String(thisValue.substring(digitPoint,digitPoint+3)).padStart(3,'0');
            }
            return formattedValue;
        case TimeFormat.DATE_TO_STRING:
            return thisValue;
        default:
            if(thisValue.trimEnd().endsWith('A')) am_pm=' A';
            if(thisValue.trimEnd().endsWith('P')) am_pm=' P';
            if(thisValue.trimEnd().endsWith('AM')) am_pm=' AM';
            if(thisValue.trimEnd().endsWith('PM')) am_pm=' PM';
            thisValue = thisValue.replace(/\D/g, '');
            if (thisValue.length >= 2) {
                formattedValue += thisValue.substring(0,2) + ' : ';
            } else {
                formattedValue = thisValue;
            }
            if (thisValue.length >= 4) {
                formattedValue += thisValue.substring(2, 4) + ' : ';
                formattedValue += thisValue.substring(4, 6);
            } else if (thisValue.length > 2) {
                formattedValue += thisValue.substring(2);
            }
            formattedValue += am_pm;
            return formattedValue;
    }
}
const TimeInputMask = ({name,value,timeType,timeFormat,OnChangeTime})=>{
    const [inputText,setInputText] = useState(value);
    timeFormat = (timeFormat===undefined || timeFormat===null)?TimeFormat.HOURS_AND_MINUTES_SECONDS_ONLY:timeFormat;
    timeType = (timeType===undefined || timeType===null)?TimeType.HOURS_24:timeType;
    let maxLength = 18;

    useEffect(() => {
        setInputText(value);
    }, [value]);
    const handleChange = (e)=>{
        let value = e.target.value;
        let formattedTime = formatTime(value,timeType,timeFormat);
        setInputText(formattedTime);
    }

    const handleBlur = () => {
        const time = parseTime(inputText,timeType,timeFormat);
        if(time!==null){
            let formattedTime = '';
            let hour=0;
            switch (timeFormat){
                case TimeFormat.HOURS_AND_MINUTES_SECONDS_ONLY:
                    hour = time.getHours()%timeType;
                    hour = (hour === 0 && timeType === TimeType.HOURS_12)?12:hour;
                    formattedTime = `${String(hour).padStart(2, '0')} : ${String(time.getMinutes()).padStart(2, '0')} : ${String(time.getSeconds()).padStart(2, '0')}`;
                    formattedTime+=(timeType === TimeType.HOURS_12) ? (time.getHours()>12)?' PM':' AM':'';
                    break;
                case TimeFormat.HOURS_AND_MINUTES_ONLY:
                    hour = time.getHours()%timeType;
                    hour = (hour === 0 && timeType === TimeType.HOURS_12)?12:hour;
                    formattedTime = `${String(hour).padStart(2, '0')} : ${String(time.getMinutes()).padStart(2, '0')}`;
                    formattedTime+=(timeType === TimeType.HOURS_12) ? (time.getHours()>12)?' PM':' AM':'';
                    break;
                case TimeFormat.MINUTE_SECONDS_ONLY:
                    formattedTime = `${String(time.getMinutes()).padStart(2, '0')} : ${String(time.getSeconds()).padStart(2, '0')}`;
                    break;
                case TimeFormat.TIME_WITH_MILLISECONDS:
                    formattedTime = `${String(time.getHours()).padStart(2, '0')} : ${String(time.getMinutes()).padStart(2, '0')} : ${String(time.getSeconds()).padStart(2, '0')} . ${String(time.getMilliseconds()).padStart(3,'0').substring(0,3)}`;
                    break;
                case TimeFormat.SECONDS_AND_MILLISECONDS_ONLY:
                    formattedTime = `${String(time.getSeconds()).padStart(2, '0')} . ${String(time.getMilliseconds()).padStart(3,'0').substring(0,3)}`;
                    break;
            }
            if (time) {
                try{
                    OnChangeTime(formattedTime,time);
                }catch (e) {

                }
                setInputText(formattedTime);
            }
        }
    };


    return(
        <input
            type='text'
            value={inputText}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={`${name} ${timeFormat}`}
            maxLength={maxLength}
        />
    )
}
export const TimePicker = ({is24Hours,name,onChangeTime,isHighlightTitle}) =>{
    const [time, setTime] = useState('');
    const [timeInDate,setTimeInDate] = useState(new Date())
    const [showClock, setShowClock] = useState(false);

    const inputRef = useRef(null);
    const clockRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            inputRef.current &&
            !inputRef.current.contains(event.target) &&
            clockRef.current &&
            !clockRef.current.contains(event.target)
        ) {
            setShowClock(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTimeChange = (selectedDate) => {
        setTimeInDate(selectedDate);
        let formattedTime = '';
        if(is24Hours)
            formattedTime = `${selectedDate.getHours()}`.padStart(2,'0') + ' : ' + `${selectedDate.getMinutes()}`.padStart(2,'0') + ' : ' + `${selectedDate.getSeconds()}`.padStart(2,'0');
        else {
            let hour = selectedDate.getHours()%12;
            formattedTime =`${(hour===0)?12:hour}`.padStart(2,'0');
            formattedTime += ' : ' + `${selectedDate.getMinutes()}`.padStart(2,'0') + ' : ' + `${selectedDate.getSeconds()}`.padStart(2,'0');
            formattedTime += (selectedDate.getHours()>=12)?' PM':' AM';
        }
        setTime(formattedTime);
        setShowClock(false);
        try{
            onChangeTime(selectedDate);
        }catch (e) {

        }

    };
    const toggleClock = () => {
        setShowClock((prev) => !prev);
    };
    const handleOnBlur = () =>{
        setShowClock(false);
    }

    return (
        <div className="input-field" aria-expanded={isHighlightTitle || false} ref={inputRef}>
            <div className="input-container">
                <TimeInputMask
                    name={name}
                    value={time}
                    timeFormat={TimeFormat.HOURS_AND_MINUTES_SECONDS_ONLY}
                    timeType={TimeType.HOURS_12}
                    is24Hours={is24Hours}
                    OnChangeTime={handleTimeChange} />

                <div>{name}</div>
                <button onClick={toggleClock}>{icon.clock}</button>
            </div>

            {showClock && (
                <div ref={clockRef}>
                    <DigitalClock
                        value={timeInDate}
                        timeType={is24Hours?TimeType.HOURS_24:TimeType.HOURS_12}
                        timeFormat={TimeFormat.HOURS_AND_MINUTES_SECONDS_ONLY}
                        OnChangeTime={handleTimeChange}/>
                </div>
            )}
        </div>
    );
}
