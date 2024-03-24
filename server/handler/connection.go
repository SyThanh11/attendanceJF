package handler

import (
	"attendanceJF/usecase"

	"github.com/gorilla/websocket"
)

type ConnectionManager struct {
	clients    map[*websocket.Conn]bool
	register   chan *websocket.Conn
	unregister chan *websocket.Conn
	broadcast  chan CheckinMessage
}

type CheckinMessage struct {
	StudentInfo usecase.StudentInfo
}

func NewConnectionManager() *ConnectionManager {
	return &ConnectionManager{
		clients:    make(map[*websocket.Conn]bool),
		register:   make(chan *websocket.Conn),
		unregister: make(chan *websocket.Conn),
		broadcast:  make(chan CheckinMessage),
	}
}

func (manager *ConnectionManager) Start() {
	for {
		select {
		case connection := <-manager.register:
			manager.clients[connection] = true
		case connection := <-manager.unregister:
			if _, ok := manager.clients[connection]; ok {
				delete(manager.clients, connection)
				connection.Close()
			}
		case message := <-manager.broadcast:
			for connection := range manager.clients {
				err := connection.WriteJSON(message)
				if err != nil {
					connection.Close()
					delete(manager.clients, connection)
				}
			}
		}
	}
}

func (manager *ConnectionManager) AddClient(client *websocket.Conn) {
	// manager.clients[client] = true
	manager.register <- client
}

func (manager *ConnectionManager) RemoveClient(client *websocket.Conn) {
	// delete(manager.clients, client)
	manager.unregister <- client
}

func (manager *ConnectionManager) AddMessage(student *usecase.StudentInfo) {
	manager.broadcast <- CheckinMessage{*student}
}
