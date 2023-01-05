package familyrelationship

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func GetAllInfoParents(gender bool) ([]model.Parents, error) {

	db := database.Method

	var listParent []model.Parents

	err := db.Debug().
		Model(model.Parents{}).
		Where("gender = ?", gender).
		Find(&listParent).Error

	if err != nil {
		fmt.Println(err)
	}

	return listParent, err
}

func GetParentsWithBaseInfoId(baseInfoId int) ([]model.Parents, error) {

	db := database.Method

	var parents []model.Parents

	err := db.Debug().
		Model(model.Parents{}).
		Where("base_info_id = ?", baseInfoId).
		Find(&parents).Error

	if err != nil {
		fmt.Println(err)
	}

	return parents, err
}
