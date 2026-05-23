import {
  createUserWithEmailInputModel,
  createUserWithEmailOutputModel,
  getLoggedInUserOutputModel,
  signInUserWithEmailInputModel,
  signInUserWithEmailOutputModel,
} from "./model";
import { userService } from "../../services";
import { publicProcedure, router } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { generatePath } from "../../utils/path-generator";
import { createAuthCookie, getAuthCookie } from "../../utils/cookie";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");
export const authRouter = router({
  createUserWithEmail: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createUserWithEmail"),
        tags: TAGS,
      },
    })
    .input(createUserWithEmailInputModel)
    .output(createUserWithEmailOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { fullName, email, password } = input;
      const { id, accessToken } = await userService.createUserWithEmail({
        fullName,
        email,
        password,
      });
      createAuthCookie(ctx, accessToken);
      return {
        id,
      };
    }),

  signInUserWithEmail: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/signInUserwithEmail"),
        tags: TAGS,
      },
    })
    .input(signInUserWithEmailInputModel)
    .output(signInUserWithEmailOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      try {
        const { signedInUserId, accessToken } = await userService.signInUserwithEmail({
          email,
          password,
        });
        createAuthCookie(ctx, accessToken);
        return {
          signedInUserId,
        };
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: error.message });
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),

  getLoggedInUser: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getLoggedInUser"),
        tags: TAGS,
      },
    })
    .output(getLoggedInUserOutputModel)
    .query(async ({ ctx }) => {
      const userToken = getAuthCookie(ctx);
      if (!userToken) throw new Error("user not logged in");
      const { id, email, fullName, emailVerified, profileImageUrl } =
        await userService.verifyAndFetchUser(userToken);
      if (!id || !email || !fullName) {
        throw new Error("User data is incomplete");
      }
      return {
        id,
        email,
        fullName,
        emailVerified,
        profileImageUrl,
      };
    }),

  //   getUserWithEmail: publicProcedure
  //     .meta({
  //       openapi: {
  //         method: "POST",
  //         path: getPath("/getUserWithEmail"),
  //         tags: TAGS,
  //       },
  //     })
  //     .input(getUserWithEmailInputModel)
  //     .output(getUserWithEmailOutputModel)
  //     .query(async ({ input }) => {
  //       const { email } = input;
  //       const user = await userService.getUserWithEmail(email);
  //       return user;
  //     }),
});
