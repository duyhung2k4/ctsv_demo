package statusrequest

import (
	"ctsv/model"
	"encoding/json"
	"net/http"

	"github.com/go-chi/render"
)

func RequestNotFound(w http.ResponseWriter, r *http.Request, err error, message string) {

	result, _ := json.Marshal(TypeRequest{
		Error:   err,
		Message: message,
		Status:  "404",
	})

	w.WriteHeader(http.StatusNotFound)
	render.JSON(w, r, result)
}

func ErrorRequest(w http.ResponseWriter, r *http.Request, err error, message string, status string) {

	// result, _ := json.Marshal(TypeRequest{
	// 	Error:   err,
	// 	Message: message,
	// 	Status:  status,
	// })

	res, _ := json.Marshal(model.Request{
		Data:    nil,
		Message: "",
		Error:   err,
		Success: false,
	})

	w.Write(res)
	//render.JSON(w, r, result)
}

func RequestErrorToken(w http.ResponseWriter, r *http.Request, err error) {

	result, _ := json.Marshal(TypeRequest{
		Error:   err,
		Message: "",
		Status:  "",
	})

	render.JSON(w, r, result)
}
