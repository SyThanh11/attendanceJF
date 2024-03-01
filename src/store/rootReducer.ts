import { combineReducers } from "@reduxjs/toolkit";
import { manageStudentReducer } from "./manageStudent/slice";

export const rootReducer = combineReducers({
    manageStudent: manageStudentReducer
})