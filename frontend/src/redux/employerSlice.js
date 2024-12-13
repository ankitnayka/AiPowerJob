import { createSlice } from "@reduxjs/toolkit";

const initialState={
    employer:null,
    isAuthenticated:false
}


const employerSlice=createSlice({
    name:"employer",
    initialState,
    reducers:{
        setEmployer:(state,action)=>{
            state.employer=action.payload,
            state.isAuthenticated = true;
        },
        logoutEmployer:(state,action)=>{
            state.employer=null,
            state.isAuthenticated = false;
        }
    }
})

export const {setEmployer,logoutEmployer}=employerSlice.actions
export default employerSlice.reducer