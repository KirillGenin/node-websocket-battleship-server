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

export type RequestData = RequestDataReg | RequestDataAddUserToRoom | string;

export type RequestDataReg = {
  name: string;
  password: string;
};

export type RequestDataAddUserToRoom = {
  indexRoom: number;
};

/* RESPONSE */

export type ResponseData =
  | ResponseDataReg
  | ResponseDataWinners
  | ResponseDataUpdateRooms
  | ResponseDataCreateGame;

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
