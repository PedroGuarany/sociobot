import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import api from './services/api'

import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import ImageRobo from './img/robot.jpg'

import Store from './layouts/Store.js'
import DashBoard from './layouts/DashBoard.js'
/*
 Future imports
    
import Header from './layouts/Header'
import Main from './layouts/Main'
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'
import NavBarHeader from './layouts/NavBarHeader'
import NavBarFooter from './layouts/NavBarFooter' */

//Frontend App
function App() {


    const [text, setText] = useState('')
    let listMessage = []

    async function handleSubmit(e) {
        //e.preventDefault()

        const data = {
            text
        }

        createUserMessage(data.text)
        setText('')

        const messages = React.createElement('div', {}, listMessage)
        ReactDOM.render(messages, document.getElementById('chat'))

        if (data.text !== '') {
            sendTones(data)
            let botMessages = await getBotMessages(data)
            
            if (data.text === 'tones'){
                let tones = await getTones()
                alertTones(tones)
            }
            
            alertBotMessages(botMessages)

        }
    }

    //JS Functions

    function createUserMessage(message) {
        listMessage.push(React.createElement('div', { className: 'row no-gutters', key: listMessage.length + 1 },
            React.createElement('div', { className: 'col-md-3 offset-md-9' },
                React.createElement('div', { className: 'chat-bubble chat-bubble-right chat-bubble--right' }, message)
            ))
        )
    }

    //envia os tons para o banco de dados
    async function sendTones(data) {
        await api.post('tones', data)
    }

    //busca os tons do banco de dados
    async function getTones() {
        const toneResponse = await api.get('tones')
        return toneResponse.data
    }

    //busca mensagens do bot
    async function getBotMessages(data) {
        let botResponses = await api.post('assistant', data)
        return botResponses.data
    }

    //dá um alert nos tons em parâmetro
    function alertTones(tones) {
        function TonePattern(name, value) {
            return {
                name,
                value,
                getName() {
                    return name
                },
                getValue() {
                    return value
                },
                setValue(value) {
                    this.value = (this.value + value) / 2
                }
            }
        }

        let existingTones = []
        let userTones = []

        tones.forEach(tone => {
            if (existingTones.includes(tone.name)) {
                let existingObject = userTones.find(element => element.name === tone.name)
                existingObject.setValue(tone.value)
            }
            else {
                userTones.push(TonePattern(tone.name, tone.value))
                existingTones.push(tone.name)
            }
        })
        
        userTones.map(userTone => alert(`Tone: ${userTone.name}, Average Value: ${userTone.value.toFixed(3)}`))
    }

    //dá um alert nas mensagens em parãmetro
    function alertBotMessages(botMessages) {
        botMessages.forEach(message => {
            alert(`Bot: ${message}`)
        })
    }

   

    return (

        <>
        <div className="sections">
            <Store>
                <DashBoard />
            </Store>

            {/* 
                
            */}

            <header>
                <img className="profile-image" src={ImageRobo} alt="Profile"></img>
                <p>CareBot</p>
            </header>

            {/*</header>Send Message Area*/}
            <footer>
                <div>
                    <input type="text" id="input_box" placeholder='Type here...'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyUp={event => {
                            if (event.key === 'Enter') {
                                handleSubmit()
                            }
                        }}
                    ></input>
                    <button id="send_button" onClick={handleSubmit}>{`>`} </button>
                </div>
            </footer>


            {/* Sidebar*/}
            <div className="nav2">
                <div className="sidebar">
                    <ul>
                        <li>
                            <a href="home.html">
                                <button >
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-house-door" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z" />
                                        <path fillRule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                                    </svg>
                                </button>
                            </a>
                        </li>
                        <li>
                            <a href="#message">
                                <button>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chat-left-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        <path fillRule="evenodd" d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                </button>
                            </a>
                        </li>
                        <li>
                            <a href="#sobre_nos">
                                <button data-target="#modalAboutUs" data-toggle="modal" type="button">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-people" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.995-.944v-.002.002zM7.022 13h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zm7.973.056v-.002.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                                    </svg>
                                </button>
                            </a>
                        </li>
                        <li>
                            <a href="#recomendacoes">
                                <button data-target="#modalRec" data-toggle="modal" type="button">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-earmark-medical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 1h5v1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6h1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" />
                                        <path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 0 1 9 4.5z" />
                                        <path fillRule="evenodd" d="M7 4a.5.5 0 0 1 .5.5v.634l.549-.317a.5.5 0 1 1 .5.866L8 6l.549.317a.5.5 0 1 1-.5.866L7.5 6.866V7.5a.5.5 0 0 1-1 0v-.634l-.549.317a.5.5 0 1 1-.5-.866L6 6l-.549-.317a.5.5 0 0 1 .5-.866l.549.317V4.5A.5.5 0 0 1 7 4zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                </button>
                            </a>
                        </li>
                        <li>
                            <a href="#Tones">
                                <button data-target="#modalTones" data-toggle="modal" type="button">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-clipboard-data" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                        <path fillRule="evenodd" d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                        <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
                                    </svg>
                                </button>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sidebar nav3">
                <button className="">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-gear" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z" />
                        <path fillRule="evenodd" d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z" />
                    </svg>
                </button>
            </div>
            <nav className=""></nav>

            {/*  Modal About Us */}
            <div className="modal fade" id="modalAboutUs" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Sobre nós...</h5>
                        </div>
                        <div className="modal-body">
                            sobre nós...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>

            {/* Modal recommendation */}

            <div className="modal fade" id="modalRec" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Recomendações</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Recomendações...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Tones */}

            <div className="modal fade" id="modalTones" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Tones</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="tones">
                                <div className="tone">anger :</div>
                                <div className="tone">joy :</div>
                                <div className="tone">sadness :</div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default App
