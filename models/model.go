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
	ID      int64          `datastore:"-" goon:"id"`
	Room    *datastore.Key `datastore:"-" goon:"parent"`
	Auther  *datastore.Key
	Content string `datastore:",noindex"`
	Created time.Time
}

// Tag はタグ情報を締めす
type Tag struct {
	Name  string `datastore:"-" goon:"id"`
	Count int64
}

// type Initializer interface {
// 	SetContext(goaCTX context.Context)
// }
type Loader interface {
	Rooms(offset, limit int) ([]*Room, error)
	Room(name string) (*Room, error)

	Messages(roomName string, offset, limit int) ([]*Message, error)
	Message(roomName string, messageID int64) (*Message, error)

	Login(googleUserID string) (*Login, error)
}

type Saver interface {
	RunInTransaction(f func(tg *Model) error, opts *datastore.TransactionOptions) error

	PostRoom(name, description string) (*datastore.Key, error)

	PostMessage(roomName, googleUserID, content string) (*datastore.Key, error)

	PostLogin(googleUserID, email, name string, picture []byte) (*datastore.Key, error)
}

type LoadSaver interface {
	// Initializer
	Loader
	Saver
}

type Model struct {
	*goon.Goon
	goaContext       context.Context
	appEngineContext context.Context
}

var _ LoadSaver = &Model{}

func New(ctx context.Context) LoadSaver {
	r := goa.ContextRequest(ctx).Request
	a := appengine.NewContext(r)
	g := goon.FromContext(a)
	return &Model{
		Goon:             g,
		goaContext:       ctx,
		appEngineContext: a,
	}
}

func FromAppEngineCTX(ctx context.Context) LoadSaver {
	g := goon.FromContext(ctx)
	return &Model{
		Goon:             g,
		goaContext:       nil,
		appEngineContext: ctx,
	}
}

// TestContext is testTool
func TestContext() (LoadSaver, func(), error) {
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

func (m *Model) RoomKey(roomName string) *datastore.Key {
	return datastore.NewKey(m.appEngineContext, "Room", roomName, 0, nil)
}

func (m *Model) LoginKey(googleUserID string) *datastore.Key {
	return datastore.NewKey(m.appEngineContext, "Login", googleUserID, 0, nil)
}

// Message is get Message
func (m *Model) Message(roomName string, messageID int64) (*Message, error) {

	message := &Message{
		ID:   messageID,
		Room: m.RoomKey(roomName),
	}

	err := m.Get(message)
	if err != nil {
		return nil, err
	}
	return message, nil
}

func (m *Model) Messages(roomName string, offset, limit int) ([]*Message, error) {
	var messages []*Message
	query := datastore.NewQuery("Message").Ancestor(m.RoomKey(roomName))
	_, err := m.GetAll(query, &messages)
	if err != nil {
		return nil, err
	}

	if limit > len(messages) {
		limit = len(messages)
	}
	if offset > len(messages) {
		offset = 0
	}

	return messages[offset:limit], nil
}

func (m *Model) PostMessage(roomName, googleUserID, content string) (*datastore.Key, error) {
	roomKey := m.RoomKey(roomName)
	message := &Message{
		Room:    roomKey,
		Auther:  m.LoginKey(googleUserID),
		Content: content,
		Created: time.Now(),
	}
	key, err := m.Put(message)
	if err != nil {
		return nil, err
	}

	return key, nil
}

func (m *Model) Login(googleUserID string) (*Login, error) {
	login := &Login{
		GoogleLoginID: googleUserID,
	}
	err := m.Get(login)
	if err != nil {
		return nil, err
	}
	return login, nil
}
func (m *Model) PostLogin(googleUserID, email, name string, picture []byte) (*datastore.Key, error) {

	newLogin := &Login{
		GoogleLoginID: googleUserID,
		Email:         email,
		Name:          name,
		LastLogin:     time.Now(),
		Picture:       picture,
	}
	key, err := m.Put(newLogin)
	if err != nil {
		return nil, err
	}
	return key, nil
}
