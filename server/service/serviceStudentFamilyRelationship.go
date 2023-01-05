package service

import (
	database "ctsv/config"
	"ctsv/model"
	moduleAdminFamilyRelationship "ctsv/repository/module/admin/familyRelationship"
	"fmt"
)

func CreateFamilyRelationship(listBaseInfo []model.StudentBaseInfo) error {

	db := database.Method
	create := db.Begin()

	moduleAdminFamilyRelationship.CreateParentsOfStudent(create, listBaseInfo)

	err := create.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
