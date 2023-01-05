package generalinformation

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func StudentUpdateAddress(address model.Address) error {

	db := database.Method

	err := db.Debug().
		Model(model.Address{}).
		Where("base_info_id = ?", address.BaseInfoId).
		Updates(&address).Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
