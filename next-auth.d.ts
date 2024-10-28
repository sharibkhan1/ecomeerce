import NextAuth, { type DefaultSession } from "next-auth"


// declare module "next-auth" {
//     interface Session {
//       user: {
//         role: "ADMIN" | "USER"
//       } & DefaultSession["user"]
//     }
//   }

//   import { JWT } from "next-auth/jwt"
 
// declare module "next-auth/jwt" {
//   interface JWT {
//     /** OpenID ID Token */
//     role?: "ADMIN" | "USER"
//   }
// }

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth:boolean;
};

declare module "next-auth"{
  interface Session{
    user: ExtendedUser;
  }
}