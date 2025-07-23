import { createSlice } from "@reduxjs/toolkit";

const attendenceSlice = createSlice({
    name : "at-slice",
    
    initialState:{
        list : []
    },
    reducers:{
       data : (state,action)=>{
        state.list = action.payload
       }
    }

})

export const {data} = attendenceSlice.actions;
export default attendenceSlice.reducer;