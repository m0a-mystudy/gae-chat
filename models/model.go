package models

import (
	"context"
	"time"

	"google.golang.org/appengine"

	"github.com/goadesign/goa"

	"github.com/mjibson/goon"
	"google.golang.org/appengine/datastore"
)

// Login はユーザ情報を管理します
type Login struct {
	GoogleLoginID string `datastore:"-" goon:"id"`
	Picture       []byte
	Name          string
	Email         string
	LastLogin     time.Time
}

// Room はチャットのルームを示します。
type Room struct {
	Name string `datastore:"-" goon:"id"`
	// Tags        []string
	Description string
	Created     time.Time
}

// Message はチャットのメッセージを示します。Roomが親になります
type Message struct {
	ID      int64         `datastore:"-" goon:"id"`
	Room    datastore.Key `datastore:"-" goon:"parent"`
	Auther  datastore.Key
	Content string `datastore:",noindex"`
	Created time.Time
}

// Tag はタグ情報を締めす
type Tag struct {
	Name  string `datastore:"-" goon:"id"`
	Count int64
}

// Goon is return context
func Goon(ctx context.Context) *goon.Goon {
	r := goa.ContextRequest(ctx).Request
	return goon.FromContext(appengine.NewContext(r))
}
