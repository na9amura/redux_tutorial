import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const counter = (state = 0, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

const store = createStore(counter)

const Counter = ({value, increment, decrement}) => (
    <div>
        <h1>{value}</h1>
        <button onClick={increment}> + </button>
        <button onClick={decrement}> - </button>
    </div>
)

const render = () => {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            increment={() => store.dispatch({ type: 'INCREMENT' })}
            decrement={() => store.dispatch({ type: 'DECREMENT' })}
        />,
        document.getElementById('root')
    )
}

store.subscribe(render)

render()
