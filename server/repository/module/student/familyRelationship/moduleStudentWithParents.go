package familyrelationship

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func StudentUpdateInfoParents(parents []model.Parents) error {

	db := database.Method
	update := db.Begin()

	for _, parent := range parents {
		update.Model(model.Parents{}).
			Where("base_info_id = ? AND gender = ?", parent.BaseInfoId, parent.Gender).
			Updates(&parent)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
