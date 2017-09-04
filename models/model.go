package models

import "time"

type Login struct {
	GoogleLoginID string `datastore:"-" goon:"id"`
	Picture       []byte
	Name          string
	Email         string
	LastLogin     time.Time
}
