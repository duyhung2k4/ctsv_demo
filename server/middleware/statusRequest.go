package middleware

import (
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	"github.com/go-chi/render"
)

func tokenError(w http.ResponseWriter, r *http.Request, err error) {

	result, _ := json.Marshal(statusrequest.TypeRequest{
		Error:   err,
		Message: "Token error",
		Status:  "400",
	})

	w.Write(result)
	render.JSON(w, r, result)
}
