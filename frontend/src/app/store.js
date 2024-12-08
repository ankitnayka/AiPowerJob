import { configureStore } from "@reduxjs/toolkit";
// import jobSeekerReducer from '../redux/jobSeekerSlice.js'
import { jobSeekerApi } from "@/features/api/jobSeekerapi";



const store=configureStore({
    reducer:{
    
        [jobSeekerApi.reducerPath]:jobSeekerApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(jobSeekerApi.middleware),
})

export default store