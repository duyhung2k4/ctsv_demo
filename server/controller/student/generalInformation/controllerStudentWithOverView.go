package generalinformation

import (
	"ctsv/model"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	getdataGeneralInformation "ctsv/repository/getdata/generalInformation"
	moduleStudentgeneralInformation "ctsv/repository/module/student/generalInformation"

	"github.com/go-chi/jwtauth/v5"
)

// @Summary
// @Description Student get overview
// @Tags Student with overview
// @Accept json
// @Produce json
// @Router /student/overview [get]
func StudentGetOverview(w http.ResponseWriter, r *http.Request) {

	_, claims, err := jwtauth.FromContext(r.Context())

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "Error token", "400")
	} else {
		base_info_id := int(claims["base_info_id"].(float64))

		overview, err := getdataGeneralInformation.GetOverViewByBaseInfoId(base_info_id)

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "", "400")
		} else {
			result, _ := json.Marshal(model.Request{
				Data: model.DataRequest{
					Overview: overview,
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

// @Summary
// @Description Student update overview
// @Tags Student with overview
// @Accept json
// @Produce json
// @Param req body model.OverView false "OverView need update" Format(model.OverView)
// @Router /student/overview/update [put]
func StudentUpdateOverView(w http.ResponseWriter, r *http.Request) {

	var overview model.OverView
	json.NewDecoder(r.Body).Decode(&overview)

	_, claims, err := jwtauth.FromContext(r.Context())

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "Token error", "400")
	} else {
		base_info_id := int(claims["base_info_id"].(float64))
		overview.BaseInfoId = base_info_id

		err := moduleStudentgeneralInformation.StudentUpdateOverView(overview)

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "", "400")
		} else {
			result, _ := json.Marshal(model.Request{
				Data:    nil,
				Message: "Updated Successfully!",
				Error:   nil,
				Success: true,
			})

			w.WriteHeader(http.StatusOK)
			w.Write(result)
		}
	}

}
