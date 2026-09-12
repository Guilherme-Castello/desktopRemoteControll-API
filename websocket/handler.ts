import { type WebSocketServer, type WebSocket } from 'ws'
import { MessageType, Payload, WsMessage } from '../types/wsMessage'
import redirectMessage from './messages/redirectMessage'
import connectionMessage, { debugUserConnections } from './messages/connectionMessage'

function getMessageType(wsMessage: WsMessage){
    return wsMessage.messageType
}

function shouldRedirectMessage(messageType: MessageType) {
    return ['redirectMessage', 'mediaPlayPause'].includes(messageType)
}

export function wsMessageHandler(wsMessage: WsMessage, ws?: WebSocket){
    const messageType = getMessageType(wsMessage)

    if(messageType === "connectionMessage" && ws){
        connectionMessage(wsMessage, ws)
    }

    if(messageType === "debugUserConnections" && ws) {
        debugUserConnections(wsMessage)
    }

    if(shouldRedirectMessage(messageType)){
        redirectMessage(wsMessage)
    }
}
