package familyrelationship

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func AdminUpdateSiBlings(listSiBlings []model.SiBlings) error {

	db := database.Method
	update := db.Begin()

	for _, siblings := range listSiBlings {
		update.Model(model.SiBlings{}).
			Where("base_info_id = ?", siblings.BaseInfoId).
			Updates(&siblings)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
