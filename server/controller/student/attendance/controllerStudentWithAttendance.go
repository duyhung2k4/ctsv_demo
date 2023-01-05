package attendance

import (
	"ctsv/model"
	getdataAttendance "ctsv/repository/getdata/attendance"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	"github.com/go-chi/jwtauth/v5"
)

// @Summary
// @Description Student get attendance
// @Tags Student with attendance
// @Accept json
// @Produce json
// @Router /student/attendance [get]
func StudentGetAttendance(w http.ResponseWriter, r *http.Request) {

	_, claims, err := jwtauth.FromContext(r.Context())

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {

		baseInfoId := int(claims["base_info_id"].(float64))
		attendance, err := getdataAttendance.GetAttendanceWithBaseInfoId(baseInfoId)

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "", "400")
		} else {
			result, _ := json.Marshal(model.Request{
				Data: model.DataRequest{
					ListAttendance: attendance,
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
