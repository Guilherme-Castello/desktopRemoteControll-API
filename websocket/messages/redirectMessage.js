function redirectMessage(ws, payload){
    console.log(payload)
    ws.clients.forEach(client => {
        if(client.readyState === WebSocket.OPEN){
            client.send(JSON.stringify(payload))
        }
    })
    return
}

module.exports = redirectMessage