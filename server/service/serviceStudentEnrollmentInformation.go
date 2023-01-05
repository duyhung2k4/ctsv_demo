package service

import (
	database "ctsv/config"
	"ctsv/model"
	moduleAdminWithEnrollmentinformation "ctsv/repository/module/admin/enrollmentInformation"
	"fmt"
)

func CreateEnrollmentInformation(listBaseInfo []model.StudentBaseInfo) error {

	db := database.Method
	create := db.Begin()

	moduleAdminWithEnrollmentinformation.CreateGranduationInformation(create, listBaseInfo)
	moduleAdminWithEnrollmentinformation.CreateResultsOfAnnouncement(create, listBaseInfo)

	err := create.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
