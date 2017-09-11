// package controllers_test

// import (
// 	"log"
// 	"os"

// 	"google.golang.org/appengine/aetest"

// 	"github.com/goadesign/goa"
// )

// // New instantiates a service with the given name.
// func Service() (*goa.Service, func(), error) {

// 	c, done, err := aetest.NewContext()
// 	if err != nil {
// 		return nil, nil, err
// 	}

// 	var (
// 		stdlog  = log.New(os.Stderr, "", log.LstdFlags)
// 		ctx     = goa.WithLogger(c, goa.NewLogger(stdlog))
// 		mux     = goa.NewMux()
// 		service = &goa.Service{
// 			Name:    "ae test",
// 			Context: ctx,
// 			Mux:     mux,
// 			Decoder: goa.NewHTTPDecoder(),
// 			Encoder: goa.NewHTTPEncoder(),
// 		}
// 	)

// 	return service, done, nil
// }
