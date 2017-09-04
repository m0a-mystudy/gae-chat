package models

import (
	"fmt"
	"testing"
	"time"

	"google.golang.org/appengine/datastore"

	"github.com/mjibson/goon"
	"google.golang.org/appengine/aetest"
)

func TestLoginModel(t *testing.T) {
	c, done, err := aetest.NewContext()
	if err != nil {
		t.Fatalf("Could not start aetest - %v", err)
	}
	defer done()
	g := goon.FromContext(c)
	login := Login{
		GoogleLoginID: "someID001",
		Email:         "some@Email.com",
		LastLogin:     time.Date(2017, 7, 1, 0, 0, 0, 0, time.UTC),
		Name:          "someName",
		Picture:       nil,
	}

	key, err := g.Put(&login)
	if err != nil {
		t.Fatalf("%v", err)
	}

	fmt.Println("key", key)

	var logins []*Login

	_, err = g.GetAll(datastore.NewQuery("login"), &logins)
	if err != nil {
		t.Fail()
	}

	fmt.Printf("%v\n", logins)
}
