import { FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';
import { db } from '../db/index';
import { sessions } from '../db/schema';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function authorize(action: string) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const user = (req as any).user;
    if (!user) {
      return reply.status(401).send({ error: 'Unauthenticated' });
    }
    // Simple deny‑by‑default policy – will be replaced by matrix lookup later
    const allowed = false; // placeholder
    if (!allowed) {
      return reply.status(403).send({ error: 'Forbidden' });
    }
  };
}
