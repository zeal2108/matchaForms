import { db, eq } from "@repo/database";
import { formsTable, type SelectForm, type InsertForm } from "@repo/database/schema";
import {
  type CreateFormInputType,
  createFormInput,
  type CreateFormOutputType,
  type GetFormByIdInputType,
  type GetFormByIdOutputType,
  type GetFormsByUserIdInputType,
  type GetFormsByUserIdOutputType,
} from "./model";

class FormService {
  private async getFormById(id: string): Promise<SelectForm | null> {
    try {
      const form = await db.select().from(formsTable).where(eq(formsTable.id, id));
      const formMatch = form[0];
      if (!formMatch) throw new Error(`User with id:${id} does not exist`);
      return formMatch;
    } catch (err) {
      console.error("Error fetching form by ID:", err);
      throw err;
    }
  }

  public async createForm(payload: CreateFormInputType): Promise<CreateFormOutputType> {
    const { title, description, createdBy } = await createFormInput.parseAsync(payload);

    const formInsertResult = await db
      .insert(formsTable)
      .values({
        title,
        description: description || null,
        createdBy,
      })
      .returning();

    if (!formInsertResult || formInsertResult.length === 0 || !formInsertResult[0]?.id) {
      throw new Error("Something went wrong while creating form");
    }

    const createdForm = formInsertResult[0];
    return {
      id: createdForm.id,
      title: createdForm.title,
      description: createdForm.description,
      createdBy: createdForm.createdBy,
      createdAt: createdForm.createdAt || new Date(),
      updatedAt: createdForm.updatedAt,
    };
  }

  public async getFormDetails(id: string): Promise<GetFormByIdOutputType> {
    const form = await this.getFormById(id);
    if (!form) {
      throw new Error(`Form with id: ${id} does not exist`);
    }

    return {
      id: form.id,
      title: form.title,
      description: form.description || null,
      createdBy: form.createdBy || null,
      createdAt: form.createdAt || new Date(),
      updatedAt: form.updatedAt,
    };
  }

  public async getFormsByUserId(userId: string): Promise<GetFormsByUserIdOutputType> {
    try {
      const forms = await db.select().from(formsTable).where(eq(formsTable.createdBy, userId));

      return forms.map((form) => ({
        id: form.id,
        title: form.title,
        description: form.description || null,
        createdBy: form.createdBy || null,
        createdAt: form.createdAt || new Date(),
        updatedAt: form.updatedAt,
      }));
    } catch (err) {
      console.error("Error fetching forms by user ID:", err);
      throw err;
    }
  }

  public async deleteForm(id: string): Promise<void> {
    try {
      await db.delete(formsTable).where(eq(formsTable.id, id));
    } catch (err) {
      console.error("Error deleting form:", err);
      throw err;
    }
  }
}

export default FormService;
