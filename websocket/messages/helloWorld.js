function helloWorld(ws){
    console.log("Hello World!")
    ws.send("recebido")
    return
}

module.exports = helloWorld