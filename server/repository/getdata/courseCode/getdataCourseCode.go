package coursecode

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"

	"gorm.io/gorm"
)

func GetAllCourseCode() ([]model.CourseCode, error) {

	db := database.Method

	var listCourseCode []model.CourseCode

	err := db.Debug().
		Model(model.CourseCode{}).
		Preload("Teacher", func(tx *gorm.DB) *gorm.DB {
			return tx.Omit("Pass")
		}).
		Find(&listCourseCode).Error

	if err != nil {
		fmt.Println(err)
	}

	return listCourseCode, err
}

func GetCourseCodeOfTeacher(teacherId int) ([]model.CourseCode, error) {

	db := database.Method

	var listCourseCode []model.CourseCode

	err := db.Debug().
		Model(model.CourseCode{}).
		Where("teacher_id = ?", teacherId).
		Preload("Teacher", func(tc *gorm.DB) *gorm.DB {
			return tc.Omit("Pass")
		}).
		Find(&listCourseCode).Error

	if err != nil {
		fmt.Println(err)
	}

	return listCourseCode, err
}

func GetCourseCodeOfId(courseCodeId int, teacherId int) (model.CourseCode, error) {

	db := database.Method

	var courseCode model.CourseCode

	err := db.Debug().
		Model(model.CourseCode{}).
		Where("id = ? AND teacher_id = ?", courseCodeId, teacherId).
		Preload("Teacher", func(tc *gorm.DB) *gorm.DB {
			return tc.Omit("Pass")
		}).
		First(&courseCode).Error

	if err != nil {
		fmt.Println(err)
	}

	return courseCode, err
}
