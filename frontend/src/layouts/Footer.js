import React, { useState } from 'react'
import '../App.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import createUserMessage from '../js/index'


function Footer() {

    const [text, setText] = useState('')

    function handleRegister(e) {
        e.preventDefault()

        const data = {
            text
        }

        console.log(data)
        setText('')
        createUserMessage(text)
    }

    return (
        <div>
            <footer>
                <div>
                    <input type="text" id="input_box" value={text} onChange={e => setText(e.target.value)}/>
                    <button id="send_button" onClick={handleRegister}>
                        <svg width="30px" height="25px" viewBox="0 0 16 16" className="bi bi-arrow-right-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z" />
                            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z" />
                        </svg></button>
                </div>
            </footer>
        </div>
    )
}

export default Footer