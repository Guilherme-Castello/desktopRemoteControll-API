import express from 'express'
import http from 'node:http'
import createWebSocket from './websocket/websocket'
import { WebSocketGateway } from './websocket/WebSocketGateway'
import { ConnectionRegistry } from './websocket/ConnectionRegistry'
import helmet from 'helmet'
import type { WsMessage } from './types/wsMessage'

const app = express()

app.use(helmet())
app.use(express.json())

const server = http.createServer(app)

const wsServer = createWebSocket(server)

export const connectionRegistry = new ConnectionRegistry()
export const webSocketGateway = new WebSocketGateway(wsServer, connectionRegistry)

app.post('/messages/redirect', (request, response) => {
    const { userId, message } = request.body as {
        userId?: string
        message?: string
    }

    if (!userId || userId.length < 5 || typeof message !== 'string') {
        response.status(400).json({
            error: 'userId e message são obrigatórios'
        })
        return
    }

    const wsMessage: WsMessage = {
        messageType: 'mediaPlayPause',
        headers: {
            userId,
            platform: 'api'
        },
        payload: {
            message
        }
    }

    webSocketGateway.sendToUser(wsMessage)

    response.status(202).json({
        message: 'Mensagem encaminhada para as conexões WebSocket'
    })
})

const port = Number(process.env.PORT ?? 3000)

server.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`)
})
