package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {

	err_env := godotenv.Load()

	if err_env != nil {
		fmt.Println(err_env)
	}

	host := os.Getenv("HOST")
	port := os.Getenv("DB_PORT")
	pass := os.Getenv("DB_PASS")
	dbname := os.Getenv("DB_NAME")
	user := os.Getenv("USER")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai", host, user, pass, dbname, port)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println((err))
	}

	fmt.Println("Connect")

	return db
}

var Method *gorm.DB = Connect()
