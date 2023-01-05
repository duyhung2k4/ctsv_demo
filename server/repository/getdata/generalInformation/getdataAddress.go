package generalinformation

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func GetAllAddress() ([]model.Address, error) {

	db := database.Method

	var listAddress []model.Address

	err := db.Debug().
		Model(model.Address{}).
		Preload("StudentBaseInfo").
		Find(&listAddress).Error

	if err != nil {
		fmt.Println(err)
	}

	return listAddress, err
}

func GetAddressWithBaseInfoId(baseInfoId int) (model.Address, error) {

	db := database.Method

	var address model.Address

	err := db.Debug().
		Model(model.Address{}).
		Where("base_info_id = ?", baseInfoId).
		First(&address).Error

	if err != nil {
		fmt.Println(err)
	}

	return address, err
}
