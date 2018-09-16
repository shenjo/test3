const ws = require("nodejs-websocket"),
    express = require('express');

const users = {};

const getConnName = conn => conn.path.substr(1);

const server = ws.createServer(function (conn) {
    const name = getConnName(conn);
    console.log(`now has connections :${server.connections.length}`);
    if (!name || users[name]) {
        conn.close(1000,'名字已被占用，请换个名字。');
    } else {
        users[name] = true;
        boardCast(`user ${name} 加入了聊天室`)
    }
    conn.on("text", function (str) {
        boardCast(`${name}: ${str}`)
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    });
    conn.on("error", function (err) {
        console.log("Connection error")
    });
}).listen(8001);

const boardCast = message => {
    server.connections.forEach(conn=>{
        conn.send(message)
    })
}

const app = express();

app.use(express.static('front'));

app.listen(3000);