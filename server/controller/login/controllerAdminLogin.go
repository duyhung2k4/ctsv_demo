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
// @Description Login admin
// @Tags Login
// @Accept json
// @Produce json
// @Param req body model.Admin false "Account admin" Format(model.Admin)
// @Router /login/admin [post]
func AdminLogin(w http.ResponseWriter, r *http.Request) {

	var admin model.Admin
	json.NewDecoder(r.Body).Decode(&admin)

	accountAdmin, err := checkexist.CheckexistAccountAdmin(admin)

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "Not exist account admin", "401")
	} else {

		tokenAuth := jwtauth.New("HS256", []byte("token"), nil)
		_, tokenString, err := tokenAuth.Encode(map[string]interface{}{
			"id":         accountAdmin.Id,
			"name":       accountAdmin.Name,
			"permission": "admin",
		})

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "Token error", "401")
		} else {

			cookie := http.Cookie{
				Name:     "jwt",
				Value:    tokenString,
				Path:     "/admin",
				HttpOnly: true,
				MaxAge:   3 * 60 * 60,
			}

			http.SetCookie(w, &cookie)

			result, _ := json.Marshal(model.Request{
				Data: model.DataRequest{
					Token: tokenString,
				},
				Error:   nil,
				Message: "",
				Success: true,
			})

			w.WriteHeader(http.StatusOK)
			w.Write(result)
		}
	}

}
