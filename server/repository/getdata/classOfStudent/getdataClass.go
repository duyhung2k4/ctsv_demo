package classofstudent

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func GetAllClass() ([]model.Class, error) {

	db := database.Method

	var listClass []model.Class

	err := db.Debug().
		Model(model.Class{}).
		Find(&listClass).Error

	if err != nil {
		fmt.Println(err)
	}

	return listClass, err
}
