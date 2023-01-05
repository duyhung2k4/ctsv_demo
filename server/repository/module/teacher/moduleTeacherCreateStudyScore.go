package teacher

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func TeacherCreateStudyScoreAndttendance(listBaseInfo []model.StudentBaseInfo, courseCodeId int) error {

	db := database.Method
	create := db.Begin()

	for _, baseInfo := range listBaseInfo {

		var studentBaseInfo model.StudentBaseInfo

		if err := create.Model(model.StudentBaseInfo{}).Where("student_code = ?", baseInfo.StudentCode).First(&studentBaseInfo).Error; err == nil {

			var studyScore = model.StudyScore{
				BaseInfoId:   studentBaseInfo.Id,
				CourseCodeId: courseCodeId,
			}
			var studyScoreInDB model.StudyScore
			if err := create.Model(model.StudyScore{}).
				Where("base_info_id = ? AND course_code_id = ?", studyScore.BaseInfoId, studyScore.CourseCodeId).
				First(&studyScoreInDB).Error; err != nil {
				create.Model(model.StudyScore{}).Create(&studyScore)
			}

			var attendance = model.Attendance{
				BaseInfoId:   studentBaseInfo.Id,
				CourseCodeId: courseCodeId,
			}
			var attendanceInDB model.Attendance
			if err := create.Model(model.Attendance{}).
				Where("base_info_id = ? AND course_code_id = ?", attendance.BaseInfoId, attendance.CourseCodeId).
				First(&attendanceInDB).Error; err != nil {
				create.Model(model.Attendance{}).Create(&attendance)
			}
		}
	}

	err := create.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}

func TeacherUpdateStudyScore(listStudyScore []model.StudyScore) error {

	db := database.Method
	update := db.Begin()

	for _, studyScore := range listStudyScore {

		update.Model(model.StudyScore{}).
			Where("base_info_id = ? AND course_code_id = ?", studyScore.BaseInfoId, studyScore.CourseCodeId).
			Updates(&studyScore)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}

func TeacherUpdateAttendance(listAttendance []model.Attendance) error {

	db := database.Method
	update := db.Begin()

	for _, attendance := range listAttendance {

		update.Model(model.Attendance{}).
			Where("base_info_id = ? AND course_code_id = ?", attendance.BaseInfoId, attendance.CourseCodeId).
			Updates(&attendance)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
