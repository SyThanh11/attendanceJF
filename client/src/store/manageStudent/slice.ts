import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Student } from "constant";
import { attendanceStudentThunk, getStudentListThunk } from "./thunk";

type manageStudentState = {
    studentList: Student[],
    countStudent: number
}

const initialState: manageStudentState = {
    studentList: [],
    countStudent: 0
}

export const manageStudentSlice = createSlice({
    name: "manageStudent",
    initialState,
    reducers: {
    },
    extraReducers: (build) => {
        build.addCase(getStudentListThunk.fulfilled, (state, {payload}) => {
            state.studentList = payload.data;
            state.countStudent = payload.data.length;
        }).addCase(attendanceStudentThunk.fulfilled, (_, {payload}) => {
            
        })
    }
})

export const { reducer: manageStudentReducer, actions: manageStudentAction } = manageStudentSlice