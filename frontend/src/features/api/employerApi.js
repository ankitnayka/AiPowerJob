import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = "http://localhost:8000/api/v1/employer/";

export const employerApi = createApi({
    reducerPath: "employerApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
    endpoints: (builder) => ({
        employerSignup: builder.mutation({
            query: (inputData) => ({
                url: "employerSignup",
                method: "POST",
                body: inputData,
            })
        }),
        employerLogin: builder.mutation({
            query: (inputData) => ({
                url: "employerLogin",
                method: "POST",
                body: inputData,
            })
        }),
        employerDashBoard: builder.query({
            query: () => ({
                url: "employer",
                method: "GET",
            })
        }),
        employerUpdate:builder.mutation({
            query:(formData)=>({
                url:"/employerUpdate",
                method:"PUT",
                body:formData
            })
        })
    })
})

export const { useEmployerSignupMutation,
     useEmployerLoginMutation ,
    useEmployerDashBoardQuery,
    useEmployerUpdateMutation
    } = employerApi