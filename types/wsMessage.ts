export type MessageType = "test" | "redirectMessage" | "mediaPlayPause"

export type Payload = {
    message: string
}

export interface WsMessage {
    messageType: MessageType
    payload: Payload
}