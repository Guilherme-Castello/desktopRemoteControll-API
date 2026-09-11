const WebSocket = require('ws')
const { wsMessageHandler } = require('./handler')

function getPayload(data){
    const normalizedData = data.toString()
    return JSON.parse(normalizedData)
}

function onConnect(wss, ws, req) {
    console.log("Connection Received successfuly! Hello World!")
    messageListener(wss, ws, req)
    errorListener(ws, req)
}

function messageListener(wss, ws, req) {
    ws.on('message', data => wsMessageHandler(wss, getPayload(data)))
}

function errorListener(ws, req) {
    ws.on('error', data => console.error(data))
}

module.exports = (server) => {
    const wss = new WebSocket.Server({
        server
    })

    wss.on("connection", (ws, req) => {
        onConnect(wss, ws, req)
    })

    return wss
}