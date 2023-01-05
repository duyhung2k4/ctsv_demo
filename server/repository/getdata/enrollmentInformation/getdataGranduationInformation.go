package enrollmentinformation

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func GetAllGranuationInformation() ([]model.GranduationInformation, error) {

	db := database.Method

	var listGranduationInformation []model.GranduationInformation

	err := db.Debug().
		Model(model.GranduationInformation{}).
		Preload("StudentBaseInfo").
		Find(&listGranduationInformation).Error

	if err != nil {
		fmt.Println(err)
	}

	return listGranduationInformation, err
}

func GetGranduationInformationWithBaseInfoId(baseInfoId int) (model.GranduationInformation, error) {

	db := database.Method

	var granduationInformation model.GranduationInformation

	err := db.Debug().
		Model(model.GranduationInformation{}).
		Where("base_info_id = ?", baseInfoId).
		Preload("StudentBaseInfo").
		First(&granduationInformation).Error

	if err != nil {
		fmt.Println(err)
	}

	return granduationInformation, err
}
