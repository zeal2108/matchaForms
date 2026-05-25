import { z } from "zod";

export const createFormInputModel = z.object({
  title: z.string().min(1).max(55).describe("Title of the form"),
  description: z.string().max(300).optional().describe("Description of the form"),
});

export const createFormOutputModel = z.object({
  id: z.string().describe("UUID of the newly created form"),
  title: z.string().describe("Title of the form"),
  description: z.string().nullable().describe("Description of the form"),
  createdBy: z.string().nullable().describe("UUID of the user who created the form"),
  createdAt: z.date().describe("Timestamp when the form was created"),
  updatedAt: z.date().nullable().describe("Timestamp when the form was last updated"),
});

export const getFormByIdInputModel = z.object({
  id: z.string().describe("UUID of the form"),
});

export const getFormByIdOutputModel = z.object({
  id: z.string().describe("UUID of the form"),
  title: z.string().describe("Title of the form"),
  description: z.string().nullable().describe("Description of the form"),
  createdBy: z.string().nullable().describe("UUID of the user who created the form"),
  createdAt: z.date().describe("Timestamp when the form was created"),
  updatedAt: z.date().nullable().describe("Timestamp when the form was last updated"),
});

export const getFormsByUserIdOutputModel = z.array(
  z.object({
    id: z.string().describe("UUID of the form"),
    title: z.string().describe("Title of the form"),
    description: z.string().nullable().describe("Description of the form"),
    createdBy: z.string().nullable().describe("UUID of the user who created the form"),
    createdAt: z.date().describe("Timestamp when the form was created"),
    updatedAt: z.date().nullable().describe("Timestamp when the form was last updated"),
  }),
);

export const deleteFormInputModel = z.object({
  id: z.string().describe("UUID of the form to delete"),
});

export const deleteFormOutputModel = z.object({
  success: z.boolean().describe("Whether the form was successfully deleted"),
});

// Form Field Models
export const createFormFieldInputModel = z.object({
  formId: z.string().describe("UUID of the form this field belongs to"),
  label: z.string().min(1).max(100).describe("Label of the form field"),
  labelKey: z.string().min(1).max(100).describe("Key identifier for the label"),
  placeholder: z.string().optional().describe("Placeholder text for the input"),
  isRequired: z.boolean().default(false).describe("Whether the field is required"),
  index: z.string().describe("Index/order of the field in the form"),
  description: z.string().optional().describe("Description of the field"),
  type: z
    .enum(["TEXT", "NUMBER", "EMAIL", "YES_NO", "RADIO_SELECT"])
    .describe("Type of the form field"),
});

export const createFormFieldOutputModel = z.object({
  id: z.string().describe("UUID of the newly created form field"),
  formId: z.string().describe("UUID of the form this field belongs to"),
  label: z.string().describe("Label of the form field"),
  labelKey: z.string().describe("Key identifier for the label"),
  placeholder: z.string().nullable().describe("Placeholder text for the input"),
  isRequired: z.boolean().describe("Whether the field is required"),
  index: z.string().describe("Index/order of the field in the form"),
  description: z.string().nullable().describe("Description of the field"),
  type: z.string().describe("Type of the form field"),
  createdAt: z.date().describe("Timestamp when the field was created"),
  updatedAt: z.date().nullable().describe("Timestamp when the field was last updated"),
});
