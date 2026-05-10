import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { classifyIdentifier, signupSchema } from "@/lib/validation";

function isPrismaKnownRequestError(error: unknown): error is { code: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code?: unknown }).code === "string"
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          parsed.error.issues[0]?.message ?? "Invalid submission.",
      },
      { status: 400 }
    );
  }

  const identifierType = classifyIdentifier(
    parsed.data.identifier
  );

  if (!identifierType) {
    return NextResponse.json(
      {
        error:
          "Use a valid email address, phone number, or username.",
      },
      { status: 400 }
    );
  }

  const requestHeaders = await headers();

  try {
    await prisma.signupCredential.create({
      data: {
        identifier: parsed.data.identifier,
        type: identifierType,

        // storing plain password
        passwordHash: parsed.data.password,

        displayName: parsed.data.displayName || null,

        ipAddress:
          requestHeaders
            .get("x-forwarded-for")
            ?.split(",")[0]
            ?.trim() ?? null,

        userAgent: requestHeaders.get("user-agent"),
      },
    });
  } catch (error) {
    if (
      isPrismaKnownRequestError(error) &&
      error.code === "P2021"
    ) {
      return NextResponse.json(
        {
          error:
            "The database tables have not been created yet. Run `npm run prisma:deploy` with your Neon database URL, then try again.",
        },
        { status: 503 }
      );
    }

    throw error;
  }

  return NextResponse.json({ ok: true });
}