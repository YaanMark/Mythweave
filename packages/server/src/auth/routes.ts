import { FastifyInstance } from 'fastify';
import { db } from '../db/index';
import { users, sessions } from '../db/schema';
import { z } from 'zod';
import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';

// Zod schemas
const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(1).max(100),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function registerAuthRoutes(app: FastifyInstance) {
  // Register
  app.post('/api/auth/register', async (req, reply) => {
    const parsed = RegisterSchema.parse(req.body);
    const existing = await db.select().from(users).where(eq(users.email, parsed.email));
    if (existing.length) {
      return reply.status(409).send({ error: 'Email already in use' });
    }
    const passwordHash = await bcrypt.hash(parsed.password, 10);
    const newUser = await db
      .insert(users)
      .values({
        email: parsed.email,
        passwordHash,
        displayName: parsed.displayName,
        emailVerified: false,
      })
      .returning();
    // TODO: send verification email
    return { id: newUser[0].id };
  });

  // Login
  app.post('/api/auth/login', async (req, reply) => {
    const parsed = LoginSchema.parse(req.body);
    const user = await db.select().from(users).where(eq(users.email, parsed.email));
    if (!user.length) {
      // generic error to avoid enumeration
      return reply.status(401).send({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(parsed.password, user[0].passwordHash);
    if (!valid) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }
    // create session
    const sessionId = randomBytes(24).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await db
      .insert(sessions)
      .values({
        id: sessionId,
        userId: user[0].id,
        expiresAt,
        revoked: false,
      });
    // set HttpOnly cookie
    reply
      .setCookie('sid', sessionId, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60,
      })
      .send({ success: true });
  });
}
