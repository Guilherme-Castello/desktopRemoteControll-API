const helloWorld = require('./messages/helloWorld')
const redirectMessage = require('./messages/redirectMessage')

function getMessageType(payload){
    return payload.messageType
}

function shouldRedirectMessage(messageType) {
    return ['redirectMessage', 'mediaPlayPause'].includes(messageType)
}

function wsMessageHandler(ws, payload){
    const messageType = getMessageType(payload)

    if(shouldRedirectMessage(messageType)){
        redirectMessage(ws, payload)
    }

    switch(messageType) {
        case 'test':
            helloWorld(ws)
    }
}

module.exports = { wsMessageHandler }