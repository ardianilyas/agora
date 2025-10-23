import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 2,
    disableSessionRefresh: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false, // tidak bisa diubah user lewat API
        required: false,
      },
    },
  },
});