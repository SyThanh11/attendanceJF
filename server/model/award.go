package model

type PrizeLevel string

var (
	FirstPrize       PrizeLevel = "first_prize"
	SecondPrize      PrizeLevel = "second_prize"
	ThirdPrize       PrizeLevel = "third_prize"
	ConsolationPrize PrizeLevel = "consolation_prize"
)

type Award struct {
	Student    Student
	PrizeLevel PrizeLevel
	Type       string
}
