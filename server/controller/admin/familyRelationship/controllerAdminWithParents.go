package familyrelationship

import (
	"ctsv/model"
	getdataFamilyRelationship "ctsv/repository/getdata/familyRelationship"
	moduleAdminWithFamily "ctsv/repository/module/admin/familyRelationship"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
)

// @Summary
// @Description Admin get info father
// @Tags Admin with parent
// @Accept json
// @Produce json
// @Param parent path string true "Father Or Mother"
// @Router /admin/student-parent/{parent} [get]
func AdminGetAllInfoParents(w http.ResponseWriter, r *http.Request) {

	gender := chi.URLParam(r, "parent")
	genderParent := new(bool)

	if gender == "father" {
		*genderParent = true
	} else {
		*genderParent = false
	}

	listParent, err := getdataFamilyRelationship.GetAllInfoParents(*genderParent)

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListParent: listParent,
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
// @Description Admin update info parents
// @Tags Admin with parent
// @Accept json
// @Produce json
// @Param req body []model.Parents false "Parents need update" Format(model.Parents)
// @Router /admin/student-parent/update [put]
func AdminUpdateParents(w http.ResponseWriter, r *http.Request) {

	var listParents []model.Parents
	json.NewDecoder(r.Body).Decode(&listParents)

	err := moduleAdminWithFamily.AdminUpdateParents(listParents)

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
