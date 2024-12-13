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
        employerUpdate: builder.mutation({
            query: (formData) => ({
                url: "/employerUpdate",
                method: "PUT",
                body: formData
            })
        }),
        employerLogout: builder.mutation({
            query: () => ({
                url: "/employerLogout",
                method: "GET"
            })
        }),
        //job manage
        employerViewJobs: builder.query({
            query: () => ({
                url: "/getAllJobs",
                method: "GET"
            }),
            providesTags: ['EmployerViewJobs'],
        }),
        jobUpdateDetails:builder.mutation({
            query:({id,inputData})=>({
                url:`/jobs/${id}`,
                method:"PUT",
                body:inputData
            }),
            invalidatesTags: ['EmployerViewJobs'],
        }),
        addNewJob:builder.mutation({
            query:(inputData)=>({
                url:"/jobPost",
                method:"POST",
                body:inputData
            }),
            invalidatesTags: ['EmployerViewJobs'],
        }),
        deleteJob:builder.mutation({
            query:(id)=>({
                url:`/jobs/${id}`,
                method:"DELETE",
                
            }),
            invalidatesTags: ['EmployerViewJobs'],
        })


    })
})

export const { useEmployerSignupMutation,
    useEmployerLoginMutation,
    useEmployerDashBoardQuery,
    useEmployerUpdateMutation,
    useEmployerLogoutMutation,
    useEmployerViewJobsQuery,
    useJobUpdateDetailsMutation,
    useAddNewJobMutation,
    useDeleteJobMutation
} = employerApi