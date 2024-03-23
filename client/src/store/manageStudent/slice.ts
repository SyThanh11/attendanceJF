import { createSlice } from "@reduxjs/toolkit";
import { Student } from "constant";
import { attendanceStudentThunk, getLuckyListThunk, getStudentListThunk } from "./thunk";
import { toast } from "react-toastify";

type manageStudentState = {
    studentList?: Student[],
    studentDetail?: Student,
    countStudent?: number,
    luckyList?: Student[],
    studentPrize?: Student[],
    isShowPrizes?: boolean[]
}

const initialState: manageStudentState = {
    studentList: [],
    studentDetail: null,
    countStudent: 0,
    luckyList: [],
    studentPrize: [],
    isShowPrizes: [false, false, false]
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
        },
        setIsShowPrizes: (state, {payload}) => {
            const newIsShowPrizes = state.isShowPrizes.slice(); 
            newIsShowPrizes[Number(payload)] = true; 
            state.isShowPrizes = newIsShowPrizes; 
            console.log(state.isShowPrizes);
        }
    },
    extraReducers: (build) => {
        build.addCase(getStudentListThunk.fulfilled, (state, {payload}) => {
            state.studentList = payload.data;
            state.countStudent = payload.data.length;
        }).addCase(attendanceStudentThunk.fulfilled, (state, {payload}) => {
            state.studentDetail = payload.data
            toast.success('Thành công')
        }).addCase(attendanceStudentThunk.rejected, () => {
            toast.error('Bạn đã check out rồi!')
        }).addCase(getLuckyListThunk.fulfilled, (state, {payload}) => { 
            state.luckyList = payload.data
        })
    }
})

export const { reducer: manageStudentReducer, actions: manageStudentAction } = manageStudentSlice