package generalinformation

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func StudentUpdateOverView(overview model.OverView) error {

	db := database.Method

	err := db.Debug().
		Model(model.OverView{}).
		Where("base_info_id = ?", overview.BaseInfoId).
		Updates(&overview).Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
