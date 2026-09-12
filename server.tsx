import http from 'node:http'
import createWebSocket from './websocket/websocket'
import { WebSocketGateway } from './websocket/WebSocketGateway'
import { ConnectionRegistry } from './websocket/ConnectionRegistry'

const server = http.createServer()

const wsServer = createWebSocket(server)

export const connectionRegistry = new ConnectionRegistry()
export const webSocketGateway = new WebSocketGateway(wsServer, connectionRegistry)

server.listen(3000, () => {
    console.log("Server running on port 3000")
})