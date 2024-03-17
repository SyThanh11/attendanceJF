package main

import (
	"attendanceJF/settings"
<<<<<<< Updated upstream
=======
	"attendanceJF/usecase"
	"fmt"
>>>>>>> Stashed changes

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Print("fail to load .env file")
	}
	settings.InitDB()

}
