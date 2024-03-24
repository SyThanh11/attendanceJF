package main

import (
	"attendanceJF/handler"
	"attendanceJF/repository"
	"attendanceJF/settings"
	"attendanceJF/usecase"
	"fmt"
	"os"

	"github.com/gin-contrib/cors"

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
	
	connectionManager := handler.NewConnectionManager()
	go connectionManager.Start()

	router := gin.Default()

	// Configure CORS middleware
	domain := os.Getenv("DOMAIN")
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{domain}, // Allow requests from localhost:3000
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))

	api := router.Group("/api")
	{
		students := api.Group("/students")
		students.GET("/get-attendance-list", attendanceJFHandler.HTTPAPIHandler.GetAttendanceList)
		students.GET("/get-checkout-list", attendanceJFHandler.HTTPAPIHandler.GetCheckOutList)
		students.PUT("/checkin-out", func(c *gin.Context) {
			attendanceJFHandler.HTTPAPIHandler.HandleCheckInOut(c, connectionManager)
		})
		students.GET("/ws", func(c *gin.Context) {
			attendanceJFHandler.RealtimeHandler.CheckInRealtimeHandler(c, connectionManager)
		})
		students.GET("/get-lucky-list", attendanceJFHandler.HTTPAPIHandler.GetLuckyAttendeeList)
	}

	router.Run(":8080")
}
