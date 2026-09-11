import { type WebSocketServer } from 'ws'
import { MessageType, Payload, WsMessage } from '../types/wsMessage'
import redirectMessage from './messages/redirectMessage'

function getMessageType(wsMessage: WsMessage){
    return wsMessage.messageType
}

function shouldRedirectMessage(messageType: MessageType) {
    return ['redirectMessage', 'mediaPlayPause'].includes(messageType)
}

export function wsMessageHandler(wsServer: WebSocketServer, wsMessage: WsMessage){
    const messageType = getMessageType(wsMessage)

    if(shouldRedirectMessage(messageType)){
        redirectMessage(wsServer, wsMessage)
    }
}
