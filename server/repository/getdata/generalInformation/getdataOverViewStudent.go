package generalinformation

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func GetAllOverViewStudent() ([]model.OverView, error) {

	db := database.Method

	var listOverViewStudent []model.OverView

	err := db.Debug().
		Model(model.OverView{}).
		Preload("StudentBaseInfo").
		Find(&listOverViewStudent).Error

	if err != nil {
		fmt.Println(err)
	}

	return listOverViewStudent, err
}

func GetOverViewByBaseInfoId(baseInfoId int) (model.OverView, error) {

	db := database.Method

	var overviewStudent model.OverView

	err := db.Debug().
		Model(model.OverView{}).
		Where("base_info_id = ?", baseInfoId).
		First(&overviewStudent).Error

	if err != nil {
		fmt.Println(err)
	}

	return overviewStudent, err
}
