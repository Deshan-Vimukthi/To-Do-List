import React, {useEffect, useState} from "react";
import Todo from "../components/Todo";
import icon from "../icon";
import './style.css'
import AddToDo from "../components/AddToDoForm/AddToDo";
import {useAuth} from "../contexts/AuthContext";
import TodoList from "../components/TodoList";
import {months} from "../components/inputField/inputField";
import login from "./Login";


const Todos= ()=>{
    const { logout, user } = useAuth()
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    return(
        <div>
            <div className='to-do-list-page-header'>
                <div>
                    <div className='to-do-list-page-title'> Hey, {(user && user.name)?user.name:'User'}</div>
                    <div className='date-tag-container'>
                        <div className='date-tag'>{currentTime.getFullYear()} {months[currentTime.getMonth()]} {`${currentTime.getDate()}`.padStart(2,'0')}</div>`
                        <div className='date-tag'>{`${currentTime.getHours()}`.padStart(2,'0')} : {`${currentTime.getMinutes()}`.padStart(2,'0')}</div>
                    </div>
                </div>
                <button onClick={logout}>{icon.logout}</button>
            </div>
            <div className='to-do-list-holder'><TodoList/></div>
        </div>
    );
}

export default Todos;