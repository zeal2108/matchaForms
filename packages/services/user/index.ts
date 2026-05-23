import { db, eq } from "@repo/database";
import JWT from "jsonwebtoken";
import { env } from "../env";
import { createHmac, randomBytes } from "node:crypto";
import { usersTable } from "@repo/database/schema";
import {
  type CreateUserWithEmailInputType,
  GenerateUserTokenPayloadType,
  SignInUserwithEmailInputType,
  createUserWithEmailInput,
  generateUserTokenPayload,
  signInUserwithEmailInput,
} from "./model";

class UserService {
  private async getUserByEmail(email: string) {
    try {
      const user = await db.select().from(usersTable).where(eq(usersTable.email, email));
      if (!user || user.length === 0) return null;
      return user[0];
    } catch (err) {
      console.error("RAW ERROR:", err); // <-- add this
      throw err;
    }
  }

  private async generateUserToken(payload: GenerateUserTokenPayloadType) {
    const { id } = await generateUserTokenPayload.parseAsync(payload);
    const token = JWT.sign({ id }, env.JWT_SECRET);
    return { token };
  }

  private verifyUserToken(token: string) {
    try {
      const verificationResult = JWT.verify(token, env.JWT_SECRET) as GenerateUserTokenPayloadType;
      return verificationResult;
    } catch (error) {
      throw new Error("Invalid Token");
    }
  }

  private async generateHashString(salt: string, toHash: string) {
    const hash = createHmac("sha256", salt).update(toHash).digest("hex");
    return hash;
  }

  private async getUserById(id: string) {
    const user = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        fullName: usersTable.fullName,
        emailVerified: usersTable.emailVerified,
        profileImageUrl: usersTable.profileImageUrl,
      })
      .from(usersTable)
      .where(eq(usersTable.id, id));

    const userMatch = user[0];
    if (!userMatch) throw new Error(`User with id:${id} does not exist`);
    return userMatch;
  }

  public async createUserWithEmail(payload: CreateUserWithEmailInputType) {
    const { fullName, email, password } = await createUserWithEmailInput.parseAsync(payload);

    const existingUser = await this.getUserByEmail(email);

    if (existingUser) throw new Error("user already exists");

    const salt = randomBytes(16).toString("hex"); // salt to hash the password
    const hash = await this.generateHashString(salt, password); // hashing the password
    const userInsertResult = await db
      .insert(usersTable)
      .values({ fullName, email, password: hash, salt })
      .returning({ id: usersTable.id });

    if (!userInsertResult || userInsertResult.length === 0 || !userInsertResult[0]?.id)
      throw new Error("something went wrong while creating user");
    const userId = userInsertResult[0].id;
    const { token } = await this.generateUserToken({ id: userId });
    return {
      accessToken: token,
      id: userId,
    };
  }

  public async signInUserwithEmail(payload: SignInUserwithEmailInputType) {
    const { email, password } = await signInUserwithEmailInput.parseAsync(payload);
    const existingUser = await this.getUserByEmail(email);

    if (!existingUser) throw new Error("user with this email does not exist");

    if (!existingUser.password || !existingUser.salt) throw new Error("Invalid auth method ");

    const hash = await this.generateHashString(existingUser.salt, password);

    if (hash !== existingUser.password) throw new Error("Invalid email address or password");

    const { token } = await this.generateUserToken({ id: existingUser.id });

    return {
      signedInUserId: existingUser.id,
      accessToken: token,
    };
  }

  public async verifyAndFetchUser(token: string) {
    const { id } = this.verifyUserToken(token);
    const userInfo = await this.getUserById(id);
    return { ...userInfo };
  }

  public async getUserWithEmail(email: string) {
    const user = await this.getUserByEmail(email);
    if (!user) throw new Error(`User with email: ${email} does not exist`);
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      emailVerified: user.emailVerified,
      profileImageUrl: user.profileImageUrl,
    };
  }
}
export default UserService;

// class UserService {
//   public async getAuthenticationMethods(): Promise<
//     ReadonlyArray<GetAuthenticationMethodOutputSchema>
//   > {
//     const supportedAuthenticationProviders: GetAuthenticationMethodOutputSchema[] = [];

//     const isGoogleConfigured = !!(env.GOOGLE_OAUTH_CLIENT_ID && env.GOOGLE_OAUTH_CLIENT_SECRET);

//     if (isGoogleConfigured) {
//       const url = googleOAuth2Client.generateAuthUrl();
//       supportedAuthenticationProviders.push({
//         provider: "GOOGLE_OAUTH",
//         displayName: "Google",
//         displayText: "Signin with Google",
//         authUrl: url,
//       });
//     }

//     return supportedAuthenticationProviders;
//   }
// }

// export default UserService;
