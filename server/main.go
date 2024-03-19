package main

import (
	"attendanceJF/handler"
	"attendanceJF/repository"
	"attendanceJF/settings"
	"attendanceJF/usecase"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// gin.SetMode(gin.ReleaseMode)

	err := godotenv.Load()
	if err != nil {
		fmt.Print("fail to load .env file")
	}

	settings.InitDB()
	db := settings.GetDB()

	studentRepository := repository.NewStudentRepository(db)

	studentUsecase := usecase.NewStudentUsecase(studentRepository)

	attendanceJFHandler := handler.NewAttendanceJFHandler(studentUsecase)

	router := gin.Default()

	api := router.Group("/api")
	{
		students := api.Group("/students")
		students.GET("/get-attendance-list", attendanceJFHandler.GetAttendanceList)
		students.GET("/get-checkout-list", attendanceJFHandler.GetCheckOutList)
		students.PUT("/checkin-out/:id", attendanceJFHandler.HandleCheckInOut)
		students.GET("/get-lucky-list", attendanceJFHandler.GetLuckyAttendeeList)
	}

	router.Run(":8080")
}
