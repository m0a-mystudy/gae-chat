package models

import (
	"context"

	"google.golang.org/appengine"

	"github.com/goadesign/goa"

	"github.com/mjibson/goon"
	"google.golang.org/appengine/datastore"
)

// // Tag はタグ情報を締めす
// type Tag struct {
// 	Name  string `datastore:"-" goon:"id"`
// 	Count int64
// }

// Loader is readonly methods interface
type Loader interface {
	Rooms(offset, limit int) ([]*Room, error)
	Room(name string) (*Room, error)

	Messages(roomName string, offset, limit int) ([]*Message, error)
	MessagesByCursor(roomName string, cursor *string) ([]*Message, *string, error)
	Message(roomName string, messageID int64) (*Message, error)

	Login(googleUserID string) (*Login, error)
	LoginFromJWTContext(ctx context.Context) (*Login, error)
}

// Saver is writeonly methods interface
type Saver interface {
	RunInTransaction(f func(tg *Model) error, opts *datastore.TransactionOptions) error

	PostRoom(name, description string) (*datastore.Key, error)

	PostMessage(roomName, googleUserID, content string) (*datastore.Key, error)

	PostLogin(googleUserID, email, name string, picture []byte) (*datastore.Key, error)
}

// LoadSaver is model interface
type LoadSaver interface {
	// Initializer
	Loader
	Saver
	Converter
}

// Model は メソッド集約用構造体
type Model struct {
	*goon.Goon
	ctx context.Context
}

var _ LoadSaver = &Model{}

// New is 新規Model作成
func New(ctx context.Context) LoadSaver {
	r := goa.ContextRequest(ctx).Request
	ctx = appengine.WithContext(ctx, r)
	g := goon.FromContext(ctx)
	return &Model{
		Goon: g,
		ctx:  ctx,
	}
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

// ForceApply は主にテスト用に利用。結果整合性のために書き込んだ結果がテスト実行中に反映されない問題を解決する(テスト専用)
func (m *Model) ForceApply(key *datastore.Key) {
	ctx := m.ctx
	var dst interface{}
	datastore.Get(ctx, key, &dst)
	_ = dst
}

// roomKey によってKeyを生成する
func (m *Model) roomKey(roomName string) *datastore.Key {
	return datastore.NewKey(m.ctx, "Room", roomName, 0, nil)
}

// loginKey によってKeyを生成する
func (m *Model) loginKey(googleUserID string) *datastore.Key {
	return datastore.NewKey(m.ctx, "Login", googleUserID, 0, nil)
}
