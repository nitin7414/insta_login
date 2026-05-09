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

6. Create or update the database tables:

   ```bash
   npm run prisma:push
   ```

7. Start development:

   ```bash
   npm run dev
   ```

## Vercel deployment

The `build` script runs:

```bash
prisma generate && prisma db push --skip-generate && next build
```

`prisma db push` is intentional here because a Neon database can be non-empty before this app is deployed. `prisma migrate deploy` fails with `P3005` when a schema is non-empty but has no Prisma migration history. `db push` safely creates the missing `SignupCredential` table for this small app without requiring you to reset or baseline the database.

If you prefer a strict migration-managed production flow later, keep the checked-in migration and baseline the existing database with Prisma before switching the build script back to `npm run prisma:deploy`.

## Security notes

- Never store plaintext passwords.
- Never ask users for credentials for a service you do not operate.
- Keep `.env` out of version control.
- Use a private, high-entropy `ADMIN_TOKEN` and rotate it regularly.

## Prisma 7 / Neon notes

Prisma 7 reads datasource URLs from `prisma.config.ts`, not from `prisma/schema.prisma`. The app also creates `PrismaClient` with `@prisma/adapter-neon`, which is required by Prisma 7 for direct database connections.
