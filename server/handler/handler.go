package handler

import "attendanceJF/usecase"

type HTTPAPIHandler struct {
	StudentUsecase usecase.StudentUsecase
}

func NewHTTPAPIHandler(
	studentUsecase usecase.StudentUsecase,
) *HTTPAPIHandler {
	return &HTTPAPIHandler{
		StudentUsecase: studentUsecase,
	}
}

type RealtimeHandler struct {
	studentUsecase usecase.StudentUsecase
}

func NewRealTimeHandler(
	studentUsecase usecase.StudentUsecase,
) *RealtimeHandler {
	return &RealtimeHandler{
		studentUsecase: studentUsecase,
	}
}

type AttendanceJFHandler struct {
	HTTPAPIHandler *HTTPAPIHandler
	RealtimeHandler *RealtimeHandler
}

func NewAttendanceJFHandler(
	studentUsecase usecase.StudentUsecase,
) *AttendanceJFHandler {
	return &AttendanceJFHandler{
		HTTPAPIHandler: NewHTTPAPIHandler(studentUsecase),
		RealtimeHandler: NewRealTimeHandler(studentUsecase),
	}
}
