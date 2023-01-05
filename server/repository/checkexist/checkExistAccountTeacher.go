package checkexist

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func CheckExistAccountTeacher(teacher model.Teacher) (model.Teacher, error) {

	db := database.Method

	var accountTeacher model.Teacher

	err := db.Debug().
		Model(model.Teacher{}).
		Where("email = ? AND pass = ?", teacher.Email, teacher.Pass).
		First(&accountTeacher).Error

	if err != nil {
		fmt.Println(err)
	}

	return accountTeacher, err
}
