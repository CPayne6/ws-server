import { off } from 'process'
import { WebSocket } from 'ws'

type BufferLike =
  | string
  | Buffer
  | DataView
  | number
  | ArrayBufferView
  | Uint8Array
  | ArrayBuffer

export class WsGroup {
  private members: Record<string, WebSocket>
  public readonly name: string

  constructor(name: string, members?: Record<string, WebSocket>) {
    this.members = {}
    this.name = name
    this.forEachMember((id, ws) => this.addMember(id, ws))
  }

  forEachMember(f: (id: string, ws: WebSocket) => void, members?: Record<string, WebSocket>) {
    const membersList = Object.entries(members ?? this.members)
    membersList.forEach(([id, ws]) => f(id, ws))
  }

  static new(name: string) {
    return new WsGroup(name, {})
  }

  getMembers() {
    return this.members
  }

  getMember(): [string, WebSocket] | undefined {
    return Object.entries(this.members)[0]
  }

  removeMember(id: string) {
    delete this.members[id]
  }

  /**
   * @throws Existing member
   * @param id 
   * @param ws 
   */
  addMember(id: string, ws: WebSocket) {
    if (this.members[id] !== undefined) {
      throw new Error('Unable to add exisiting member')
    }
    ws.on('close', (e: CloseEvent) => this.removeMember(id))
    this.members[id] = ws
  }

  /**
   * 
   * @param data 
   * @param ignore ws or id to ignore
   */
  send(data: BufferLike, ignore?: WebSocket | string) {
    this.forEachMember((id, ws) => (ws !== ignore && id !== ignore) ? ws.send(data) : undefined)
  }

  /**
   * 
   * @param eventName 
   * @param data 
   * @param ignore ws or id to ignore
   */
  emit(eventName: string, data: BufferLike, ignore?: WebSocket | string) {
    this.forEachMember((id, ws) => (ws !== ignore && id !== ignore) ? ws.emit(eventName, data) : undefined)
  }

  /** 
   * Same typing as ws.on
   */
  on(eventName: string, cb: (...args: any[]) => void) {
    this.forEachMember((id, ws) => ws.on(eventName, cb))
  }

  /**
   * Same typing as ws.once
   */
  once(eventName: string, cb: (...args: any[]) => void) {
    this.forEachMember((id, ws) => ws.once(eventName, cb))
  }

  /**
   * Same typing as ws.off
   */
  off(eventName: string, cb: (...args: any[]) => void) {
    this.forEachMember((id, ws) => ws.off(eventName, cb))
  }

  close(code?: number, data?: string | Buffer) {
    this.forEachMember((id, ws) => ws.close(code, data))
  }

  terminate() {
    this.forEachMember((id, ws) => ws.terminate())
  }

  pause() {
    this.forEachMember((id, ws) => ws.pause())
  }

  resume() {
    this.forEachMember((id, ws) => ws.resume())
  }
}

