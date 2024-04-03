import { users } from "@/lib/db/auth.schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { BaseStorage } from "@/lib/services/base";
import { newUserSchema, loginSchema } from "./schemas"
import { Scrypt } from "lucia";

const scrypt = new Scrypt();

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const userLoginSchema = insertUserSchema.pick({ email: true, password: true });

export type UserInsert = z.infer<typeof insertUserSchema>;
export type UserSelect = z.infer<typeof selectUserSchema>;

export class UserService extends BaseStorage {

  findUserByEmail = async (email: string) => {
    return this.db.select().from(users).where(eq(users.email, email));
  };

  signupUser = async (signup: z.infer<newUserSchema>) => {
    let result = newUserSchema.parse(signup);
    let user = await this.findUserByEmail(result.email);
    if (user.length) {
      throw new Error("User Exists")
    } else {
      const hash = await scrypt.hash(result.password);
      let new_user = await this.db.insert(users).values({
        email: result.email,
        password: hash
      });
      return { message: "user_created", id: new_user }
    }
  };

  loginUser = async (signin: z.infer<userLoginSchema>) => {
    let result = userLoginSchema.parse(signin);
    let matches = await this.db.select().from(users).where(eq(users.email, result.email))
    if (matches.length) {
      let { password, ...rest } = matches[0]
      const validPassword = await scrypt.verify(password, result.password);
      if (validPassword) {
        console.log(rest)
        return rest;
      }
      return null;
    }
    return null;
  };
}

