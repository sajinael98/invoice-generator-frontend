import NextAuth from "next-auth/next";
import authOptions from "./options";

const handler = NextAuth(authOptions)
const auth = handler.auth
export { handler as GET, handler as POST, auth };
