import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query"

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
    reducerPath: "api",
    tagTypes: [],
    endpoints: (build) => ({})
})

export const { } = api