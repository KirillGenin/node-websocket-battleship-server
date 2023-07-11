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

export interface RequestDataReg {
  name: string;
  password: string;
}

/* RESPONSE */

export interface ResponseDataReg {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

/* MODEL */

export interface Player {
  id: number;
  name: string;
  password: string;
}
