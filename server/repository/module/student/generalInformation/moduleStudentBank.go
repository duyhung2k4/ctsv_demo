package generalinformation

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func StudentUpdateBank(bank model.Bank) error {

	db := database.Method

	err := db.Debug().
		Model(model.Bank{}).
		Where("base_info_id = ?", bank.BaseInfoId).
		Updates(&bank).Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
