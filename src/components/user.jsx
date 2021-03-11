import React, { useEffect, useState } from "react";

const TODO_URL = 'https://jsonplaceholder.typicode.com/todos?userId='

export default function User({ user, handleUpdateName }) {
    const { id } = user;
    const [isInline, setInline] = useState(true);
    const [name, setName] = useState(user.name);
    const [todoList, setTodoList] = useState([]);
    const [showTodoList, setShowTodoList] = useState(false);

    const loadTodoList = async () => {
        if (todoList.length === 0 ) {
            const response = await fetch(`${TODO_URL}${id}`).then(res => res.json());

            setTodoList([...response]);
        }

        setShowTodoList(!showTodoList);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setInline(true);
            handleUpdateName(user.id, name);
        }
    };

    return (
        <div style={{ marginLeft: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 18, marginBottom: 10 }}>
                <span
                    style={{ marginRight: 5, fontSize: 20, cursor: 'pointer' }}
                    onClick={() => loadTodoList()}
                >
                    {!showTodoList ? '+' : '-'}
                </span>
                <span>{'My name is '}</span>
                {isInline ? (
                    <span
                        style={{ fontWeight: 'bold' }}
                        onClick={() => setInline(!isInline)}
                    >
                        {user.name}
                    </span>
                ) : (
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                )}
                <span>{' and I am '}</span>
                <span style={{ fontWeight: 'bold' }}>{user.age}</span>
                <span>{' years old.'}</span>
            </div>
            {showTodoList && (
                <div style={{ marginLeft: 20 }}>
                    { todoList.map(todo => (
                        <div key={`${id}-${todo.id}`} style={{ margin: '8px 0'}}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                            />
                            <span style={{ marginLeft: 8, textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}