import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = "http://localhost:8000/api/v1/jobseeker/";

export const jobSeekerApi = createApi({
  reducerPath: 'jobSeekerApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }), // Use `baseUrl` instead of `BASE_URL`
  endpoints: (builder) => ({
    // Defining the mutation for job seeker registration
    registerJobseeker: builder.mutation({
      query: (inputData) => ({
        url: "signup",
        method: "POST",
        body: inputData,
      }),
    }),
  }),
});

// Export the hook to use the mutation in your component
export const {
  useRegisterJobseekerMutation,
} = jobSeekerApi;
