package generalinformationstudent

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"

	"gorm.io/gorm"
)

func CreateAddressStudent(create *gorm.DB, listStudentBaseInfo []model.StudentBaseInfo) {

	for _, studentBaseInfo := range listStudentBaseInfo {

		var address model.Address
		address.BaseInfoId = studentBaseInfo.Id

		if err := create.Model(model.Address{}).
			Where("base_info_id = ?", address.BaseInfoId).
			First(&address).Error; err != nil {
			create.Model(model.Address{}).Create(&address)
		}
	}
}

func UpdateAddressStudent(listAddress []model.Address) error {

	db := database.Method
	update := db.Begin()

	for _, address := range listAddress {
		update.Model(model.Address{}).
			Where("base_info_id = ?", address.BaseInfoId).
			Updates(&address)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
