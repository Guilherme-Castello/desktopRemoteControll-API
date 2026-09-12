export type MessageType = "test" | "redirectMessage" | "mediaPlayPause" | "connectionMessage" | "debugUserConnections"

export type Payload = {
    message: string
    userId: string
}

export interface WsMessage {
    messageType: MessageType
    payload: Payload
    headers: {
        userId: string
        platform: string
    }
}