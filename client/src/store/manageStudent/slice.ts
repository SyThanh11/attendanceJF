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
    isShowPrizes?: boolean[],
    displayStudent?: Student[]
}

const initialState: manageStudentState = {
    studentList: [],
    studentDetail: null,
    countStudent: 0,
    luckyList: [],
    studentPrize: [],
    isShowPrizes: [false, false, false, false],
    displayStudent: []
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
        removeStudentPrize: (state) => {
            state.studentPrize.pop()
        },
        setIsShowPrizes: (state, {payload}) => {
            const newIsShowPrizes = state.isShowPrizes.slice(); 
            newIsShowPrizes[Number(payload)] = true; 
            state.isShowPrizes = newIsShowPrizes; 
            console.log(state.isShowPrizes);
        },
        setDisplayStudent: (state, {payload}) => {
            state.displayStudent = payload
        },
        setCountStudent: (state, {payload}) => {
            state.countStudent = payload
        },
        increaseStudentCount: (state) => {
            state.countStudent++;
        },
        addStudentDisplay: (state, {payload}) => { 
            if(state.displayStudent.length < 5){
                state.displayStudent.unshift(payload);
            } else {
                state.displayStudent.unshift(payload);
                state.displayStudent.pop();
            }
        },
        getStudentPrize: (state) => { 
            const prizeKeys = ['PRIZE_3', 'PRIZE_2', 'PRIZE_1'];
            prizeKeys.forEach((key, index) => {
                const prize = localStorage.getItem(key);
                if (prize) {
                    state.studentPrize.push(JSON.parse(prize));
                    state.isShowPrizes[2-index] = true;
                }
            });
        }
    },
    extraReducers: (build) => {
        build.addCase(getStudentListThunk.fulfilled, (state, {payload}) => {
            state.studentList = payload.data;
            state.countStudent = payload.data.length;
        }).addCase(attendanceStudentThunk.fulfilled, (state, {payload}) => {
            state.studentDetail = payload.data
            if(payload.data.is_checkin && !payload.data.is_checkout){
                toast.success('Check in thành công');
            }
        }).addCase(attendanceStudentThunk.rejected, () => {
            toast.error('Scan Error!')
        }).addCase(getLuckyListThunk.fulfilled, (state, {payload}) => { 
            state.luckyList = payload.data
        })
    }
})

export const { reducer: manageStudentReducer, actions: manageStudentAction } = manageStudentSlice