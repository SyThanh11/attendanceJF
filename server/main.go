package main

import (
	"attendanceJF/handler"
	"attendanceJF/repository"
	"attendanceJF/settings"
	"attendanceJF/usecase"
	"github.com/gin-contrib/cors"
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

	// Configure CORS middleware
    router.Use(cors.New(cors.Config{
        AllowOrigins: []string{"http://localhost:3000"}, // Allow requests from localhost:3000
        AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders: []string{"Origin", "Content-Type"},
    }))

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
