package checkexist

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func CheckexistAccountStudent(student model.Student) (model.Student, error) {

	db := database.Method

	var accountStudent model.Student

	err := db.Debug().
		Model(model.Student{}).
		Where("email = ? AND pass = ?", student.Email, student.Pass).
		First(&accountStudent).Error

	if err != nil {
		fmt.Println(err)
	}

	return accountStudent, err
}
