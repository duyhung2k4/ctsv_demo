package main

import (
	database "ctsv/config"
	"ctsv/model"
	router "ctsv/router"
)

// @title           CTSV API
// @version         1.0
// @description     This is server of ctsv
// @host      localhost:3000
// @BasePath  /
func main() {

	db := database.Method

	db.AutoMigrate(
		model.Student{},
		model.Teacher{},
		model.StudentBaseInfo{},
		model.OverView{},
		model.Admin{},
		model.Contact{},
		model.Address{},
		model.Bank{},
		model.StudyScore{},
		model.GranduationInformation{},
		model.ResultsOfAnnouncement{},
		model.Parents{},
		model.SiBlings{},
		model.StudyScore{},
		model.CourseCode{},
		model.Class{},
		model.Attendance{},
	)
	router.Router()
}
