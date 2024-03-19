package model

import (
	"time"
)

type SchoolYear string

const (
	FirstYear  SchoolYear = "first-year"
	SecondYear SchoolYear = "second-year"
	ThirdYear  SchoolYear = "third-year"
	FourthYear SchoolYear = "fourth-year"
)

type Role string

const (
	Committee Role = "committee"
	Attendee  Role = "attendee"
)

type Student struct {
	ID           int `gorm:"primaryKey"`
	Name         string
	Surname      string
	School        string
	Year         SchoolYear
	IsCheckin    bool
	IsCheckout   bool
	TimeCheckin  time.Time
	TimeCheckout time.Time
	Role         Role
	// this field is for lottery
	IsComittee      bool
	IsLuckyAttendee bool // if student already have been choose by system to play lottery, this field turn to true then cannot choose again
}
