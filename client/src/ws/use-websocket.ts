import { useMemo } from 'react'
import { WebSocket } from 'ws'

export const useWebsocket = (host: string | URL, initialize?: (ws: WebSocket) => void) => {
  const ws = useMemo(() => {
    const ws = new WebSocket(host)

    ws.on('close', () => {
      // Display disconnected from server message and redirect
    })
    initialize?.(ws)
    return ws
  }, [host, initialize])

  return {
    ws,
    loading: ws.readyState === ws.CONNECTING
  }
}