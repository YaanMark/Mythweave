// Server skeleton – Fastify + WebSocket
import Fastify from 'fastify';
import wsPlugin from '@fastify/websocket';
import { z } from 'zod';
import { registerAuth } from './auth/auth';
import { registerAuthRoutes } from './auth/routes';
import { loadUser } from './auth/loadUser';

const fastify = Fastify({ logger: true });

// Register authentication (cookies, session, csrf) and load user middleware
registerAuth(fastify);
loadUser(fastify);
// Register auth routes (register, login, etc.)
registerAuthRoutes(fastify);

// Simple schema for joining a room (for now)
const JoinRoomSchema = z.object({
  roomId: z.string(),
  playerId: z.string(),
  role: z.enum(['master', 'player']),
});

fastify.get('/health', async () => ({ status: 'ok' }));

fastify.get('/ws', { websocket: true }, (connection, req) => {
  // Accept connection, parse query params later
  console.log('WebSocket client connected');
  connection.socket.on('message', (msg) => {
    try {
      const data = JSON.parse(msg.toString());
      // For now just echo validated join
      if (data.type === 'join') {
        const parsed = JoinRoomSchema.parse(data.payload);
        console.log('Join room', parsed);
        connection.socket.send(JSON.stringify({ type: 'joined', payload: parsed }));
      }
    } catch (e) {
      connection.socket.send(JSON.stringify({ error: 'invalid message' }));
    }
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
    console.log('Server listening on 3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
