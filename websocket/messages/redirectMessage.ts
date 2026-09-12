import { WsMessage } from "../../types/wsMessage"
import { webSocketGateway } from "../../server"

export default function redirectMessage(wsMessage: WsMessage){
    webSocketGateway.sendToUser(wsMessage)
    return
}
