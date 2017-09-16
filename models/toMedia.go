package models

import (
	"github.com/m0a-mystudy/gae-chat/app"
)

type Converter interface {
	ToMessageCollectionMedia(m []*Message) *app.MessageCollection
	ToMessageMedia(m *Message) *app.Message
}

var _ Converter = &Model{}

// ToMessageCollectionMedia is translater
func (m *Model) ToMessageCollectionMedia(mes []*Message) *app.MessageCollection {
	res := app.MessageCollection{}
	for _, v := range mes {
		res = append(res, m.ToMessageMedia(v))
	}
	return &res
}

// ToMessageMedia is translater from models to app
func (m *Model) ToMessageMedia(mes *Message) *app.Message {
	// auther := &Login{}

	// err := datastore.Get(m.appEngineContext, mes.Auther., &auther)
	// if err != nil {
	// 	fmt.Printf("%#v", err)
	// }

	return &app.Message{
		ID:      int(mes.ID),
		Auther:  mes.Auther.StringID(),
		Content: mes.Content,
		Created: mes.Created,
	}
}
