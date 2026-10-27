import { eq } from 'drizzle-orm';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { db } from '../db/index';
import { users, sessions } from '../db/schema';

export async function loadUser(app: FastifyInstance) {
  app.addHook('preHandler', async (req: FastifyRequest, reply: FastifyReply) => {
    const sessionId = req.cookies?.sid;
    if (!sessionId) {
      req.user = null;
      return;
    }
    const session = await db.select().from(sessions).where(eq(sessions.id, sessionId));
    if (!session.length || session[0].revoked || new Date(session[0].expiresAt) < new Date()) {
      req.user = null;
      return;
    }
    const user = await db.select().from(users).where(eq(users.id, session[0].userId));
    req.user = user[0] ?? null;
  });
}
