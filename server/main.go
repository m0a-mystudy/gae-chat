// +build appengine

//go:generate goagen bootstrap -d github.com/goadesign/examples/appengine/design

package server

import (
	"net/http"

	"github.com/m0a-mystudy/appengine01/app"
	"github.com/m0a-mystudy/appengine01/controller"
	"github.com/goadesign/goa"
	"github.com/goadesign/goa/middleware"
)

func init() {
	// Create service
	service := goa.New("appengine")

	// Mount middleware
	service.Use(middleware.RequestID())
	service.Use(middleware.LogRequest(true))
	service.Use(middleware.ErrorHandler(service, true))
	service.Use(middleware.Recover())

	// Mount "hello" controller
	c := controller.NewHelloController(service)
	app.MountHelloController(service, c)

	// Setup HTTP handler
	http.HandleFunc("/", service.Mux.ServeHTTP)
}
