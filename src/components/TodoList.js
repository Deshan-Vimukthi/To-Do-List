import React, {useEffect, useState} from "react";
import Todo from "../components/Todo";
import icon from "../icon";
import './style.css'
import AddToDo from "../components/AddToDoForm/AddToDo";
import {useAuth} from "../contexts/AuthContext";


const Todos= ()=>{

    const { user } = useAuth();  // Get the authenticated user
    const userId = (user && user.id) || '';      // Use user.id for saving and retrieving todos

    const getInitialTodos = () => {
        const savedTodos = localStorage.getItem(`todos_${userId}`);
        try {
            return savedTodos ? JSON.parse(savedTodos) : [];
        } catch (error) {
            console.error('Error parsing JSON from localStorage:', error);
            return [];
        }
    };

    const [todos, setTodos] = useState(getInitialTodos);
    const [isAddingToDo, setVisibleTodo] = useState(false);

    useEffect(() => {
        // Save todos as a JSON string in localStorage for this specific user
        localStorage.setItem(`todos_${userId}`, JSON.stringify(todos));
    }, [todos, userId]);

    const addToDo = ()=>{
        setVisibleTodo(true);
    }
    const onAddTodo=(title,description,date,startTime,endTime)=>{
        if(title && description && date && startTime && endTime){
            setTodos([...todos, { id: Date.now(), title: title, description: description, isCompleted: false,date:date,start:startTime,end:endTime }]);
        }
        else{
            if(title){
                alert('Enter Valid Description');
            } else if(description){
                alert('Enter Valid Title');
            } else {
                alert('Enter Valid Title and Description');
            }

        }
        setVisibleTodo(false);
    }
    const updateTodo = (updatedTodo) => {
        setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((item)=>item.id !== id));
    };

    const toggleTodoCompletion = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo));
    };

    return(
        <div className='to-do-list-container'>
            <div className='to-do-list-header'>
                <div>
                    To-Do List
                </div>
                <button onClick={addToDo}>{icon.create}</button>
            </div>
            <div className='to-do-list'>
                {todos.map((todo)=>(
                    <Todo todo={todo} onDelete={deleteTodo} onUpdate={updateTodo} onToggleCompletion={toggleTodoCompletion}/>
                ))}
            </div>
            <div>{isAddingToDo?<AddToDo onClose={()=>setVisibleTodo(false)} onSubmit={onAddTodo}/>:''}</div>
        </div>
    );
}

export default Todos;