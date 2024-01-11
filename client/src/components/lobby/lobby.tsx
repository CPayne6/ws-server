import { useState } from "react";
import { LobbyContainer } from "./lobby.styled";
import { InitPayload } from '../../ws/ws.types'
import { Player } from "../player/player";
import { PlayerData } from "../player/player.types";
import { useWebsocket } from "../../ws/use-websocket";

export interface LobbyProps {
  name: string;
  host: string;
  code: string;
}

export const Lobby = (props: LobbyProps) => {
  const { host, name } = props;
  const [players, setPlayers] = useState<PlayerData[]>([]);

  const { ws, loading } = useWebsocket(host, () => {
    ws.on("init", (data: InitPayload) => {
      setPlayers(data.players)
    });
    ws.on("join", (player) => {
      setPlayers((players) => [...players, player]);
    });
  });

  return loading ? (
    <p> Connecting to server </p>
  ) : ws.readyState === ws.OPEN ? (
    <></>
  ) : (
    <p> ERROR </p>
  );

  return (
    <LobbyContainer>
      {players.map((player) => (
        <Player name={player.name} color={player.color} />
      ))}
    </LobbyContainer>
  );
};
