package enrollmentinformation

import (
	"ctsv/model"
	getdataEnrollmentInformation "ctsv/repository/getdata/enrollmentInformation"
	moduleAdminEnrollment "ctsv/repository/module/admin/enrollmentInformation"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"
)

// @Summary
// @Description Admin get granduation information
// @Tags Admin with granduation information
// @Accept json
// @Produce json
// @Router /admin/student-granduation [get]
func AdminGetGranduationInformation(w http.ResponseWriter, r *http.Request) {

	listGranduationInformation, err := getdataEnrollmentInformation.GetAllGranuationInformation()

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListGranduationInformation: listGranduationInformation,
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
// @Description Admin update granduation information
// @Tags Admin with granduation information
// @Accept json
// @Produce json
// @Param req body []model.GranduationInformation false "list granduation information need update" Format(model.GranduationInformation)
// @Router /admin/student-granduation/update [put]
func AdminUpdateGranduationInformation(w http.ResponseWriter, r *http.Request) {

	var listGranduationInformation []model.GranduationInformation
	json.NewDecoder(r.Body).Decode(&listGranduationInformation)

	err := moduleAdminEnrollment.AdminUpdateGranduationInformation(listGranduationInformation)

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
