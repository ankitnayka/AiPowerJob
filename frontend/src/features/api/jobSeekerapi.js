import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = "http://localhost:8000/api/v1/jobseeker/";

export const jobSeekerApi = createApi({
  reducerPath: 'jobSeekerApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  endpoints: (builder) => ({
    // Defining the mutation for job seeker registration
    registerJobseeker: builder.mutation({
      query: (inputData) => ({
        url: "signup",
        method: "POST",
        body: inputData,
      }),
    }),

    loginJobseeker: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
    }),

    getJobSeekerProfile: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
    }),

    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "updateprofile",
        method: "PUT",
        body: formData,
      }),
    }),

    // Corrected logout endpoint as a mutation
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
    }),
  }),
});

// Export the hooks to use the endpoints in your component
export const {
  useRegisterJobseekerMutation,
  useLoginJobseekerMutation,
  useUpdateProfileMutation,
  useGetJobSeekerProfileQuery,
  useLogoutMutation, // Updated hook
} = jobSeekerApi;
