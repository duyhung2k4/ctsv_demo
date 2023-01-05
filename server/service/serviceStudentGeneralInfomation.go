package service

import (
	database "ctsv/config"
	"ctsv/model"
	moduleAdmiGeneralInfomationStudent "ctsv/repository/module/admin/generalInformationStudent"
	"fmt"
)

func CreateGeneralInfomation(listStudentBaseInfo []model.StudentBaseInfo) error {

	db := database.Method
	create := db.Begin()

	moduleAdmiGeneralInfomationStudent.CreateOverViewStudent(create, listStudentBaseInfo)
	moduleAdmiGeneralInfomationStudent.CreateContactStudent(create, listStudentBaseInfo)
	moduleAdmiGeneralInfomationStudent.CreateAddressStudent(create, listStudentBaseInfo)
	moduleAdmiGeneralInfomationStudent.CreateBankStudent(create, listStudentBaseInfo)

	err := create.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
