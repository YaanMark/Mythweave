import { fastify } from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyCsrf from '@fastify/csrf-protection';

export async function registerAuth(app: fastify) {
  // Cookies (encrypted)
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET ?? 'change-me-please-please-change-me-32chars!!', // should be 32+ chars
  });

  // Sessions stored in DB – placeholder, will use Drizzle DB plugin later
  await app.register(fastifySession, {
    cookieName: 'sid',
    secret: process.env.SESSION_SECRET ?? 'change-me-please-please-change-me-32chars!!',
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },
    // store: ??? – will plug DB store later
  });

  // CSRF protection for state‑changing routes
  await app.register(fastifyCsrf, {
    sessionKey: 'csrfToken',
  });
}
