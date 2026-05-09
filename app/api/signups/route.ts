import { headers } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { classifyIdentifier, signupSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 400 },
    );
  }

  const identifierType = classifyIdentifier(parsed.data.identifier);
  if (!identifierType) {
    return NextResponse.json(
      { error: "Use a valid email address, phone number, or username." },
      { status: 400 },
    );
  }

  const requestHeaders = await headers();
  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  await prisma.signupCredential.create({
    data: {
      identifier: parsed.data.identifier,
      type: identifierType,
      passwordHash,
      displayName: parsed.data.displayName || null,
      ipAddress: requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
      userAgent: requestHeaders.get("user-agent"),
    },
  });

  return NextResponse.json({ ok: true });
}
