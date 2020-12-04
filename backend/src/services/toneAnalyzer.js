const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3')
const { IamAuthenticator } = require('ibm-watson/auth')

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2020-07-15',
  authenticator: new IamAuthenticator({
    apikey: 'aeMj0UdrOz4brg56tRtzO6PKCO2Co_EPX2mhwty-0mEB',
  }),
  url: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/7e09bcfd-1c60-4dba-ac93-e9ec31832f88',
  disableSslVerification: true,
})

module.exports = toneAnalyzer 