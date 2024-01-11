import { customAlphabet } from 'nanoid'
const idAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const generateId = customAlphabet(idAlphabet, 20);

const lobbyAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const generateLobbyCode = customAlphabet(lobbyAlphabet, 6)
