package generalinformation

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func GetAccountStudent() ([]model.Student, error) {

	db := database.Method

	var accountStudents []model.Student

	err := db.Debug().
		Model(model.Student{}).
		Find(&accountStudents).Error

	if err != nil {
		fmt.Println(err)
	}

	return accountStudents, err
}
