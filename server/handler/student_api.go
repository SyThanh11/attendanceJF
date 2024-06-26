package handler

import (
	"attendanceJF/pkg"

	"github.com/gin-gonic/gin"
)

// GetAttendanceList send list of attendance (checkin).
//
// Endpoint: /api/get-attendance-list [GET]
//
// Response:
//   - 200: [{"student-id", "surname", "name", "school", "year"}]
//   - 500: general failure
func (h *HTTPAPIHandler) GetAttendanceList(c *gin.Context) {
	attendanceList, err := h.StudentUsecase.GetAttendanceList()
	if err != nil {
		responseBadRequestError(c, pkg.ParseError(err))
		return
	}

	responseSuccess(c, attendanceList)
}

// GetCheckoutList send list of checkout attendee.
//
// Endpoint: /api/get-attendance-list [GET]
//
// Response:
//   - 200: [{"student-id", "surname", "name", "class", "year"}]
//   - 500: general failure
func (h *HTTPAPIHandler) GetCheckOutList(c *gin.Context) {
	checkoutList, err := h.StudentUsecase.GetCheckOutList()
	if err != nil {
		responseBadRequestError(c, pkg.ParseError(err))
		return
	}

	responseSuccess(c, checkoutList)
}

type StudentIDReq struct {
	ID string `json:"id"`
}

// HandleCheckInOut is used to handle for student checkin or checkout
//
// Endpoint: /api/checkin-out/{id} [PUT]
//
// This api retrieves the value of "id" parameter from URL path
//
// Response:
//   - 200: "checkin" or "checkout"
//   - 400 "binding failure": no id parameter found in URL
//   - 400 "invalid data": id provided is wrong syntax
//   - 500: server error
func (h *HTTPAPIHandler) HandleCheckInOut(c *gin.Context, connectionManager *ConnectionManager) {
	var req StudentIDReq

	err := c.ShouldBind(&req)
	if err != nil {
		responseBadRequestError(c, pkg.InvalidData)
	}

	// id, err := strconv.Atoi(req.ID)
	// if err != nil {
	// 	responseBadRequestError(c, pkg.InvalidData)
	// 	return
	// }

	student, err := h.StudentUsecase.HandleCheckInOut(req.ID)
	if err != nil {
		responseServerError(c, pkg.ParseError(err))
		return
	}

	responseSuccess(c, student)

	connectionManager.AddMessage(student) 
}

// GetLuckyAttendeeList provide list of attendees to play spinner lottery
//
// Endpoint: /api/get-lucky-attendee-list [GET]
//
// Response:
//   - 200: [{"student-id", "surname", "name", "class", "year"}]
//   - 500: server error
func (h *HTTPAPIHandler) GetLuckyAttendeeList(c *gin.Context) {
	ctx := c.Request.Context()

	luckyAttendanceList, err := h.StudentUsecase.GetLuckyAttendeeList(ctx)
	if err != nil {
		responseServerError(c, pkg.ParseError(err))
		return
	}

	responseSuccess(c, luckyAttendanceList)
}
