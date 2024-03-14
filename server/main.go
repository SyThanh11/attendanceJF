package main

import (
	"attendanceJF/settings"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		panic("fail to load .env file")
	}
	settings.InitDB()

}
