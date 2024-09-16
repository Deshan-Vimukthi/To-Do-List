import React, { useEffect, useState } from "react";
import Todo from "../components/Todo";
import icon from "../icon";
import './style.css';
import AddToDo from "../components/AddToDoForm/AddToDo";
import { useAuth } from "../contexts/AuthContext";

const Todos = () => {
    const { user } = useAuth();  // Get the authenticated user
    const userEmail = (user && user.email) || ''; // Use user.email for saving and retrieving todos

    const getInitialTodos = () => {
        // Retrieve todos from localStorage based on the user's email
        const savedTodos = localStorage.getItem(`todos_${userEmail}`);
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
        if (userEmail) {
            // Save todos as a JSON string in localStorage for this specific user
            localStorage.setItem(`todos_${userEmail}`, JSON.stringify(todos));
        }
    }, [todos, userEmail]);

    useEffect(() => {
        // Clear todos if the user changes
        setTodos(getInitialTodos());
    }, [userEmail]);

    const addToDo = () => {
        setVisibleTodo(true);
    }

    const onAddTodo = (title, description, date, startTime, endTime) => {
        if (title && description && date && startTime && endTime) {
            const newTodo = { id: Date.now(), title, description, isCompleted: false, date, start: startTime, end: endTime };
            setTodos([...todos, newTodo]);
        } else {
            alert('Please enter valid title, description, date, start time, and end time.');
        }
        setVisibleTodo(false);
    }

    const updateTodo = (updatedTodo) => {
        setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(item => item.id !== id));
    };

    const toggleTodoCompletion = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo));
    };

    return (
        <div className='to-do-list-container'>
            <div className='to-do-list-header'>
                <div>To-Do List</div>
                <button onClick={addToDo}>{icon.create}</button>
            </div>
            <div className='to-do-list'>
                {todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        onDelete={deleteTodo}
                        onUpdate={updateTodo}
                        onToggleCompletion={toggleTodoCompletion}
                    />
                ))}
            </div>
            <div>
                {isAddingToDo ? <AddToDo onClose={() => setVisibleTodo(false)} onSubmit={onAddTodo} /> : ''}
            </div>
        </div>
    );
}

export default Todos;
