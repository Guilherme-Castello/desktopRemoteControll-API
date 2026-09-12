import http from 'node:http'
import createWebSocket from './websocket/websocket'
import { WebSocketGateway } from './websocket/WebSocketGateway'
import { ConnectionRegistry } from './websocket/ConnectionRegistry'

const server = http.createServer()

const wsServer = createWebSocket(server)

export const connectionRegistry = new ConnectionRegistry()
export const webSocketGateway = new WebSocketGateway(wsServer, connectionRegistry)

const port = Number(process.env.PORT ?? 3000)

server.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`)
})
