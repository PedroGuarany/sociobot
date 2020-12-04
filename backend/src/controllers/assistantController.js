const assistant = require('../services/watsonAssistant')
const { response } = require('express')

// função do assistant para diálogo 
async function dialog(text) {
  return new Promise((resolve, reject) => {
    assistant
      .messageStateless({
        assistantId: '97528bd9-407a-482f-bd94-0ed1584c0614',
        input: {
          'message_type': 'text',
          'text': text,
        }
      })
      .then(res => {
      let botAnswer = res.result.output.generic.map((res => {return res.text})) // retorna lista com respostas 
      resolve(botAnswer)
      })
    .catch(err => {
      console.log(err)
    })
  })
}