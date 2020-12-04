import React from 'react'

const main = document.querySelector('.chat-panel')
const sendButton = document.getElementById('send_button')
const input = document.getElementById('input_box')


// envia mensagem ao apertar botão
//sendButton.onclick = sendMessage(input.value)

// cria mensagem do usuário na interface

// cria mensagem do robô na interface
function createBotMessage(message) {
    // Div Inicial
    let newDivInic = document.createElement('div')

    newDivInic.classList.add('row')
    newDivInic.classList.add('no-gutters')

    // Div do Meio
    let newDivM = document.createElement('div')

    newDivM.classList.add('col-md-3')

    // Div final
    let newDiv = document.createElement('div')
    let newContent = document.createTextNode(message)
    newDiv.appendChild(newContent)

    newDiv.classList.add('chat-bubble')
    newDiv.classList.add('chat-bubble-left')
    newDiv.classList.add('chat-bubble--left')


    // Adicionando as divs
    newDivM.appendChild(newDiv)
    newDivInic.appendChild(newDivM)
    main.appendChild(newDivInic)
}

