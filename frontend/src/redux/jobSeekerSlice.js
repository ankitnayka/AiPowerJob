import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobSeeker: null,
    isAuthenticated: false,
};

const jobSeekerSlice = createSlice({
    name: "jobSeeker",
    initialState,
    reducers: {
        setJobSeeker: (state, action) => {
            state.jobSeeker = action.payload;
            state.isAuthenticated = true;
        },
        logoutJobSeeker: (state) => {
            state.jobSeeker = null;
            state.isAuthenticated = false;
        },
        
    },
});

export const { setJobSeeker, logoutJobSeeker } = jobSeekerSlice.actions;
export default jobSeekerSlice.reducer;
