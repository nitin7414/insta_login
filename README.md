# Safe Social Login

A generic social-style access request page built with Next.js, Prisma, and a Neon PostgreSQL database.

This project intentionally does **not** impersonate Instagram or expose user passwords to moderators. Submitted passwords are hashed with bcrypt before being stored. Moderators can review identifiers and metadata from `/admin/moderation?token=<ADMIN_TOKEN>`.

## Setup

1. Copy `.env.example` to `.env`.
2. Add your Neon pooled `DATABASE_URL` with `sslmode=require`.
3. Optionally add a direct Neon `DIRECT_URL` for Prisma CLI commands such as migrations. If `DIRECT_URL` is omitted, Prisma falls back to `DATABASE_URL`.
4. Set a long random `ADMIN_TOKEN`.
5. Install dependencies:

   ```bash
   npm install
   ```

6. Create the database tables:

   ```bash
   npm run prisma:migrate
   ```

7. Start development:

   ```bash
   npm run dev
   ```

## Security notes

- Never store plaintext passwords.
- Never ask users for credentials for a service you do not operate.
- Keep `.env` out of version control.
- Use a private, high-entropy `ADMIN_TOKEN` and rotate it regularly.
- Prisma 7 keeps connection URLs in `prisma.config.ts`; the schema only declares the PostgreSQL provider.
