import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

export const manageStudentSlice = createSlice({
    name: "manageStudent",
    initialState,
    reducers: {
        
    },
    extraReducers: () => {}
})

export const { reducer: manageStudentReducer, actions: manageStudentAction } = manageStudentSlice