package models

import (
	"time"

	"google.golang.org/appengine/datastore"
)

// Message はチャットのメッセージを示します。Roomが親になります
type Message struct {
	ID      int64          `datastore:"-" goon:"id"`
	Room    *datastore.Key `datastore:"-" goon:"parent"`
	Auther  *datastore.Key
	Content string `datastore:",noindex"`
	Created time.Time
}

// Message is get Message
func (m *Model) Message(roomName string, messageID int64) (*Message, error) {

	message := &Message{
		ID:   messageID,
		Room: m.roomKey(roomName),
	}

	err := m.Get(message)
	if err != nil {
		return nil, err
	}
	return message, nil
}

// Messages はMessageの一覧取得
func (m *Model) Messages(roomName string, offset, limit int) ([]*Message, error) {
	var messages []*Message
	query := datastore.NewQuery("Message").Ancestor(m.roomKey(roomName)).Order("Created")
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

// PostMessage Message登録処理
func (m *Model) PostMessage(roomName, googleUserID, content string) (*datastore.Key, error) {
	roomKey := m.roomKey(roomName)
	message := &Message{
		Room:    roomKey,
		Auther:  m.loginKey(googleUserID),
		Content: content,
		Created: time.Now(),
	}
	key, err := m.Put(message)
	if err != nil {
		return nil, err
	}

	return key, nil
}
