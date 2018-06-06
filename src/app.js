import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import expect from 'expect'
import deepFreeze from 'deep-freeze'

// todo reducer
const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false,
            }
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                  return state
            }

            return {
                ...state,
                completed: !state.completed
            }
        default:
            return state
    }
}

// todos reducer
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(state, action)
            ]
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action))
        default:
            return state
    }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

const todoApp = combineReducers({
    todos,
    visibilityFilter,
})

const store = createStore(todoApp)

store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
})

let nextTodoId = 0

class TodoApp extends React.Component {
    render() {
        return (
            <div>
                <input ref={node => { this.input = node }} />
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    })
                    this.input.value = ''
                }}>
                    Add Todo
                </button>
                <ul>
                    {this.props.todos.map(todo =>
                        <li key={todo.id}>
                            {todo.text}
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(
        <TodoApp
            todos={store.getState().todos}
        />,
        document.getElementById('root')
    )
}

store.subscribe(render)
render()
