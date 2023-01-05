package familyrelationship

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"

	"gorm.io/gorm"
)

func CreateParentsOfStudent(create *gorm.DB, listBaseInfo []model.StudentBaseInfo) {

	for _, baseInfo := range listBaseInfo {

		father := model.Parents{
			BaseInfoId: baseInfo.Id,
			Gender:     true,
		}

		mother := model.Parents{
			BaseInfoId: baseInfo.Id,
			Gender:     false,
		}

		if err := create.Model(model.Parents{}).
			Where("base_info_id = ? AND gender = ?", father.BaseInfoId, father.Gender).
			First(&father).Error; err != nil {
			create.Model(model.Parents{}).Create(&father)
		}

		if err := create.Model(model.Parents{}).
			Where("base_info_id = ? AND gender = ?", mother.BaseInfoId, mother.Gender).
			First(&mother).Error; err != nil {
			create.Model(model.Parents{}).Create(&mother)
		}

	}
}

func AdminUpdateParents(listParent []model.Parents) error {

	db := database.Method
	update := db.Begin()

	for _, parent := range listParent {
		update.Model(model.Parents{}).
			Where("base_info_id = ?", parent.BaseInfoId).
			Updates(&parent)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
