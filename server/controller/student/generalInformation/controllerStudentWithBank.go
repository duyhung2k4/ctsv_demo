package generalinformation

import (
	"ctsv/model"
	getdataGeneralInformation "ctsv/repository/getdata/generalInformation"
	moduleStudentgeneralInformation "ctsv/repository/module/student/generalInformation"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	"github.com/go-chi/jwtauth/v5"
)

// @Summary
// @Description Student get bank
// @Tags Student with bank
// @Accept json
// @Produce json
// @Router /student/bank [get]
func StudentGetBank(w http.ResponseWriter, r *http.Request) {

	_, claims, err := jwtauth.FromContext(r.Context())

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "Error token", "400")
	} else {
		baseInfoId := int(claims["base_info_id"].(float64))

		bank, err := getdataGeneralInformation.GetBankWithBaseInfoId(baseInfoId)

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "", "400")
		} else {
			result, _ := json.Marshal(model.Request{
				Data: model.DataRequest{
					Bank: bank,
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
// @Description Student update bank
// @Tags Student with bank
// @Accept json
// @Produce json
// @Param req body model.Bank false "Bank need update" Format(model.Bank)
// @Router /student/bank/update [put]
func StudentUpdateBank(w http.ResponseWriter, r *http.Request) {

	var bank model.Bank
	json.NewDecoder(r.Body).Decode(&bank)

	_, claims, err := jwtauth.FromContext(r.Context())

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "Error token", "400")
	} else {
		baseInfoId := int(claims["base_info_id"].(float64))
		bank.BaseInfoId = baseInfoId

		err := moduleStudentgeneralInformation.StudentUpdateBank(bank)

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
