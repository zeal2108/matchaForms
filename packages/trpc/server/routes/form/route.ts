import {
  createFormInputModel,
  createFormOutputModel,
  getFormByIdInputModel,
  getFormByIdOutputModel,
  getFormsByUserIdOutputModel,
  deleteFormInputModel,
  deleteFormOutputModel,
  createFormFieldInputModel,
  createFormFieldOutputModel,
} from "./model";
import { formService, userService, formFieldService } from "../../services";
import { publicProcedure, router } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { generatePath } from "../../utils/path-generator";
import { getAuthCookie } from "../../utils/cookie";

const TAGS = ["Forms"];
const getPath = generatePath("/forms");

export const formRouter = router({
  createForm: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createForm"),
        tags: TAGS,
      },
    })
    .input(createFormInputModel)
    .output(createFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { title, description } = input;
      const userToken = getAuthCookie(ctx);

      if (!userToken) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User must be logged in to create a form",
        });
      }

      try {
        const { id } = await userService.verifyAndFetchUser(userToken); // This should come from context

        const form = await formService.createForm({
          title,
          description: description || undefined,
          createdBy: id,
        });

        return form;
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),

  getFormById: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getFormById"),
        tags: TAGS,
      },
    })
    .input(getFormByIdInputModel)
    .output(getFormByIdOutputModel)
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const form = await formService.getFormDetails(id);
        return form;
      } catch (error) {
        if (error instanceof Error && error.message.includes("does not exist")) {
          throw new TRPCError({ code: "NOT_FOUND", message: error.message });
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),

  getFormsByUserId: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getFormsByUserId"),
        tags: TAGS,
      },
    })
    .output(getFormsByUserIdOutputModel)
    .query(async ({ ctx }) => {
      const userToken = getAuthCookie(ctx);

      if (!userToken) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User must be logged in" });
      }

      try {
        const { id } = await userService.verifyAndFetchUser(userToken);
        const forms = await formService.getFormsByUserId(id);
        return forms;
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),

  deleteForm: publicProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: getPath("/deleteForm"),
        tags: TAGS,
      },
    })
    .input(deleteFormInputModel)
    .output(deleteFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      const userToken = getAuthCookie(ctx);

      if (!userToken) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User must be logged in" });
      }

      try {
        await formService.deleteForm(id);
        return { success: true };
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),

  createFormField: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createFormField"),
        tags: TAGS,
      },
    })
    .input(createFormFieldInputModel)
    .output(createFormFieldOutputModel)
    .mutation(async ({ input, ctx }) => {

      const { formId, label, labelKey, description, type, placeholder, isRequired, index, } = input
      const userToken = getAuthCookie(ctx);

      if (!userToken) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User must be logged in to create a form field",
        });
      }

      try {
        // const formId = await formService.getFormDetails()
        const parentId = await formService.getFormDetails(formId)
        
        const field = await formFieldService.createFormField({
          formId: input.formId,
          label: input.label,
          labelKey: input.labelKey,
          placeholder: input.placeholder,
          isRequired: input.isRequired,
          index: input.index,
          description: input.description,
          type: input.type,
        });

        return field;
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
