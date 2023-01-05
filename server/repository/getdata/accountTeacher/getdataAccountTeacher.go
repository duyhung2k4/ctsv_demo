package accountteacher

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func GetAccountTeacher() ([]model.Teacher, error) {

	db := database.Method

	var listAccountTeacher []model.Teacher

	err := db.Debug().
		Model(model.Teacher{}).
		Select("id, name, email, phone").
		Order("id asc").
		Find(&listAccountTeacher).Error

	if err != nil {
		fmt.Println(err)
	}

	return listAccountTeacher, err
}
