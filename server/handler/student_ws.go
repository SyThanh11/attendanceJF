package handler

import (
	"attendanceJF/pkg"
	"attendanceJF/usecase"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var wsUprader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (h *RealtimeHandler) CheckInRealtimeHandler(c *gin.Context, connectionManger *ConnectionManager) {
	conn, err := wsUprader.Upgrade(c.Writer, c.Request, nil)

	if err != nil {
		fmt.Print("oops")
		responseBadRequestError(c, pkg.BindingFailure)
		return
	}
	defer conn.Close()

	currentCount, err := h.studentUsecase.GetCount()
	if err != nil {
		responseServerError(c, pkg.ParseError(err))
		return
	}

	currentList, err := h.studentUsecase.GetAttendanceList()
	if err != nil {
		responseServerError(c, pkg.ParseError(err))
		return
	}
	if len(currentList) > 5 {
		currentList = currentList[:5]
	}

	currenState := struct {
		Count       int                    `json:"count"`
		StudentList []*usecase.StudentInfo `json:"student_list"`
	}{
		Count:       currentCount,
		StudentList: currentList,
	}

	conn.WriteJSON(currenState)
	// responseSuccess(c, currenState)

	connectionManger.AddClient(conn)
	defer connectionManger.RemoveClient(conn)

	// connectionManger.register <- conn
	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			log.Print("websocket disconnected")
			break
		}
	}
}
