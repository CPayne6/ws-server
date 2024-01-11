import { WebSocketServer } from 'ws';
import { WsGroup } from './ws-base/group'

const wss = new WebSocketServer({
    port: 8080
}, () => console.log('WS server listening on port 8080'))

const sockets = WsGroup.new('Global')

wss.on('connection', (ws) => {
    ws.emit('message', 'Welcome to the server')
    ws.on('message', (data) => console.log(data))
    sockets.addMember(ws)
    sockets.send('New Group Member Added', ws)
})
