package enrollmentinformation

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func GetAllResultsOfAnnouncement() ([]model.ResultsOfAnnouncement, error) {

	db := database.Method

	var listResultsOfAnnouncement []model.ResultsOfAnnouncement

	err := db.Debug().
		Model(model.ResultsOfAnnouncement{}).
		Preload("StudentBaseInfo").
		Find(&listResultsOfAnnouncement).Error

	if err != nil {
		fmt.Println(err)
	}

	return listResultsOfAnnouncement, err
}

func GetResultsOfAnnouncementWithBaseInfoId(baseInfoId int) (model.ResultsOfAnnouncement, error) {

	db := database.Method

	var resultsOfAnnouncement model.ResultsOfAnnouncement

	err := db.Debug().
		Model(model.ResultsOfAnnouncement{}).
		Where("base_info_id = ?", baseInfoId).
		Preload("StudentBaseInfo").
		First(&resultsOfAnnouncement).Error

	if err != nil {
		fmt.Println(err)
	}

	return resultsOfAnnouncement, err
}
