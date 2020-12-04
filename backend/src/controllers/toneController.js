const toneAnalyzer = require('../services/toneAnalyzer')
const connection = require('../database/connection')
const { request, response } = require('express')

function analyze(message){const toneParams = {
    toneInput: { 'text': message.text },
    contentType: 'application/json',
}

// função do toneAnalyzer
toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => {
        let analyze = toneAnalysis.result.document_tone.tones // variável de resultado dos tons
        analyze.forEach(tone => {  //for each para chamadas e análise dos dados
            
            //função que atualiza tons no bd
            create(tone)
        })
    })
    .catch(err => {
        console.log('error:', err)
    })
}

async function create(tone){
    const name = tone.tone_name
    const value = tone.score
    
    await connection('tones').insert({
        name,
        value
    })
    
    return response.json
}

module.exports = {
    async index(request, response){
        const tones = await connection('tones').select('*')

        return response.json(tones)
    },
    async update(request, response){
        analyze(request.body)
    }
}