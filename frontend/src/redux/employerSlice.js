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
        }
    }
})

export const {setEmployer}=employerSlice.actions
export default employerSlice.reducer