import { WebSocket } from 'ws';

/* ENUM */

export enum GameEvent {
  REG = 'reg',
  UPDATE_WINNERS = 'update_winners',
  CREATE_ROOM = 'create_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  CREATE_GAME = 'create_game',
  UPDATE_ROOM = 'update_room',
  ADD_SHIPS = 'add_ships',
  START_GAME = 'start_game',
  ATTACK = 'attack',
  RANDOMATTACK = 'randomAttack',
  TURN = 'turn',
  FINISH = 'finish',
}

export enum ShipType {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  HUGE = 'huge',
}

export enum AttackStatus {
  MISS = 'miss',
  KILLED = 'killed',
  SHOT = 'shot',
}

/* REQUEST */

export interface RequestMessage {
  type: string;
  data: string;
}

export type RequestData =
  | RequestDataReg
  | RequestDataAddUserToRoom
  | RequestDataAddShips
  | RequestDataAttack
  | RequestDataRandomAttack
  | string;

export type RequestDataReg = {
  name: string;
  password: string;
};

export type RequestDataAddUserToRoom = {
  indexRoom: number;
};

export type RequestDataAddShips = {
  gameId: number;
  ships: InitShips;
  indexPlayer: number;
};

export type RequestDataAttack = {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
};

export type RequestDataRandomAttack = {
  gameId: number;
  indexPlayer: number;
};

/* RESPONSE */

export type ResponseData =
  | ResponseDataReg
  | ResponseDataWinners
  | ResponseDataUpdateRooms
  | ResponseDataCreateGame
  | ResponseDataStartGame
  | ResponseDataTurn
  | ResponseDataFinish;

export type ResponseDataReg = {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
};

export type ResponseDataWinner = {
  name: string;
  wins: number;
};

export type ResponseDataWinners = ResponseDataWinner[];

export type ResponseDataUpdateRoom = {
  roomId: number;
  roomUsers: {
    name: string;
    index: number;
  }[];
};

export type ResponseDataUpdateRooms = ResponseDataUpdateRoom[];

export type ResponseDataCreateGame = {
  idGame: number;
  idPlayer: number;
};

export type ResponseDataStartGame = {
  ships: InitShips;
  currentPlayerIndex: number;
};

export type ResponseDataTurn = {
  currentPlayer: number;
};

export type ResponseDataAttack = {
  position: {
    x: number;
    y: number;
  };
  currentPlayer: number;
  status: AttackStatus;
};

export type ResponseDataFinish = {
  winPlayer: number;
};

/* MODEL */

export interface Player {
  id: number;
  name: string;
  password: string;
  room: null | number;
}

export type Room = {
  ws: WebSocket;
  index: number;
  name: string;
};

export interface IWinners {
  [name: string]: number;
}

export type IGame = {
  currentPlayer: GamePlayerID | null;
  winPlayer: GamePlayerID | null;
  players: Map<GamePlayerID, GamePlayer>;
  initPlayerShips: Map<
    WebSocket,
    { playerID: GamePlayerID; initShips: InitShips }
  >;
};

export type GamePlayerID = number;

export type GamePlayer = {
  ws: WebSocket;
  ships: GamePlayerShips;
};

export type GamePlayerShips = GamePlayerShip[];

export type GamePlayerShip = {
  positions: ShipPositions;
  isKilled: boolean;
};

export type ShipPositions = ShipPosition[];

export type ShipPosition = {
  x: number;
  y: number;
  isHit: boolean;
};

export type InitShips = InitShip[];

export type InitShip = {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: ShipType;
};
