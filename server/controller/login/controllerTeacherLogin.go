package login

import (
	"ctsv/model"
	"ctsv/repository/checkexist"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	"github.com/go-chi/jwtauth/v5"
)

// @Summary
// @Description Teacher login
// @Tags Login
// @Accept json
// @Produce json
// @Param req body model.Teacher false "Account teacher" Format(model.Teacher)
// @Router /login/teacher [post]
func TeacherLogin(w http.ResponseWriter, r *http.Request) {

	var teacher model.Teacher
	json.NewDecoder(r.Body).Decode(&teacher)

	accountTeacher, err := checkexist.CheckExistAccountTeacher(teacher)

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		tokenAuth := jwtauth.New("HS256", []byte("token"), nil)
		_, tokenString, err := tokenAuth.Encode(map[string]interface{}{
			"id":         accountTeacher.Id,
			"email":      accountTeacher.Email,
			"permission": "teacher",
		})

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "Error token", "400")
		} else {

			cookie := http.Cookie{
				Name:     "jwt",
				Value:    tokenString,
				Path:     "/teacher",
				HttpOnly: true,
				MaxAge:   3 * 60 * 60,
			}

			http.SetCookie(w, &cookie)

			result, _ := json.Marshal(model.Request{
				Data: model.DataRequest{
					Token: tokenString,
				},
				Message: "Login Access",
				Error:   nil,
				Success: true,
			})

			w.WriteHeader(http.StatusOK)
			w.Write(result)
		}
	}
}
