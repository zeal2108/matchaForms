import { z } from "zod";

export const createFormInput = z.object({
  title: z.string().min(1).max(55).describe("Title of the form"),
  description: z.string().max(300).optional().describe("Description of the form"),
  createdBy: z.string().describe("UUID of the user creating the form"),
});

export type CreateFormInputType = z.infer<typeof createFormInput>;

export const createFormOutput = z.object({
  id: z.string().describe("UUID of the newly created form"),
  title: z.string().describe("Title of the form"),
  description: z.string().nullable().describe("Description of the form"),
  createdBy: z.string().nullable().describe("UUID of the user who created the form"),
  createdAt: z.date().describe("Timestamp when the form was created"),
  updatedAt: z.date().nullable().describe("Timestamp when the form was last updated"),
});

export type CreateFormOutputType = z.infer<typeof createFormOutput>;

export const getFormByIdInput = z.object({
  id: z.string().describe("UUID of the form"),
});

export type GetFormByIdInputType = z.infer<typeof getFormByIdInput>;

export const getFormByIdOutput = z.object({
  id: z.string().describe("UUID of the form"),
  title: z.string().describe("Title of the form"),
  description: z.string().nullable().describe("Description of the form"),
  createdBy: z.string().nullable().describe("UUID of the user who created the form"),
  createdAt: z.date().describe("Timestamp when the form was created"),
  updatedAt: z.date().nullable().describe("Timestamp when the form was last updated"),
});

export type GetFormByIdOutputType = z.infer<typeof getFormByIdOutput>;

export const getFormsByUserIdInput = z.object({
  userId: z.string().describe("UUID of the user"),
});

export type GetFormsByUserIdInputType = z.infer<typeof getFormsByUserIdInput>;

export const getFormsByUserIdOutput = z.array(
  z.object({
    id: z.string().describe("UUID of the form"),
    title: z.string().describe("Title of the form"),
    description: z.string().nullable().describe("Description of the form"),
    createdBy: z.string().nullable().describe("UUID of the user who created the form"),
    createdAt: z.date().describe("Timestamp when the form was created"),
    updatedAt: z.date().nullable().describe("Timestamp when the form was last updated"),
  }),
);

export type GetFormsByUserIdOutputType = z.infer<typeof getFormsByUserIdOutput>;
