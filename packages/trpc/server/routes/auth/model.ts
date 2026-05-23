import { z } from "zod";

export const createUserWithEmailInputModel = z.object({
  fullName: z.string().describe("Fullname of the user"),
  email: z.email().describe("Email address of the user"),
  password: z.string().describe("Raw Password of the user"),
});

export const createUserWithEmailOutputModel = z.object({
  id: z.string().describe("Id of the newly created user"),
});

export const signInUserWithEmailInputModel = z.object({
  email: z.email().describe("Email address of the user"),
  password: z.string().describe("Raw Password of the user"),
});

export const signInUserWithEmailOutputModel = z.object({
  signedInUserId: z.string().describe("Id of the newly created user"),
});

// this procedure does not need an input model
export const getLoggedInUserOutputModel = z.object({
  id: z.string().describe("uuid of the user"),
  email: z.email().describe("email of the user"),
  fullName: z.string().describe("full name of the user"),
  emailVerified: z.boolean().describe("user email verified or not").optional().nullable(),
  profileImageUrl: z.string().describe("Image of the user").optional().nullable(),
});

// export const getUserWithEmailInputModel = z.object({
//   email: z.email().describe("Email address of the user"),
// });

// export const getUserWithEmailOutputModel = z.object({
//   id: z.string().describe("uuid of the user"),
//   email: z.email().describe("email of the user"),
//   fullName: z.string().describe("full name of the user"),
//   emailVerified: z.boolean().describe("user email verified or not").optional().nullable(),
//   profileImageUrl: z.string().describe("Image of the user").optional().nullable(),
// });
