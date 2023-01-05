package enrollmentinformation

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"

	"gorm.io/gorm"
)

func CreateGranduationInformation(create *gorm.DB, listBaseInfo []model.StudentBaseInfo) {

	for _, baseInfo := range listBaseInfo {
		var granduationinformation model.GranduationInformation
		granduationinformation.BaseInfoId = baseInfo.Id

		if err := create.Model(model.GranduationInformation{}).
			Where("base_info_id = ?", granduationinformation.BaseInfoId).
			First(&granduationinformation).Error; err != nil {
			create.Model(model.GranduationInformation{}).
				Create(&granduationinformation)
		}
	}
}

func AdminUpdateGranduationInformation(listGranduationInformation []model.GranduationInformation) error {

	db := database.Method
	update := db.Begin()

	for _, granduation := range listGranduationInformation {
		update.Model(model.GranduationInformation{}).
			Where("base_info_id = ?", granduation.BaseInfoId).
			Updates(&granduation)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
