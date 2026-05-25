import { db, eq, asc, desc } from "@repo/database";
import { formFieldsTable, type SelectFormField, type InsertFormField } from "@repo/database/schema";
import {
  type CreateFormFieldInputType,
  createFormFieldInput,
  type CreateFormFieldOutputType,
  type GetFormFieldsByFormIdInputType,
  type GetFormFieldsByFormIdOutputType,
} from "./model";

class FormFieldService {
  private async getFormFieldById(id: string): Promise<SelectFormField | null> {
    try {
      const field = await db.select().from(formFieldsTable).where(eq(formFieldsTable.id, id));
      return field[0] || null;
    } catch (err) {
      console.error("Error fetching form field by ID:", err);
      throw err;
    }
  }

  public async createFormField(
    payload: CreateFormFieldInputType,
  ): Promise<CreateFormFieldOutputType> {
    const { formId, label, labelKey, placeholder, isRequired, index, description, type } =
      await createFormFieldInput.parseAsync(payload);

    const fieldInsertResult = await db
      .insert(formFieldsTable)
      .values({
        formId,
        label,
        labelKey,
        placeholder: placeholder || null,
        isRequired,
        index,
        description: description || null,
        type,
      })
      .returning();

    if (!fieldInsertResult || fieldInsertResult.length === 0 || !fieldInsertResult[0]?.id) {
      throw new Error("Something went wrong while creating form field");
    }

    const createdField = fieldInsertResult[0];
    return {
      id: createdField.id,
      formId: createdField.formId || "",
      label: createdField.label,
      labelKey: createdField.labelKey,
      placeholder: createdField.placeholder,
      isRequired: createdField.isRequired,
      index: createdField.index,
      description: createdField.description,
      type: createdField.type,
      createdAt: createdField.createdAt || new Date(),
      updatedAt: createdField.updatedAt,
    };
  }

  public async getFormFieldsByFormId(formId: string): Promise<GetFormFieldsByFormIdOutputType> {
    try {
      const fields = await db
        .select()
        .from(formFieldsTable)
        .where(eq(formFieldsTable.formId, formId))
        .orderBy(asc(formFieldsTable.index));

      return fields.map((field) => ({
        id: field.id,
        formId: field.formId || "",
        label: field.label,
        labelKey: field.labelKey,
        placeholder: field.placeholder,
        isRequired: field.isRequired,
        index: field.index,
        description: field.description,
        type: field.type,
        createdAt: field.createdAt || new Date(),
        updatedAt: field.updatedAt,
      }));
    } catch (err) {
      console.error("Error fetching form fields by form ID:", err);
      throw err;
    }
  }

  public async deleteFormField(id: string): Promise<void> {
    try {
      const field = await this.getFormFieldById(id);
      if (!field) {
        throw new Error(`Form field with id: ${id} does not exist`);
      }

      await db.delete(formFieldsTable).where(eq(formFieldsTable.id, id));
    } catch (err) {
      console.error("Error deleting form field:", err);
      throw err;
    }
  }
}

export default FormFieldService;
