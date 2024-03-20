import { apiInstance } from "constant";

const api = apiInstance({
    baseURL: import.meta.env.VITE_MANAGE_STUDENT_API
})

export const manageStudentService = {
    getListStudent: () => api.get('/get-attendance-list'),
    attendanceStudent: (payload: string) => api.put('/attendance-push', payload)
}