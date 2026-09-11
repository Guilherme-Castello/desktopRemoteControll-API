const http = require('http')
const createWebSocket = require('./websocket/websocket')

const server = http.createServer()

createWebSocket(server)

server.listen(3000, () => {
    console.log("Server running on port 3000")
})