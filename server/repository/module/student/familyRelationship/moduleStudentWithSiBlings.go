package familyrelationship

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func StudentCreateSiBlings(siblings []model.SiBlings) error {

	db := database.Method
	create := db.Begin()

	if len(siblings) > 0 {
		create.Where("base_info_id = ?", siblings[0].BaseInfoId).Delete(&model.SiBlings{})
	}

	for _, sibling := range siblings {
		create.Model(model.SiBlings{}).Create(&sibling)
	}

	err := create.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}

func StudentDeleteSiBlings(siblings []model.SiBlings) error {

	db := database.Method
	delete := db.Begin()

	for _, sibling := range siblings {
		delete.Model(model.SiBlings{}).
			Where("base_info_id = ? AND name = ?", sibling.BaseInfoId, sibling.Name).
			Delete(&sibling)
	}

	err := delete.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
