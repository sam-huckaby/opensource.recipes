import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's Beyond Identity ID. */
      id?: string,
      /** The user's email */
      email?: string,
    }
  }
}



