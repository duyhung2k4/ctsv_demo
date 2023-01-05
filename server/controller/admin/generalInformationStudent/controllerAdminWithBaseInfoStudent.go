package generalinformationstudent

import (
	"ctsv/model"
	getdata "ctsv/repository/getdata/generalInformation"
	moduleAdminWithBaseInfoStudent "ctsv/repository/module/admin/generalInformationStudent"
	"ctsv/service"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
)

// @Summary
// @Description Admin create base info student
// @Tags Admin with base info student
// @Accept json
// @Produce json
// @Param req body []model.StudentBaseInfo false "List Base info student" Format(model.StudentBaseInfo)
// @Router /admin/student-base-info/create [post]
func AdminCreateBaseInfoOfStudent(w http.ResponseWriter, r *http.Request) {

	var baseInfoStudent []model.StudentBaseInfo
	json.NewDecoder(r.Body).Decode(&baseInfoStudent)

	err1 := service.CreateGeneralInfomation(baseInfoStudent)
	err2 := service.CreateFamilyRelationship(baseInfoStudent)
	err3 := service.CreateEnrollmentInformation(baseInfoStudent)

	if err1 != nil {
		statusrequest.ErrorRequest(w, r, err1, "", "400")
	} else if err2 != nil {
		statusrequest.ErrorRequest(w, r, err2, "", "400")
	} else if err3 != nil {
		statusrequest.ErrorRequest(w, r, err3, "", "400")
	} else {

		result, _ := json.Marshal(model.Request{
			Data:    nil,
			Error:   nil,
			Message: "Created Successfully!",
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}

}

// @Summary
// @Description Admin get all base info of student
// @Tags Admin with base info student
// @Accept json
// @Produce json
// @Router /admin/student-base-info [get]
func AdminGetAllBaseInfoStudent(w http.ResponseWriter, r *http.Request) {

	baseInfoStudent, err := getdata.GetAllBaseInfoStudent()

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListStudentBaseInfo: baseInfoStudent,
			},
			Error:   nil,
			Message: "",
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}

}

// @Summary
// @Description Admin get base info student of course
// @Tags Admin with base info student
// @Accept json
// @Produce json
// @Param course path string true "Course"
// @Router /admin/student-base-info/{course} [get]
func AdminGetBaseInfoStudentOfCourse(w http.ResponseWriter, r *http.Request) {

	course := chi.URLParam(r, "course")

	baseInfoStudent, err := getdata.GetBaseInfoStudentOfCourse(course)

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListStudentBaseInfo: baseInfoStudent,
			},
			Error:   nil,
			Message: "",
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}
}

// @Summary
// @Description Admin get list student base info with deprtment of student
// @Tags Admin with base info student
// @Accept json
// @Produce json
// @Param course path string true "Course"
// @Param department path string true "Depathment"
// @Router /admin/base-info-student/{course}/{department} [get]
func AminGetBaseInfoStudentInDepartmentOfCourse(w http.ResponseWriter, r *http.Request) {

	course := chi.URLParam(r, "course")
	department := chi.URLParam(r, "department")

	listStudentBaseInfo, err := getdata.GetBaseInfoStudentWithDepathmentOfCourse(course, department)

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {

		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListStudentBaseInfo: listStudentBaseInfo,
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
// @Description Admin update student base info
// @Tags Admin with base info student
// @Accept json
// @Produce json
// @Param req body []model.StudentBaseInfo false "List student base info need update" Format(model.StudentBaseInfo)
// @Router /admin/student-base-info/update [put]
func AdminUpdateBaseInfo(w http.ResponseWriter, r *http.Request) {

	var listStudentBaseInfo []model.StudentBaseInfo
	json.NewDecoder(r.Body).Decode(&listStudentBaseInfo)

	err := moduleAdminWithBaseInfoStudent.AdminUpdateBaseInfoStudent(listStudentBaseInfo)

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "Updated Failed!", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data:    nil,
			Message: "Updated successfully!",
			Error:   nil,
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}

}

// @Summary
// @Description Admin update base info student by id
// @Tags Admin with base info student
// @Accept json
// @Produce json
// @Param req body model.StudentBaseInfo false "Student base info need update" Format(model.StudentBaseinfo)
// @Router /admin/student-base-info/update-by-id [put]
func AdminUpdateBaseInfoWithId(w http.ResponseWriter, r *http.Request) {

	var studentbaeInfo model.StudentBaseInfo
	json.NewDecoder(r.Body).Decode(&studentbaeInfo)

	err := moduleAdminWithBaseInfoStudent.AdminUpdateStudentBaseInfoById(studentbaeInfo)

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "Updated Failed!", "400")
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
