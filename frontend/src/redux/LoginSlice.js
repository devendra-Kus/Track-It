import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name : "login-Slice",

    initialState:{
        token : null,
        login : false
    },

    reducers : {
        setUser : (state,action)=>{
           state.token= action.payload.token;
           state.login = action.payload.flag;
        }
    }
});

export const {setUser}= loginSlice.actions;
export default loginSlice.reducer;

 