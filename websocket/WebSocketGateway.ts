import { WebSocketServer } from "ws"
import { WsMessage } from "../types/wsMessage"
import { ConnectionRegistry } from "./ConnectionRegistry"

export class WebSocketGateway {
  constructor(private readonly server: WebSocketServer, private readonly registry: ConnectionRegistry) { }

  sendToUser(message: WsMessage): void {
    const serializedMessage = JSON.stringify(message)

    const userConnections = this.registry.getUserConnections(message.payload.userId)

    userConnections.forEach(userCon => {
      console.log(userCon.connectionId)
      userCon.socket.send(serializedMessage)
    })
  }

  broadcast(message: WsMessage): void {
    const serializedMessage = JSON.stringify(message)

    this.server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(serializedMessage)
      }
    })
  }
}