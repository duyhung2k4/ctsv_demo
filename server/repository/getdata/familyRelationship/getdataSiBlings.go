package familyrelationship

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func GetAllSiBlings() ([]model.SiBlings, error) {

	db := database.Method

	var listSiBling []model.SiBlings

	err := db.Debug().
		Model(model.SiBlings{}).
		Find(&listSiBling).Error

	if err != nil {
		fmt.Println(err)
	}

	return listSiBling, err
}

func GetSiBlingsWithBaseInfoId(baseInfoId int) ([]model.SiBlings, error) {

	db := database.Method

	var siblings []model.SiBlings

	err := db.Debug().
		Model(model.SiBlings{}).
		Where("base_info_id = ?", baseInfoId).
		Find(&siblings).Error

	if err != nil {
		fmt.Println(err)
	}

	return siblings, err
}
