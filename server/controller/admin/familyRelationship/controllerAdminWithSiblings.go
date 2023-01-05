package familyrelationship

import (
	"ctsv/model"
	getdataFamilyRelationship "ctsv/repository/getdata/familyRelationship"
	moduleAdminWithFamily "ctsv/repository/module/admin/familyRelationship"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"
)

// @Summary
// @Description Admin get info siblings
// @Tags Admin with siblings
// @Accept json
// @Produce json
// @Router /admin/student-siblings [get]
func AdminGetSiBlings(w http.ResponseWriter, r *http.Request) {

	listSiBling, err := getdataFamilyRelationship.GetAllSiBlings()

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListSiBlings: listSiBling,
			},
			Message: "",
			Error:   nil,
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}

}

// @Summary
// @Description Admin update siblings
// @Tags Admin with siblings
// @Accept json
// @Produce json
// @Param req body []model.SiBlings false "List siblings need update" Format(model.SiBlings)
// @Router /admin/student-siblings/update [put]
func AdminUpdateSiBlings(w http.ResponseWriter, r *http.Request) {

	var listSiBlings []model.SiBlings
	json.NewDecoder(r.Body).Decode(&listSiBlings)

	err := moduleAdminWithFamily.AdminUpdateSiBlings(listSiBlings)

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
