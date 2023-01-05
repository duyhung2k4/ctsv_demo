package generalinformation

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func GetAllBank() ([]model.Bank, error) {

	db := database.Method

	var listBank []model.Bank

	err := db.Debug().
		Model(model.Bank{}).
		Preload("StudentBaseInfo").
		Find(&listBank).Error

	if err != nil {
		fmt.Println(err)
	}

	return listBank, err
}

func GetBankWithBaseInfoId(baseInfoId int) (model.Bank, error) {

	db := database.Method

	var bank model.Bank

	err := db.Debug().
		Model(model.Bank{}).
		Where("base_info_id = ?", baseInfoId).
		First(&bank).Error

	if err != nil {
		fmt.Println(err)
	}

	return bank, err
}
