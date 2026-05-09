# Safe Social Login

A generic social-style access request page built with Next.js, Prisma, and a Neon PostgreSQL database.

This project intentionally does **not** impersonate Instagram or expose user passwords to moderators. Submitted passwords are hashed with bcrypt before being stored. Moderators can review identifiers and metadata from `/admin/moderation?token=<ADMIN_TOKEN>`.

## Setup

1. Copy `.env.example` to `.env`.
2. Add your Neon pooled `DATABASE_URL` with `sslmode=require`.
3. Optionally add `DIRECT_URL` for Prisma CLI operations; if omitted, the CLI falls back to `DATABASE_URL`.
4. Set a long random `ADMIN_TOKEN`.
5. Install dependencies:

   ```bash
   npm install
   ```

6. Create the database tables:

   ```bash
   npm run prisma:migrate
   ```

7. Deploy migrations in production before accepting signups:

   ```bash
   npm run prisma:deploy
   ```

8. Start development:

   ```bash
   npm run dev
   ```

## Security notes

- Never store plaintext passwords.
- Never ask users for credentials for a service you do not operate.
- Keep `.env` out of version control.
- Use a private, high-entropy `ADMIN_TOKEN` and rotate it regularly.

## Prisma 7 / Neon notes

Prisma 7 reads datasource URLs from `prisma.config.ts`, not from `prisma/schema.prisma`. The app also creates `PrismaClient` with `@prisma/adapter-neon`, which is required by Prisma 7 for direct database connections.

The production build script runs `prisma migrate deploy` before `next build` so Vercel can apply checked-in migrations, including the initial `SignupCredential` table migration. If you deploy from another platform, run `npm run prisma:deploy` once before users submit the signup form.
