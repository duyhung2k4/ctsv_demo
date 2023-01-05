package classofstudent

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func AdminCreateClass(listClass []model.Class) error {

	db := database.Method
	create := db.Begin()

	for _, class := range listClass {
		var newClass model.Class
		if err := create.Model(model.Class{}).Where("class_code = ?", class.ClassCode).First(&newClass).Error; err != nil {
			create.Model(model.Class{}).
				Create(&class)
		} else {
			create.Model(model.Class{}).
				Where("class_code = ?", class.ClassCode).
				Updates(&class)
		}
	}

	err := create.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}

func AdminUpdateClass(listClass []model.Class) error {

	db := database.Method
	update := db.Begin()

	for _, class := range listClass {
		update.Model(model.Class{}).
			Where("id = ?", class.Id).
			Updates(&class)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
