package generalinformation

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"

	"gorm.io/gorm"
)

func GetAllBaseInfoStudent() ([]model.StudentBaseInfo, error) {

	db := database.Method

	var studentBaseInfo []model.StudentBaseInfo

	err := db.Debug().
		Model(model.StudentBaseInfo{}).
		Find(&studentBaseInfo).Error

	if err != nil {
		fmt.Println(err)
	}

	return studentBaseInfo, err
}

func GetBaseInfoStudentOfCourse(course string) ([]model.StudentBaseInfo, error) {

	db := database.Method

	var studentBaseInfo []model.StudentBaseInfo

	err := db.Debug().
		Model(model.StudentBaseInfo{}).
		Where("course = ?", course).
		Find(&studentBaseInfo).Error

	if err != nil {
		fmt.Println(err)
	}

	return studentBaseInfo, err
}

func GetBaseInfoStudentWithDepathmentOfCourse(course string, department string) ([]model.StudentBaseInfo, error) {

	db := database.Method

	var studentBaseInfo []model.StudentBaseInfo

	err := db.Debug().
		Model(model.StudentBaseInfo{}).
		Where("course = ? AND department = ?", course, department).
		Preload("Student", func(st *gorm.DB) *gorm.DB {
			return st.Omit("Pass")
		}).
		Preload("Teacher", func(tc *gorm.DB) *gorm.DB {
			return tc.Omit("Pass")
		}).
		Find(&studentBaseInfo).Error

	if err != nil {
		fmt.Println(err)
	}

	return studentBaseInfo, err

}

func GetBaseInfoByStudentId(studentId int) (model.StudentBaseInfo, error) {

	db := database.Method

	var studentBaseInfo model.StudentBaseInfo

	err := db.Debug().
		Model(model.StudentBaseInfo{}).
		Where("student_id = ?", studentId).
		Preload("Student", func(st *gorm.DB) *gorm.DB {
			return st.Omit("Pass")
		}).
		Preload("Teacher", func(tc *gorm.DB) *gorm.DB {
			return tc.Omit("Pass")
		}).
		First(&studentBaseInfo).Error

	if err != nil {
		fmt.Println(err)
	}

	return studentBaseInfo, err
}
