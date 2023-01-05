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
// @Description Student get contact
// @Tags Student with contact
// @Accept json
// @Produce json
// @Router /student/contact [get]
func StudentGetContact(w http.ResponseWriter, r *http.Request) {

	_, claims, err := jwtauth.FromContext(r.Context())

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "Error token", "400")
	} else {

		baseInfoId := int(claims["base_info_id"].(float64))

		contact, err := getdataGeneralInformation.GetContactByBaseInfoId(baseInfoId)

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "", "400")
		} else {
			result, _ := json.Marshal(model.Request{
				Data: model.DataRequest{
					Contact: contact,
				},
				Message: ":",
				Error:   nil,
				Success: true,
			})

			w.WriteHeader(http.StatusOK)
			w.Write(result)
		}
	}
}

// @Summary
// @Description Student update contact
// @Tags Student with contact
// @Accept json
// @Produce json
// @Param req body model.Contact false "Contact need update" Format(model.Contact)
// @Router /studet/contact/update [put]
func StudentUpdateContact(w http.ResponseWriter, r *http.Request) {

	var contact model.Contact
	json.NewDecoder(r.Body).Decode(&contact)

	_, claims, err := jwtauth.FromContext(r.Context())

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "Error token", "400")
	} else {
		baseInfoId := int(claims["base_info_id"].(float64))
		contact.BaseInfoId = baseInfoId

		err := moduleStudentgeneralInformation.StudentUpdateContact(contact)

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
