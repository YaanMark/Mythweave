import { FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';
import { db } from '../db/index';
import { sessions } from '../db/schema';

export async function registerSessionStore(app: FastifyInstance) {
  // Placeholder – could implement a custom FastifySession store using Drizzle.
  // For now we just ensure sessions table exists and rely on default in‑memory store.
}
