import { z } from "zod";

const phonePattern = /^\+?[1-9]\d{7,14}$/;
const usernamePattern = /^[a-zA-Z0-9._]{3,30}$/;

export const signupSchema = z.object({
  identifier: z.string().trim().min(3, "Enter an email, phone, or username.").max(254),
  password: z.string().min(12, "Use at least 12 characters.").max(128),
  displayName: z.string().trim().max(80).optional().or(z.literal("")),
});

export function classifyIdentifier(identifier: string) {
  if (z.string().email().safeParse(identifier).success) {
    return "EMAIL" as const;
  }

  const normalizedPhone = identifier.replace(/[\s().-]/g, "");
  if (phonePattern.test(normalizedPhone)) {
    return "PHONE" as const;
  }

  if (usernamePattern.test(identifier)) {
    return "USERNAME" as const;
  }

  return null;
}
