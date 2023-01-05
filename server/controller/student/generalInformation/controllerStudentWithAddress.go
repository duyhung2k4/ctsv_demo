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
// @Description Student get address
// @Tags Student with address
// @Accept json
// @Produce json
// @Router /student/address [get]
func StudentGetAddress(w http.ResponseWriter, r *http.Request) {

	_, claims, err := jwtauth.FromContext(r.Context())

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "Error token", "400")
	} else {
		baseInfoId := int(claims["base_info_id"].(float64))
		address, err := getdataGeneralInformation.GetAddressWithBaseInfoId(baseInfoId)

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "", "400")
		} else {
			result, _ := json.Marshal(model.Request{
				Data: model.DataRequest{
					Address: address,
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
// @Description Student update address
// @Tags Student with address
// @Accept json
// @Produce json
// @Param req body model.Address false "Address need update" Format(model.Address)
// @Router /student/address/update [put]
func StudentUpdateAddress(w http.ResponseWriter, r *http.Request) {

	var address model.Address
	json.NewDecoder(r.Body).Decode(&address)

	_, claims, err := jwtauth.FromContext(r.Context())

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "Error token", "400")
	} else {
		baseInfoId := int(claims["base_info_id"].(float64))
		address.BaseInfoId = baseInfoId
		err := moduleStudentgeneralInformation.StudentUpdateAddress(address)

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
