# Safe Social Login

A generic social-style access request page built with Next.js, Prisma, and a Neon PostgreSQL database.

This project intentionally does **not** impersonate Instagram or expose user passwords to moderators. Submitted passwords are hashed with bcrypt before being stored. Moderators can review identifiers and metadata from `/admin/moderation?token=<ADMIN_TOKEN>`.

## Setup

1. Copy `.env.example` to `.env`.
2. Add your Neon `DATABASE_URL` with `sslmode=require`.
3. Set a long random `ADMIN_TOKEN`.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Create the database tables:

   ```bash
   npm run prisma:migrate
   ```

6. Start development:

   ```bash
   npm run dev
   ```

## Security notes

- Never store plaintext passwords.
- Never ask users for credentials for a service you do not operate.
- Keep `.env` out of version control.
- Use a private, high-entropy `ADMIN_TOKEN` and rotate it regularly.
