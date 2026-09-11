import { type WebSocketServer } from "ws"
import { Payload, WsMessage } from "../../types/wsMessage"

export default function redirectMessage(wsServer: WebSocketServer, wsMessage: WsMessage){
    console.log(wsMessage)
    wsServer.clients.forEach(client => {
        if(client.readyState === WebSocket.OPEN){
            client.send(JSON.stringify(wsMessage))
        }
    })
    return
}
