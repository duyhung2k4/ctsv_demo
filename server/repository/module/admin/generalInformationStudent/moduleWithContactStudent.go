package generalinformationstudent

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"

	"gorm.io/gorm"
)

func CreateContactStudent(create *gorm.DB, listStudentBaseInfo []model.StudentBaseInfo) {

	for _, studentBaseInfo := range listStudentBaseInfo {

		var contactStudent model.Contact
		contactStudent.BaseInfoId = studentBaseInfo.Id

		if err := create.Model(model.Contact{}).
			Where("base_info_id = ?", contactStudent.BaseInfoId).
			First(&contactStudent).Error; err != nil {
			create.Model(model.Contact{}).
				Create(&contactStudent)
		}
	}
}

func UpdateContactStudent(listContact []model.Contact) error {

	db := database.Method
	update := db.Begin()

	for _, contact := range listContact {
		update.Model(model.Contact{}).
			Where("base_info_id = ?", contact.BaseInfoId).
			Updates(&contact)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
