import { axiosInstance } from "@refinedev/simple-rest";
import { AuthOptions, Awaitable, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const provider = CredentialsProvider({
    name: "CredentialsSignIn",
    type: 'credentials',
    id: 'CredentialsSignIn',
    credentials: {
        email: {},
        password: {}
    },
    async authorize(credentials, req) {
        const email = credentials?.email
        const password = credentials?.password
        const response = await axiosInstance.post(`${process.env.API_URL}/api/v1/auth/authenticate`, {
            email, password
        })
        const data = response.data
        const user: Awaitable<User> = {
            id: data.id,
            name: data.name,
            email: data.email
        }
        return user
    },
})

export default provider