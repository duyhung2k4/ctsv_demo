package getdata

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func GetElementCourse() ([]model.Course, error) {

	db := database.Method

	var courses []model.Course

	err := db.Debug().
		Model(model.Course{}).
		Find(&courses).Error

	if err != nil {
		fmt.Println(err)
	}

	return courses, err
}

func GetElementDepartment() ([]model.Department, error) {

	db := database.Method

	var departments []model.Department

	err := db.Debug().
		Model(model.Department{}).
		Find(&departments).Error

	if err != nil {
		fmt.Println(err)
	}

	return departments, err
}
