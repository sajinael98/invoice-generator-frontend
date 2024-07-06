import { axiosInstance } from "@refinedev/simple-rest";
import { getToken } from "next-auth/jwt";
import Options from '@app/api/auth/[...nextauth]/options'

axiosInstance.interceptors.request.use(async (config) => {
    console.log(">>>>>>>>>>>>>")
    const d = await getToken(Options as any)
    console.log(d)
    return config;
})
