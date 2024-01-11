import { WebSocket } from 'ws'
import { WsGroup } from '../ws-base'

export class Lobby {
  private group: WsGroup
  private host: string

  constructor(code: string, host: string){

  }

  getHost(){
    return this.host
  }

  reassignHost() {
    this.group.removeMember(this.host)
    this.host = ''
    const [newHost] = this.group.getMember() ?? []
    if(newHost) this.host = newHost
  }

  count() {
    return Object.entries(this.group).length
  }

  join(id: string, ws: WebSocket) {
    this.group.addMember(id, ws)
  }

  close() {
    this.group.terminate()
  }
}
