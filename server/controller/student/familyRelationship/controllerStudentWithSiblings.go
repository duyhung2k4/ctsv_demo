package familyrelationship

import (
	"ctsv/model"
	getdataRelationship "ctsv/repository/getdata/familyRelationship"
	moduleStudentSiBlings "ctsv/repository/module/student/familyRelationship"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	"github.com/go-chi/jwtauth/v5"
)

// @Summary
// @Description Student create siblings
// @Tags Student with siblings
// @Accept json
// @Produce json
// @Param req body []model.SiBlings false "Siblings" Format(model.SiBlings)
// @Router /student/siblings/create [post]
func StudentCreateSiBlings(w http.ResponseWriter, r *http.Request) {

	var siblings []model.SiBlings
	json.NewDecoder(r.Body).Decode(&siblings)

	err := moduleStudentSiBlings.StudentCreateSiBlings(siblings)

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data:    nil,
			Message: "Created Successfully!",
			Error:   nil,
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}
}

// @Summary
// @Description Student get siblings
// @Tags Student with siblings
// @Accept json
// @Produce json
// @Router /student/siblings [get]
func StudentGetSiBlings(w http.ResponseWriter, r *http.Request) {

	_, claims, err := jwtauth.FromContext(r.Context())

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {

		baseInfoId := int(claims["base_info_id"].(float64))
		siblings, err := getdataRelationship.GetSiBlingsWithBaseInfoId(baseInfoId)

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "", "400")
		} else {
			result, _ := json.Marshal(model.Request{
				Data: model.DataRequest{
					SiBlings: siblings,
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
// @Description Student delete siblings
// @Tags Student with siblings
// @Accept json
// @Produce json
// @Param req body []model.SiBlings false "siblings need update" Format(model.SiBlings)
// @Router /student/siblings/delete [delete]
func StudentDeleteSiBlings(w http.ResponseWriter, r *http.Request) {

	var siblings []model.SiBlings
	json.NewDecoder(r.Body).Decode(&siblings)

	err := moduleStudentSiBlings.StudentDeleteSiBlings(siblings)

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data:    nil,
			Message: "Deleted Successfully!",
			Error:   nil,
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}
}
