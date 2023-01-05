package studyscore

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func AdminCreateStudyScore(listStudyScore []model.StudyScore) error {

	db := database.Method
	query := db.Begin()

	for _, studyScore := range listStudyScore {
		var baseInfo model.StudentBaseInfo

		query.Model(model.StudentBaseInfo{}).
			Where("student_code = ?", studyScore.StudentCode).
			First(&baseInfo)

		studyScore.BaseInfoId = baseInfo.Id

		var studyScoreInDB model.StudyScore

		if err := query.Model(model.StudyScore{}).
			Where(
				`base_info_id = ? AND
				course_code = ? AND 
				class_code = ?`,
				studyScore.BaseInfoId,
				studyScore.CourseCode,
				studyScore.ClassCode).
			First(&studyScoreInDB).Error; err != nil {
			query.Model(model.StudyScore{}).
				Create(&studyScore)
		} else {
			query.Model(model.StudyScore{}).
				Where(
					`base_info_id = ? AND
					course_code = ? AND
					class_code = ?`,
					studyScore.BaseInfoId,
					studyScore.CourseCode,
					studyScore.ClassCode,
				).Updates(&studyScore)
		}
	}

	err := query.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}

func AdminUpdateStudyScore(listStudyScore []model.StudyScore) error {

	db := database.Method
	update := db.Begin()

	for _, studyScore := range listStudyScore {
		update.Model(model.StudyScore{}).
			Where("base_id_info = ?", studyScore.BaseInfoId).
			Updates(&studyScore)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
