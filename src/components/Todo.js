import React, { useState } from 'react';
import './style.css';
import icon from "../icon/index";
import {InputField} from "./inputField/inputField";
import AddToDo from "./AddToDoForm/AddToDo";

const Todo = ({ todo, onDelete, onUpdate, onToggleCompletion }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title || '');
    const [isCompleted,setCompleted] = useState(todo.isCompleted?todo.isCompleted:false );
    const [description, setDescription] = useState(todo.description || '');
    const id = todo.id;
    const handleUpdate = () => {
        onUpdate({ ...todo, title, description });
        setIsEditing(false);
    };
    const handleToggleTask =()=>{
        setCompleted(!isCompleted);
        onToggleCompletion(isCompleted);
    }

    return (
        <div className='to-do-item'>
            <div className='to-do-header'>
                <input type='checkbox' checked={isCompleted} onChange={handleToggleTask}/>
                <div className='text-area'>
                    {isEditing?
                        <div>
                            <InputField type='text' className={'dark-input-field'} placeholder={'Title'} onChange={(e)=>setTitle(e.target.value)} value={title} name='title'/>
                        </div>
                        :title}
                </div>
                {isEditing?<button style={{borderRadius:'5px',textAlign:"center",color:'green',border:'green solid 1px'}} onClick={handleUpdate}>{icon.check}</button>:<button onClick={() => setIsEditing(!isEditing)}>{icon.edit}</button>}
                {isEditing?<button style={{borderRadius:'5px',textAlign:"center",color:'red',border:'red solid 1px'}} onClick={() => setIsEditing(!isEditing)}>{icon.cancel}</button>:<button onClick={() => onDelete(id)}>{icon.delete}</button>}
            </div>
            <div className='text-area'>
                {isEditing ? (
                        <div>
                            <InputField type='text' placeholder={'Description'} onChange={(e)=>setDescription(e.target.value)} value={description} name='description'/>
                        </div>
                ) : (
                    <div>
                        <p>{todo.description}</p>
                    </div>
                )}
            </div>
            <div></div>
        </div>
    );
};

export default Todo;
