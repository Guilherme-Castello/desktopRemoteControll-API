export type MessageType = "errorMessage" | "mediaPlayPause" | "connectionMessage" | "debugUserConnections"

export type Payload = {
    message: string
}

export interface WsMessage {
    messageType: MessageType
    payload: Payload
    headers: {
        userId: string
        platform: string
    }
}