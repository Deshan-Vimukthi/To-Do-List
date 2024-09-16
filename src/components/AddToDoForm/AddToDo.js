import React, {useState} from "react";
import icon from "../../icon";
import {DatePicker, InputField, TextButton, TimePicker} from "../inputField/inputField";
import './style.css';

const AddToDo = ({onSubmit,onClose}) =>{
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [startTime,setStartTime] = useState();
    const [endTime,setEndTime] = useState();
    const [date,setDate] = useState(new Date());

    const handleStartTime = (selectedTime,formattedTime)=>{
        setStartTime(formattedTime);
    }
    const handleEndTime = (selectedTime,formattedTime)=>{
        setEndTime(formattedTime);
    }
    const handleDate = (selectedDate,formattedDate)=>{
        setDate(formattedDate);
    }

    return(
        <div className='add-task-dialog'>
            <div className='form-head'>
                <div>ADD TO DO ITEM</div>
                <button onClick={onClose}>{icon.cancel}</button>
            </div>
            <div className='dialog-body'>
                <InputField name='title' type='text' value={title} placeholder='Title' onChange={(e)=>setTitle(e.target.value)}/>
                <InputField name='description' type='text' value={description} placeholder='Description' onChange={(e)=>setDescription(e.target.value)}/>
                <DatePicker name='Date' onChangeDate={handleDate}/>
                <TimePicker name='Start Time' is24Hours={false} onChangeTime={handleStartTime}/>
                <TimePicker name='End Time' is24Hours={false} onChangeTime={handleEndTime}/>
                <div>
                    <TextButton className={'button'} name='add' text={'Add Item'} icon={icon.create} onClick={()=>onSubmit(title,description,date,startTime,endTime)} active={true}/>
                </div>
            </div>

        </div>
    )
}

export default AddToDo;