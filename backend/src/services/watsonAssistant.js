const AssistantV2 = require('ibm-watson/assistant/v2')
const { IamAuthenticator } = require('ibm-watson/auth')

const assistant = new AssistantV2({
  version: '2020-07-15',
  authenticator: new IamAuthenticator({
    apikey: 'ENQS1pYaM8vKbEoKmykP68ZiODiNZ1oWRTx29yBOx9pk',
  }),
  url: 'https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/98711dc9-f1d2-46a7-b73f-260f6162ad5f',
})

module.exports = assistant