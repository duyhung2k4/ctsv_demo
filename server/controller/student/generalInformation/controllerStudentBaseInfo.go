package generalinformation

import (
	"ctsv/model"
	getdataGeneralInformation "ctsv/repository/getdata/generalInformation"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	"github.com/go-chi/jwtauth/v5"
)

// @Summary
// @Description Student get base info
// @Tags Student with base info
// @Accept json
// @Produce json
// @Router /student/base_info [get]
func StudentGetBaseInfo(w http.ResponseWriter, r *http.Request) {

	_, claims, err := jwtauth.FromContext(r.Context())

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "Error token", "400")
	} else {
		base_info_id := int(claims["base_info_id"].(float64))

		baseInfo, err := getdataGeneralInformation.GetBaseInfoByStudentId(base_info_id)

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "", "400")
		} else {

			result, _ := json.Marshal(model.Request{
				Data: model.DataRequest{
					StudentBaseInfo: baseInfo,
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
