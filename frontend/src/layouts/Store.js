import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext()

const initState = {
    chat : [
        {from: 'bot', msg:'Hello!'},
        {from: 'user', msg: 'Hiiiiiii!'},
        {from: 'bot', msg:'How are you?'},
        {from: 'user', msg:"I'm fine, u?"}
    ]
}

function reducer(state, action) {
    const {from, msg, topic} = action.payload
    switch(action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {from, msg}
                ]
            }
        default:
            return state
    }
}

let socket;

export default function Store(props) {

    if(!socket) {
        socket = io(':3001')
    }

    const reduceHook = React.useReducer(reducer, initState)

    return (
        <CTX.Provider value={reduceHook}>
            {props.children}
        </CTX.Provider>
    )
}

