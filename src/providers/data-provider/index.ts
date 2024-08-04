"use client";

import { DataProvider } from "@refinedev/core";
import dataProviderSimpleRest, { axiosInstance } from "@refinedev/simple-rest";
import { getSession } from "next-auth/react";

axiosInstance.interceptors.request.use(async function (config) {
    const session = await getSession()
    const token = session?.user.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        config.headers["Access-Control-Allow-Origin"] = "*"
    }

    return config
})
export const api = axiosInstance

const backendUrl = "/backend-api/";
const simpleDataProvider = dataProviderSimpleRest(backendUrl, axiosInstance)

const dataProvider = (apiUrl: string): DataProvider => ({
    getApiUrl: () => apiUrl,
    getList: ({ resource, pagination, sorters, filters, meta }) => {
        const params = new URLSearchParams();
        if (pagination?.current) {
            params.append("page", pagination.current.toFixed());
        }
        if (pagination?.pageSize) {
            params.append("size", pagination?.pageSize.toFixed());
        }
        filters?.forEach((filter, index) => {
            params.append(`filter[${index}][field]`, (filter as any).field)
            params.append(`filter[${index}][operator]`, filter.operator)
            params.append(`filter[${index}][value]`, filter.value)
        })

        return axiosInstance.get(backendUrl + resource, { params }).then((res) => {
            return {
                data: res.data,
                total: res.headers['x-total-count']
            }
        })
    },
    create: (args) => simpleDataProvider.create(args),
    update: (arg) => simpleDataProvider.update(arg),
    deleteOne: (args) => simpleDataProvider.deleteOne(args),
    getOne: (args) => simpleDataProvider.getOne(args),
});

export const provider = dataProvider(backendUrl)