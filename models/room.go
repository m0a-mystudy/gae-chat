package models

import (
	"time"

	"google.golang.org/appengine/datastore"
)

// Room はチャットのルームを示します。
type Room struct {
	Name string `datastore:"-" goon:"id"`
	// Tags        []string
	Description string
	Created     time.Time
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
