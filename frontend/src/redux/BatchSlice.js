import { createSlice } from "@reduxjs/toolkit";

const batchSlice = createSlice({
    name : "batch-Slice",

    initialState:{
      batchList : [],
    },
    reducers : {
        // Detail : (state,action)=>{
        //    state.batch= action.payload.batch;
        //    state.attendence =action.payload.attendence;
        //    state.user = action.payload.user;
        // }
       list : (state,action)=>{
         state.batchList = action.payload
       }
    }
})

export const { list } = batchSlice.actions;
export default batchSlice.reducer;