import { WsMessage } from "../../types/wsMessage"
import { connectionRegistry } from "../../server"
import { type WebSocket } from "ws"

function getFormattedHeader(wsMessage: WsMessage) {

    if (!wsMessage.headers.userId || !wsMessage.headers.platform) {
        return
    }

    return {
        userId: wsMessage.headers.userId as string,
        platform: wsMessage.headers.platform as string
    }
}

export function debugUserConnections(wsMessage: WsMessage) {
    const header = getFormattedHeader(wsMessage)
    if(!header) return

    const userCons = connectionRegistry.getUserConnections(header?.userId)
    console.log(userCons.length)
}

export default function connectionMessage(wsMessage: WsMessage, ws: WebSocket) {
    const header = getFormattedHeader(wsMessage)
    if (header == undefined || header.userId == undefined) {
        return
    }
    connectionRegistry.register({
        userId: header.userId,
        platform: header.platform,
        connectionId: Math.random().toString(),
        socket: ws
    })
    return
}
