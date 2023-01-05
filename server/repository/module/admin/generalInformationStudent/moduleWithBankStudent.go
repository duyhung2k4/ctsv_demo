package generalinformationstudent

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"

	"gorm.io/gorm"
)

func CreateBankStudent(create *gorm.DB, listStudentBaseInfo []model.StudentBaseInfo) {

	for _, studentBaseInfo := range listStudentBaseInfo {

		var bank model.Bank
		bank.BaseInfoId = studentBaseInfo.Id

		if err := create.Model(model.Bank{}).
			Where("base_info_id = ?", bank.BaseInfoId).
			First(&bank).Error; err != nil {
			create.Model(model.Bank{}).Create(&bank)
		}
	}
}

func UpdateBankStudent(listBank []model.Bank) error {

	db := database.Method
	update := db.Begin()

	for _, bank := range listBank {
		update.Model(model.Bank{}).
			Where("base_info_id = ?", bank.BaseInfoId).
			Updates(&bank)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
