import * as dotenv from 'dotenv';
import { httpServer } from './http_server';
import { createWebSocketServer } from './ws_server';

dotenv.config();

const HTTP_PORT = Number(process.env.HTTP_PORT) || 8181;
const WS_PORT = Number(process.env.WS_PORT) || 3000;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});

createWebSocketServer(WS_PORT);
