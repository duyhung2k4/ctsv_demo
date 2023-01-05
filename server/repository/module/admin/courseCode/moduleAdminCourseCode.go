package coursecode

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func AdminCreateCourseCode(listCourseCode []model.CourseCode) error {

	db := database.Method
	create := db.Begin()

	for _, courseCode := range listCourseCode {
		var courseCodeInDB model.CourseCode
		if err := create.Model(model.CourseCode{}).Where("code = ?", courseCode.Code).First(&courseCodeInDB).Error; err != nil {
			create.Model(model.CourseCode{}).
				Create(&courseCode)
		} else {
			create.Model(model.CourseCode{}).
				Where("id = ?", courseCodeInDB.Id).
				Updates(&courseCode)
		}
	}

	err := create.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}

func AdminUpdateCourseCode(listCourseCode []model.CourseCode) error {

	db := database.Method
	update := db.Begin()

	for _, courseCode := range listCourseCode {
		update.Model(model.CourseCode{}).
			Where("id = ?", courseCode.Id).
			Updates(&courseCode)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
