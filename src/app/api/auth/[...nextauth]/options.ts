import CredentialsProvider from "@providers/credentials-provider";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    jwt: {
        maxAge: parseInt(process.env.NEXTAUTH_JWT_EXPIRATION as string)
    },
    providers: [CredentialsProvider],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user = token as any
            return session;
        },

    }
}

export default authOptions;
