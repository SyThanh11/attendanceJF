package settings

import (
	"attendanceJF/model"
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// database config const
var (
	hostname       = os.Getenv("DB_HOSTNAME")
	username       = os.Getenv("DB_USERNAME")
	port           = os.Getenv("DB_PORT")
	dbName         = os.Getenv("DB_NAME")
	dbPassword     = os.Getenv("DB_PASSWORD")
	SSLMode        = "prefer"
	ConnectTimeout = "10"
)

var db *gorm.DB

func GetDB() *gorm.DB {
	return db
}

func InitDB() {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s connect_timeout=%s",
		hostname, username, dbPassword, dbName, port, SSLMode, ConnectTimeout)

	var err error
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("can't connect to database")
	}

	migrateDB()
	initData()
}

// migrateDB will create table of all models in database by autoMigrate from Gorm
func migrateDB() {
	err := db.AutoMigrate(&model.Student{})
	if err != nil {
		panic("fail to migrate database")
	}
}

// initData will initial data if there is not record in db
func initData() {

}
