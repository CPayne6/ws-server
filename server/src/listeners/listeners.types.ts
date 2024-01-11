import { Server, WebSocket } from 'ws'
import { IncomingMessage } from 'http'

export type Listener = (this: Server<typeof WebSocket, typeof IncomingMessage>, socket: WebSocket, request: IncomingMessage) => void