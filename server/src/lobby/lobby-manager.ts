import { Lobby } from "./lobby";
import { generateLobbyCode } from '../nanoid'

export class LobbyManager {
  lobbies: Lobby[]

  constructor() {
    this.lobbies = []
  }

  createLobby(host: string) {
    const previousLobby = this.lobbies.find((lobby) => lobby.getHost() === host)
    if (previousLobby !== undefined) {
      throw new Error('Player already hosting lobby')
    }

    const code = generateLobbyCode()
    const lobby = new Lobby(code, host)
    this.lobbies.push(lobby)
    return code
  }

  removeHost(host: string) {
    const lobbyIndex = this.lobbies.findIndex((lobby) => lobby.getHost() === host)
    if (lobbyIndex === -1) return

    const lobby = this.lobbies[lobbyIndex]
    lobby.reassignHost()
    if(lobby.count() === 0){
      lobby.close()
      this.lobbies.splice(lobbyIndex)
    }
  }
}

export const lobbyManager = new LobbyManager()