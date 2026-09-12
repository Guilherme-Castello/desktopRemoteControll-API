import type { WebSocket } from 'ws'
import { WsMessage } from '../types/wsMessage'

export interface UserConnection {
    userId: string
    connectionId: string
    platform: string
    socket: WebSocket
}

export class ConnectionRegistry {
    private readonly connectionsByUser = new Map<
        string,
        Map<string, UserConnection>
    >()

    register(connection: UserConnection): void {
        if(connection.userId.length < 5){
            console.log("Register refused. Device: ", connection.platform + " ID length: ", connection.userId.length)


            const connectionErrorMessage: WsMessage = {
                messageType: "errorMessage",
                headers: {
                    platform: 'api',
                    userId: connection.userId
                },
                payload: {
                    message: "User ID must be bigger than 5 characters"
                }
            }

            connection.socket.send(JSON.stringify(connectionErrorMessage))
            connection.socket.close()
            return
        }

        const userConnections = this.connectionsByUser.get(connection.userId)

        if (userConnections) {
            userConnections.set(connection.connectionId, connection)
            return
        }

        this.connectionsByUser.set(
            connection.userId,
            new Map([[connection.connectionId, connection]])
        )
    }

    unregister(userId: string, connectionId: string): boolean {
        const userConnections = this.connectionsByUser.get(userId)

        if (!userConnections) {
            return false
        }

        const wasRemoved = userConnections.delete(connectionId)

        if (userConnections.size === 0) {
            this.connectionsByUser.delete(userId)
        }

        return wasRemoved
    }

    getUserConnections(userId: string): UserConnection[] {
        console.log(this.connectionsByUser.size)
        const userConnections = this.connectionsByUser.get(userId)

        if (!userConnections) {
            return []
        }

        return Array.from(userConnections.values())
    }
}
