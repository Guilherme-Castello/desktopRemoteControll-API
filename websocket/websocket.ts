import type { IncomingMessage, Server } from 'node:http'
import { WebSocket, WebSocketServer, type RawData } from 'ws'
import type { WsMessage } from '../types/wsMessage'
import { wsMessageHandler } from './handler'
import { connectionRegistry } from '../server'

function normalizeWsMessage(data: RawData): WsMessage {
    const normalizedData = data.toString()
    return JSON.parse(normalizedData) as WsMessage
}

function onConnect(ws: WebSocket, req: IncomingMessage): void {
    console.log("Connection Received successfuly! Hello World!")
    messageListener(ws, req)
    errorListener(ws, req)
}

function messageListener(ws: WebSocket, _req: IncomingMessage): void {
    ws.on('message', data => wsMessageHandler(normalizeWsMessage(data), ws))
}

function errorListener(ws: WebSocket, _req: IncomingMessage): void {
    ws.on('error', error => console.error(error))
}

export default function createWebSocket(server: Server): WebSocketServer {
    const wsServer = new WebSocketServer({
        server
    })

    wsServer.on("connection", (ws, req) => {
        onConnect(ws, req)
    })

    return wsServer
}
