import http from 'node:http'
import createWebSocket from './websocket/websocket'

const server = http.createServer()

createWebSocket(server)

server.listen(3000, () => {
    console.log("Server running on port 3000")
})