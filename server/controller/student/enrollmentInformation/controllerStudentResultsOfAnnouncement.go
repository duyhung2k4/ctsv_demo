package enrollmentinformation

import (
	"ctsv/model"
	getdataResultsOfAnnouncement "ctsv/repository/getdata/enrollmentInformation"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	"github.com/go-chi/jwtauth/v5"
)

// @Summary
// @Description student get results of announcement
// @Tags Student with results of announcement
// @Accept json
// @Produce json
// @Router /student/results_of_announcement [get]
func StudentGetResultsOfAnnouncement(w http.ResponseWriter, r *http.Request) {

	_, claims, err := jwtauth.FromContext(r.Context())

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {

		baseInfoId := int(claims["base_info_id"].(float64))

		resultsOfAnnouncement, err := getdataResultsOfAnnouncement.GetResultsOfAnnouncementWithBaseInfoId(baseInfoId)

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "", "400")
		} else {
			result, _ := json.Marshal(model.Request{
				Data: model.DataRequest{
					ResultsOfAnnouncement: resultsOfAnnouncement,
				},
				Message: "",
				Error:   nil,
				Success: true,
			})

			w.WriteHeader(http.StatusOK)
			w.Write(result)
		}

	}
}
