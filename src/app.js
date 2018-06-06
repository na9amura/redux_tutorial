import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
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

const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](
                    state[key],
                    action
                )
                return nextState
            },
            {}
        )
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

console.log('Current state:', store.getState());

const testAddTodo = () => {
    const stateBefore = []
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux',
    }
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false,
        }
    ]

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter)
}

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false,
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: false,
        },
    ]
    const action = {
        type: 'TOGGLE_TODO',
        id: 1,
    }
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false,
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: true,
        },
    ]

    deepFreeze(stateBefore)
    deepFreeze(stateAfter)

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter)
}

testAddTodo()
testToggleTodo()
console.log('test passed')
