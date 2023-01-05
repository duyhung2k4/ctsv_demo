package enrollmentinformation

import (
	"ctsv/model"
	getdataEnrollmentInformation "ctsv/repository/getdata/enrollmentInformation"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	"github.com/go-chi/jwtauth/v5"
)

// @Summary
// @Description Student get granduation information
// @Tags Student with granduation information
// @Accept json
// @Produce json
// @Router /student/granduation_onformation [get]
func StudentGetGranduationInformation(w http.ResponseWriter, r *http.Request) {

	_, claims, err := jwtauth.FromContext(r.Context())

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		baseInfoId := int(claims["base_info_id"].(float64))
		granduationInformation, err := getdataEnrollmentInformation.GetGranduationInformationWithBaseInfoId(baseInfoId)

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "", "400")
		} else {
			result, _ := json.Marshal(model.Request{
				Data: model.DataRequest{
					GranduationInformation: granduationInformation,
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
