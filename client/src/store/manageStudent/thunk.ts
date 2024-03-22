import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageStudentService } from "service";


export const getStudentListThunk = createAsyncThunk('manageStudent/getStudentListThunk', async (_, {rejectWithValue}) => {
    try {
        const data = await manageStudentService.getListStudent();
        return data.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const attendanceStudentThunk = createAsyncThunk('manageStudent/attendanceStudentThunk', async (payload: {
    id: number
}, {rejectWithValue}) => {
    try {
        console.log(payload);
        await manageStudentService.attendanceStudent(payload);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getLuckyListThunk = createAsyncThunk('manageStudent/getLuckyListThunk', async (_, {rejectWithValue}) => {
    try {
        const data = await manageStudentService.getLuckyList();
        return data.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

