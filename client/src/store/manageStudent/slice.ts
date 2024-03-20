import { createSlice } from "@reduxjs/toolkit";
import { Student } from "constant";
import { attendanceStudentThunk, getStudentListThunk } from "./thunk";

type manageStudentState = {
    studentList: Student[],
}

const initialState: manageStudentState = {
    studentList: []
}

export const manageStudentSlice = createSlice({
    name: "manageStudent",
    initialState,
    reducers: {
        
    },
    extraReducers: (build) => {
        build.addCase(getStudentListThunk.fulfilled, (state, {payload}) => {
            state.studentList = payload.data;
        }).addCase(attendanceStudentThunk.fulfilled, (_, {payload}) => {
            console.log(payload);
            
        })
    }
})

export const { reducer: manageStudentReducer, actions: manageStudentAction } = manageStudentSlice