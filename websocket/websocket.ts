import type { IncomingMessage, Server } from 'node:http'
import { WebSocket, WebSocketServer, type RawData } from 'ws'
import type { WsMessage } from '../types/wsMessage'
import { wsMessageHandler } from './handler'

function normalizeWsMessage(data: RawData): WsMessage {
    const normalizedData = data.toString()
    return JSON.parse(normalizedData) as WsMessage
}

function onConnect(wsServer: WebSocketServer, ws: WebSocket, req: IncomingMessage): void {
    console.log("Connection Received successfuly! Hello World!")
    messageListener(wsServer, ws, req)
    errorListener(ws, req)
}

function messageListener(wsServer: WebSocketServer, ws: WebSocket, _req: IncomingMessage): void {
    ws.on('message', data => wsMessageHandler(wsServer, normalizeWsMessage(data)))
}

function errorListener(ws: WebSocket, _req: IncomingMessage): void {
    ws.on('error', error => console.error(error))
}

export default function createWebSocket(server: Server): WebSocketServer {
    const wsServer = new WebSocketServer({
        server
    })

    wsServer.on("connection", (ws, req) => {
        onConnect(wsServer, ws, req)
    })

    return wsServer
}
