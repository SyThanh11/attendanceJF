package handler

import (
	"attendanceJF/pkg"
	"attendanceJF/usecase"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetAttendanceList send list of attendance (checkin).
//
// Endpoint: /api/get-attendance-list [GET]
//
// Response:
//   - 200: [{"student-id", "surname", "name", "class", "year"}]
//   - 500: general failure
func (h *AttendanceJFHandler) GetAttendanceList(c *gin.Context) {
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
func (h *AttendanceJFHandler) GetCheckOutList(c *gin.Context) {
	checkoutList, err := h.StudentUsecase.GetCheckOutList()
	if err != nil {
		responseBadRequestError(c, pkg.ParseError(err))
		return
	}

	responseSuccess(c, checkoutList)
}

// HandleCheckInOut is used to handle for student checkin or checkout
//
// Endpoint: /api/checkin-out/{id} [PUT]
//
// This api retrieves the value of "id" parameter from URL path
//
// Response:
//	- 200: "checkin" or "checkout"
//	- 400 "binding failure": no id parameter found in URL
//	- 400 "invalid data": id provided is wrong syntax
// 	- 500: server error
func (h *AttendanceJFHandler) HandleCheckInOut(c *gin.Context) {
	idStr := c.Param("id")
	if idStr == "" {
		responseBadRequestError(c, pkg.BindingFailure)
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		responseBadRequestError(c, pkg.InvalidData)
		return
	}

	status, err := h.StudentUsecase.HandleCheckInOut(int(id))
	if err != nil {
		responseServerError(c, pkg.ParseError(err))
		return
	}

	if status == usecase.CheckIn {
		responseSuccess(c, "checkin")
		return
	} else if status == usecase.CheckOut {
		responseSuccess(c, "checkout")
		return
	}
}

// GetLuckyAttendeeList provide list of attendees to play spinner lottery
//
// Endpoint: /api/get-lucky-attendee-list [GET]
//
// Response: 
//	- 200: [{"student-id", "surname", "name", "class", "year"}]
//	- 500: server error
func (h *AttendanceJFHandler) GetLuckyAttendeeList(c *gin.Context) {
	luckyAttendanceList, err := h.StudentUsecase.GetLuckyAttendeeList()
	if err != nil {
		responseServerError(c, pkg.ParseError(err))
		return
	}

	responseSuccess(c, luckyAttendanceList)
}
