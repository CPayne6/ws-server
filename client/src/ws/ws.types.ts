import { PlayerData } from '../components/player/player.types'

export enum WsEvent {
    INIT = 'init',
    JOIN = 'join',
    START = 'start',
    KICK = 'kick'
}

export interface InitPayload {
    players: PlayerData[]
}

