package familyrelationship

import (
	"ctsv/model"
	getdataParents "ctsv/repository/getdata/familyRelationship"
	moduleStudentFamily "ctsv/repository/module/student/familyRelationship"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	"github.com/go-chi/jwtauth/v5"
)

// @Summary
// @Description Student get info parents
// @Tags Student with parents
// @Accept json
// @Produce json
// @Router /student/parents [get]
func StudentGetInfoParents(w http.ResponseWriter, r *http.Request) {

	_, claims, err := jwtauth.FromContext(r.Context())

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		baseInfoId := int(claims["base_info_id"].(float64))
		parents, err := getdataParents.GetParentsWithBaseInfoId(baseInfoId)

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "", "400")
		} else {
			result, _ := json.Marshal(model.Request{
				Data: model.DataRequest{
					Parents: parents,
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
// @Description Student update info parents
// @Tags Student with parents
// @Accept json
// @Produce json
// @Param req body []model.Parents false "info parents need update" Format(model.Parents)
// @Router /student/parents/update [put]
func StudentUpdateInfoParents(w http.ResponseWriter, r *http.Request) {

	var parents []model.Parents
	json.NewDecoder(r.Body).Decode(&parents)

	err := moduleStudentFamily.StudentUpdateInfoParents(parents)

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
