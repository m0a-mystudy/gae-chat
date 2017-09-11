package models

import (
	"context"
	"time"

	"google.golang.org/appengine/aetest"

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

type Reader interface {
	Rooms(offset, limit int) ([]*Room, error)
	Room(name string) (*Room, error)
}

type Writer interface {
	RunInTransaction(f func(tg *Model) error, opts *datastore.TransactionOptions) error
	PostRoom(name, description string) (*datastore.Key, error)
}

type Model struct {
	*goon.Goon
	goaContext       context.Context
	appEngineContext context.Context
}

var _ Reader = &Model{}
var _ Writer = &Model{}

func New(ctx context.Context) *Model {
	r := goa.ContextRequest(ctx).Request
	a := appengine.NewContext(r)
	g := goon.FromContext(a)
	return &Model{
		Goon:             g,
		goaContext:       ctx,
		appEngineContext: a,
	}
}

func FromAppEngineCTX(ctx context.Context) *Model {
	g := goon.FromContext(ctx)
	return &Model{
		Goon:             g,
		goaContext:       nil,
		appEngineContext: ctx,
	}
}

// TestContext is testTool
func TestContext() (*Model, func(), error) {
	c, done, err := aetest.NewContext()

	if err != nil {
		return nil, nil, err
	}
	return FromAppEngineCTX(c), done, nil
}

// RunInTransaction is Transaction wrapper
func (m *Model) RunInTransaction(f func(tg *Model) error, opts *datastore.TransactionOptions) error {
	return m.Goon.RunInTransaction(
		func(tg *goon.Goon) error {
			m := &Model{
				Goon: tg,
			}
			return f(m)
		}, opts)
}

// Room is get Room
func (m *Model) Room(name string) (*Room, error) {
	room := &Room{
		Name: name,
	}
	err := m.Get(room)
	if err != nil {
		return nil, err
	}
	return room, nil
}

func (m *Model) ForceApply(key *datastore.Key) {
	ctx := m.appEngineContext
	var dst interface{}
	datastore.Get(ctx, key, &dst)
	_ = dst
}

// Rooms is get Room List
func (m *Model) Rooms(offset int, limit int) ([]*Room, error) {
	var rooms []*Room
	_, err := m.GetAll(datastore.NewQuery("Room"), &rooms)
	if err != nil {
		return nil, err
	}

	if limit > len(rooms) {
		limit = len(rooms)
	}
	if offset > len(rooms) {
		offset = 0
	}

	return rooms[offset:limit], nil
}

// PostRoom is post Room Data
func (m *Model) PostRoom(name, description string) (*datastore.Key, error) {
	room := &Room{
		Name:        name,
		Description: description,
		Created:     time.Now(),
	}
	key, err := m.Put(room)
	if err != nil {
		return nil, err
	}

	return key, nil
}
