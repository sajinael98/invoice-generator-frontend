import CredentialsProvider from "@providers/credentials-provider";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
    pages: {
        signIn: '/login'
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
            session.expires = "2024-07-29T22:39:46.080Z"
            session.user = token;
            return session;
        },
    }
}

export default authOptions;
