import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
  pgEnum,
  unique,
} from "drizzle-orm/pg-core";
import { formsTable } from "./form";
import { Table } from "drizzle-orm";

export const fieldTypeEnum = pgEnum("field_type_enum", [
  "TEXT",
  "NUMBER",
  "EMAIL",
  "YES_NO",
  "RADIO_SELECT",
]);

export const formFieldsTable = pgTable(
  "form_fields",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    formId: uuid("form_id").references(() => formsTable.id),

    label: varchar("label", { length: 100 }).notNull(),
    labelKey: varchar("label_key", { length: 100 }).notNull(),

    placeholder: text("placeholder"),
    isRequired: boolean("is_required").default(false).notNull(),

    index: text("index").notNull(),

    description: text("description"),

    type: fieldTypeEnum("type").notNull(),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      uniqueFormIdAndIndex: unique().on(table.formId, table.index),
    };
  },
);

export type SelectFormField = typeof formFieldsTable.$inferSelect;
export type InsertFormField = typeof formFieldsTable.$inferInsert;
