package handler

import "attendanceJF/usecase"

type AttendanceJFHandler struct {
	StudentUsecase usecase.StudentUsecase
}

func NewAttendanceJFHandler(
	studentUsecase usecase.StudentUsecase,
) *AttendanceJFHandler {
	return &AttendanceJFHandler{
		StudentUsecase: studentUsecase,
	}
}