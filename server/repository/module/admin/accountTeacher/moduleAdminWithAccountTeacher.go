package accountteacher

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func AdminCreateAccountTeacher(listAccountTeacher []model.Teacher) error {

	db := database.Method
	create := db.Begin()

	for _, account := range listAccountTeacher {
		var accountInDB model.Teacher

		if err := db.Model(model.Teacher{}).Where("email = ?", account.Email).First(&accountInDB).Error; err != nil {
			create.Model(model.Teacher{}).Create(&account)
		} else {
			create.Model(model.Teacher{}).Where("id = ?", accountInDB.Id).Updates(&account)
		}
	}

	err := create.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err

}
