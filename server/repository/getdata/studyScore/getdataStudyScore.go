package studyscore

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func GetStudyScoreWithCourseCodeId(courseCodeId int) ([]model.StudyScore, error) {

	db := database.Method

	var listStudyScore []model.StudyScore

	err := db.Debug().
		Model(model.StudyScore{}).
		Where("course_code_id = ?", courseCodeId).
		Preload("StudentBaseInfo").
		Preload("CourseCode").
		Find(&listStudyScore).Error

	if err != nil {
		fmt.Println(err)
	}

	return listStudyScore, err

}

func GetStudyScoreOfCourseCodeAndShoolYear(courseCode string, schoolYear string) ([]model.StudyScore, error) {

	db := database.Method

	var listStudyCore []model.StudyScore

	err := db.Debug().
		Model(model.StudyScore{}).
		Where("course_code = ? AND school_year = ?", courseCode, schoolYear).
		Find(&listStudyCore).Error

	if err != nil {
		fmt.Println(err)
	}

	return listStudyCore, err
}

func GetStudyScoreOfClassInCourseCodeAndSchoolYear(classCode string, courseCode string, schoolYear string) ([]model.StudyScore, error) {

	db := database.Method

	var listStudyScore []model.StudyScore

	err := db.Debug().
		Model(model.StudyScore{}).
		Where("class_code = ? AND course_code = ? AND school_year = ?", classCode, courseCode, schoolYear).
		Find(&listStudyScore).Error

	if err != nil {
		fmt.Println(err)
	}

	return listStudyScore, err
}

func GetStudyScoreWithBaseInfoId(baseInfoId int) ([]model.StudyScore, error) {

	db := database.Method

	var listStudyScore []model.StudyScore

	err := db.Debug().
		Model(model.StudyScore{}).
		Where("base_info_id = ?", baseInfoId).
		Preload("StudentBaseInfo").
		Preload("CourseCode").
		Find(&listStudyScore).Error

	if err != nil {
		fmt.Println(err)
	}

	return listStudyScore, err
}
