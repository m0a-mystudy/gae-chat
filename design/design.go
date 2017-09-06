package design

import (
	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var JWT = JWTSecurity("jwt", func() {
	Header("Authorization")
	Scope("api:access", "API access") // Define "api:access" scope
})

var _ = API("GAE Chat API", func() {
	Title("goa study chat") // Documentation title
	Description("goa study chat api")
	Host("localhost:8080")
	Scheme("http")
	BasePath("/api")
	Origin("http://test.com:3000", func() {
		Methods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
		Headers("Origin", "X-Requested-With", "Content-Type", "Accept",
			"X-Csrftoken", "Authorization")
		// Expose("Authorization")
	})
	ResponseTemplate(Created, func(pattern string) {
		Description("Resource created")
		Status(201)
		Headers(func() {
			Header("Location", String, "href to created resource", func() {
				Pattern(pattern)
			})
		})
	})
})

var _ = Resource("room", func() {
	DefaultMedia(Room)
	BasePath("/rooms")
	Action("list", func() {
		Routing(GET(""))
		Description("Retrieve all rooms.")
		Params(func() {
			Param("limit", Integer)
			Param("offset", Integer)
		})
		Response(OK, CollectionOf(Room))
		Response(NotFound)
	})

	Action("show", func() {
		Routing(
			GET("/:name"),
		)
		Description("Retrieve room with given name")
		Params(func() {
			Param("name", String)
		})
		Response(OK)
		Response(NotFound)
		Response(BadRequest, ErrorMedia)
	})

	Action("post", func() {
		Routing(POST(""))
		Description("Create new Room")
		Payload(RoomPayload)
		Security(JWT, func() {
			Scope("api:access")
		})

		Response(Created, "/rooms/[0-9]+")
		Response(BadRequest, ErrorMedia)
	})

	// Action("watch", func() {
	// 	Routing(
	// 		GET("/:roomID/watch"),
	// 	)
	// 	Scheme("ws")
	// 	Description("Retrieve room with given id")
	// 	Params(func() {
	// 		Param("roomID", Integer)
	// 	})
	// 	Response(SwitchingProtocols)
	// 	Response(BadRequest, ErrorMedia)
	// })

})

var _ = Resource("message", func() {
	DefaultMedia(Message)
	BasePath("messages")
	Parent("room")
	Action("list", func() {
		Routing(GET(""))
		Description("Retrieve all messages.")
		Params(func() {
			Param("limit", Integer)
			Param("offset", Integer)
		})

		Response(OK, CollectionOf(MessageWithAccount))
		Response(NotFound)
	})
	Action("post", func() {
		Routing(POST(""))
		Description("Create new message")
		Security(JWT, func() {
			Scope("api:access")
		})

		Payload(MessagePayload)
		Response(Created, "^/rooms/[0-9]+/messages/[0-9]+$")
		Response(BadRequest)
	})

	Action("show", func() {
		Routing(
			GET("/:messageID"),
		)
		Description("Retrieve message with given id")
		Params(func() {
			Param("messageID", Integer)
		})
		Response(OK)
		Response(NotFound)
		Response(BadRequest, ErrorMedia)
	})

})

// var _ = Resource("account", func() {
// 	DefaultMedia(Account)
// 	BasePath("accounts")
// 	// Action("list", func() {
// 	// 	Routing(GET(""))
// 	// 	Description("Retrieve all accunts.")
// 	// 	Response(OK, CollectionOf(Account))
// 	// 	Response(NotFound)
// 	// })
// 	// Action("post", func() {
// 	// 	Routing(POST(""))
// 	// 	Description("Create new account")
// 	// 	Payload(MessagePayload)
// 	// 	Response(Created, "^/accounts/[0-9]+$")
// 	// 	Response(BadRequest)
// 	// })

// 	Action("show", func() {
// 		Routing(
// 			GET("/:googleUserID"),
// 		)
// 		Description("Retrieve account with given id or something")
// 		Params(func() {
// 			Param("googleUserID", String)
// 		})
// 		Response(OK)
// 		Response(NotFound)
// 		Response(BadRequest, ErrorMedia)
// 	})

// })

var MessageWithAccount = MediaType("application/vnd.message_with_account+json", func() {
	Description("A Message with account")

	Attributes(func() {
		Attribute("id", Integer)
		Attribute("body", String)
		Attribute("postDate", DateTime)
		Attribute("name", String)
		Attribute("email", String)
		Attribute("googleUserID", String)
		Attribute("image", String)
	})
	View("default", func() {
		Attribute("id")
		Attribute("body")
		Attribute("postDate")
		Attribute("name")
		Attribute("email")
		Attribute("googleUserID")
		Attribute("image")
	})
})

var Message = MediaType("application/vnd.message+json", func() {
	Description("A Message")
	Reference(MessagePayload)
	Attributes(func() {
		Attribute("googleUserID")
		Attribute("body")
		Attribute("postDate")
		Required("googleUserID", "body", "postDate")
	})
	View("default", func() {
		Attribute("googleUserID")
		Attribute("body")
		Attribute("postDate")
	})
})
var MessagePayload = Type("MessagePayload", func() {

	Attribute("googleUserID", String, func() {
		Example("12345678")
	})
	Attribute("body", func() {
		MinLength(1)
		MaxLength(400)
		Example("this is chat message")
	})
	Attribute("postDate", DateTime, func() {
		Default("1978-06-30T10:00:00+09:00")
	})

	Required("body", "postDate")
})

var Room = MediaType("application/vnd.room+json", func() {
	Description("A room")
	Reference(RoomPayload)
	Attributes(func() {
		Attribute("name")
		Attribute("description")
		Attribute("created")
		Required("name", "description", "created")
	})

	View("default", func() {
		Attribute("name")
		Attribute("description")
		Attribute("created")
	})
})

var RoomPayload = Type("RoomPayload", func() {
	Attribute("name", String, "Name of room", func() {
		Example("room001")
	})
	Attribute("description", String, "description of room", func() {
		Example("room description")
		MaxLength(400)
	})
	Attribute("created", DateTime, "Date of creation")
	Required("name", "description")
})

var Account = MediaType("application/vnd.account+json", func() {
	Description("A account")
	Reference(RoomPayload)
	Attributes(func() {
		Attribute("id", Integer)
		Attribute("googleUserID", String)
		Attribute("created", DateTime)
		Required("id", "googleUserID", "created")
	})

	View("default", func() {
		Attribute("id")
		Attribute("created")
	})
})
