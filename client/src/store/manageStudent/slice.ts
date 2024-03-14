import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

export const manageStudentSlice = createSlice({
    name: "manageStudent",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {}
})

export const { reducer: manageStudentReducer, actions: manageStudentAction } = manageStudentSlice