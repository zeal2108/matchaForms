import { z } from "zod";

// export const getAuthenticationMethodOutputSchema = z.object({
//   provider: z.enum(["GOOGLE_OAUTH"]),
//   displayName: z.string().optional(),
//   displayText: z.string().optional(),
//   authUrl: z.string(),
// });
// export type GetAuthenticationMethodOutputSchema = z.infer<
//   typeof getAuthenticationMethodOutputSchema
// >;

// ezporting types for user creation service
export const createUserWithEmailInput = z.object({
  fullName: z.string().describe("Full name of the user"),
  email: z.email().describe("Email address of the user"),
  password: z.string().describe("Password of the user"),
});

export type CreateUserWithEmailInputType = z.infer<typeof createUserWithEmailInput>;

export const generateUserTokenPayload = z.object({
  id: z.string().describe("uuid of the user"),
});

export type GenerateUserTokenPayloadType = z.infer<typeof generateUserTokenPayload>;

export const signInUserwithEmailInput = z.object({
  email: z.string().describe("email of the user"),
  password: z.string().describe("password of the user "),
});

export type SignInUserwithEmailInputType = z.infer<typeof signInUserwithEmailInput>;
