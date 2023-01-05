package login

import (
	"ctsv/model"
	"ctsv/repository/checkexist"
	getdataGeneralInformation "ctsv/repository/getdata/generalInformation"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	"github.com/go-chi/jwtauth/v5"
)

// @Summary
// @Descrpition Student login
// @Tags Login
// @Accept json
// @Produce json
// @Param req body model.Student false "Student" Format(model.Student)
// @Router /login/student [post]
func StudentLogin(w http.ResponseWriter, r *http.Request) {

	var student model.Student
	json.NewDecoder(r.Body).Decode(&student)

	accountStudent, err := checkexist.CheckexistAccountStudent(student)

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {

		studentBaseInfo, err := getdataGeneralInformation.GetBaseInfoByStudentId(accountStudent.Id)

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "", "400")
		} else {

			tokenAuth := jwtauth.New("HS256", []byte("token"), nil)

			_, tokenString, err := tokenAuth.Encode(map[string]interface{}{
				"base_info_id": studentBaseInfo.Id,
				"student_code": studentBaseInfo.StudentCode,
				"teacher":      studentBaseInfo.TeacherId,
				"email":        accountStudent.Email,
				"permission":   "student",
			})

			if err != nil {
				statusrequest.RequestErrorToken(w, r, err)
			} else {

				cookie := http.Cookie{
					Name:     "jwt",
					Value:    tokenString,
					Path:     "/student",
					HttpOnly: true,
					MaxAge:   3 * 60 * 60,
				}

				http.SetCookie(w, &cookie)

				result, _ := json.Marshal(model.Request{
					Data: model.DataRequest{
						Token: tokenString,
					},
					Message: "Logined Successfully!",
					Error:   nil,
					Success: true,
				})

				w.WriteHeader(http.StatusOK)
				w.Write(result)
			}

		}
	}

}
