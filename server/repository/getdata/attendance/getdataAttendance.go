package attendance

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func GetAttendance(semester string, classCode string) ([]model.Attendance, error) {

	db := database.Method

	var listAttendance []model.Attendance

	err := db.Debug().
		Model(model.Attendance{}).
		Where("semester = ? AND class_code = ?", semester, classCode).
		Find(&listAttendance).Error

	if err != nil {
		fmt.Println(err)
	}

	return listAttendance, err

}

func GetAttendanceWithBaseInfoId(baseInfoId int) ([]model.Attendance, error) {

	db := database.Method

	var attendance []model.Attendance

	err := db.Debug().
		Model(model.Attendance{}).
		Where("base_info_id = ?", baseInfoId).
		Preload("StudentBaseInfo").
		Preload("CourseCode").
		Find(&attendance).Error

	if err != nil {
		fmt.Println(err)
	}

	return attendance, err
}

func GetAttenddanceWithCourseCodeId(courseCodeId int) ([]model.Attendance, error) {

	db := database.Method

	var listAttendance []model.Attendance

	err := db.Debug().
		Model(model.Attendance{}).
		Where("course_code_id = ?", courseCodeId).
		Preload("StudentBaseInfo").
		Preload("CourseCode").
		Find(&listAttendance).Error

	if err != nil {
		fmt.Println(err)
	}

	return listAttendance, err
}
