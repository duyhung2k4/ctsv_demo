package attendance

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func AdminCreateAttendance(listAttendance []model.Attendance) error {

	db := database.Method
	query := db.Begin()

	for _, attendance := range listAttendance {

		var baseInfo model.StudentBaseInfo
		query.Model(model.StudentBaseInfo{}).Where("student_code = ?", attendance.StudentCode).
			First(&baseInfo)

		attendance.BaseInfoId = baseInfo.Id

		if err := query.Where(
			`base_info_id = ? AND 
			class_code = ? AND 
			semester = ?`, attendance.BaseInfoId, attendance.ClassCode, attendance.Semester).
			First(&attendance).Error; err != nil {
			query.Model(model.Attendance{}).
				Create(&attendance)
		} else {
			query.Model(model.Attendance{}).
				Where(
					`base_info_id = ? AND
					class_code = ? AND
					semester = ?`, attendance.BaseInfoId, attendance.ClassCode, attendance.Semester).
				Updates(&attendance)
		}

	}

	err := query.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}

func AdminUpdateAttendance(listAttendance []model.Attendance) error {

	db := database.Method
	update := db.Begin()

	for _, attendance := range listAttendance {

		update.Model(model.Attendance{}).
			Where(
				`student_code = ? AND
				semester = ? AND
				class_code = ?`,
				attendance.StudentCode, attendance.Semester, attendance.ClassCode).
			Updates(&attendance)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
