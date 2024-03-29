package model

import (
	"time"
)

type Role string

const (
	Committee Role = "committee"
	Attendee  Role = "attendee"
)

type Student struct {
	ID           string `gorm:"primaryKey"`
	Name         string
	School       string
	IsCheckin    bool
	IsCheckout   bool
	TimeCheckin  time.Time
	TimeCheckout time.Time
	// this field is for lottery
	IsComittee      bool
	IsLuckyAttendee bool // if student already have been choose by system to play lottery, this field turn to true then cannot choose again
}
