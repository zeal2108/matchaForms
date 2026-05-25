import { z } from "zod";

export const fieldTypeEnum = z.enum(["TEXT", "NUMBER", "EMAIL", "YES_NO", "RADIO_SELECT"]);

export const createFormFieldInput = z.object({
  formId: z.string().describe("UUID of the form this field belongs to"),
  label: z.string().min(1).max(100).describe("Label of the form field"),
  labelKey: z.string().min(1).max(100).describe("Key identifier for the label"),
  placeholder: z.string().optional().describe("Placeholder text for the input"),
  isRequired: z.boolean().default(false).describe("Whether the field is required"),
  index: z.string().describe("Index/order of the field in the form"),
  description: z.string().optional().describe("Description of the field"),
  type: fieldTypeEnum.describe("Type of the form field"),
});

export type CreateFormFieldInputType = z.infer<typeof createFormFieldInput>;

export const createFormFieldOutput = z.object({
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

export type CreateFormFieldOutputType = z.infer<typeof createFormFieldOutput>;

export const getFormFieldsByFormIdInput = z.object({
  formId: z.string().describe("UUID of the form"),
});

export type GetFormFieldsByFormIdInputType = z.infer<typeof getFormFieldsByFormIdInput>;

export const getFormFieldsByFormIdOutput = z.array(
  z.object({
    id: z.string().describe("UUID of the form field"),
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
  }),
);

export type GetFormFieldsByFormIdOutputType = z.infer<typeof getFormFieldsByFormIdOutput>;
