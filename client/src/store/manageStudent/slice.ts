import { createSlice } from "@reduxjs/toolkit";
import { Student } from "constant";
import { attendanceStudentThunk, getLuckyListThunk, getStudentListThunk } from "./thunk";
import { toast } from "react-toastify";

type manageStudentState = {
    studentList?: Student[],
    countStudent?: number,
    luckyList?: Student[],
    studentPrize?: Student[]
}

const initialState: manageStudentState = {
    studentList: [],
    countStudent: 0,
    luckyList: [],
    studentPrize: []
}

export const manageStudentSlice = createSlice({
    name: "manageStudent",
    initialState,
    reducers: {
        clearLuckyList: (state) => { 
            state.luckyList = [];
        },
        addStudentPrize: (state, {payload}) => {
            state.studentPrize.push(payload)
        }
    },
    extraReducers: (build) => {
        build.addCase(getStudentListThunk.fulfilled, (state, {payload}) => {
            state.studentList = payload.data;
            state.countStudent = payload.data.length;
        }).addCase(attendanceStudentThunk.fulfilled, () => {
            toast.success('Thành công')
        }).addCase(attendanceStudentThunk.rejected, () => {
            toast.error('Bạn đã check out rồi!')
        }).addCase(getLuckyListThunk.fulfilled, (state, {payload}) => { 
            state.luckyList = payload.data
        })
    }
})

export const { reducer: manageStudentReducer, actions: manageStudentAction } = manageStudentSlice