package models

import (
	"fmt"
	"testing"
	"time"

	"google.golang.org/appengine/datastore"

	"github.com/mjibson/goon"
	"google.golang.org/appengine/aetest"
)

func RunInTesting(t *testing.T, f func(m *Model, t *testing.T) error) {
	m, done, err := TestContext()
	if err != nil {
		t.Fatalf("Could not start aetest - %v", err)
	}
	defer done()
	err = f(m, t)
	if err != nil {
		t.Fatalf("err - %v", err)
		panic(err)
	}

}
func TestPostRoom(t *testing.T) {
	RunInTesting(t, func(m *Model, t *testing.T) error {
		_, err := m.PostRoom("sampleRoom", "sampleRoomDescription")
		if err != nil {
			t.Fatalf("Post Room err - %v", err)
			return err
		}
		return nil
	})
}

func TestRooms(t *testing.T) {
	RunInTesting(t, func(m *Model, t *testing.T) error {

		key, err := m.PostRoom("s1", "desc1")
		if err != nil {
			return err
		}
		m.ForceApply(key)

		key, err = m.PostRoom("s2", "desc2")
		if err != nil {
			return err
		}
		m.ForceApply(key)

		rooms, err := m.Rooms(0, 100)
		if err != nil {
			return err
		}
		fmt.Printf("%#v\n", rooms)
		return nil

	})
}
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

	logins := []Login{}
	_, err = g.GetAll(datastore.NewQuery("Login"), &logins)
	if err != nil {
		t.Fail()
	}

	fmt.Printf("%v\n", logins)
}
