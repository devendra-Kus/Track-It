import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./LoginSlice";
import batchSlice from "./BatchSlice";
import attndenceSlice from "./AttendenceSlice"


const store = configureStore({reducer: {
     LoginToken : loginSlice,
     Batch : batchSlice,
     Atten : attndenceSlice

}});

export default store;