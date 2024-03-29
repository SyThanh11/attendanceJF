package usecase

import (
	"attendanceJF/model"
	"attendanceJF/repository"
)

type PrizeUsecase interface {
}

type prizeUsecaseImpl struct {
	StudentRepository repository.StudentRepository
	AwardRepository repository.AwardRepository
}

func NewPrizeUsecase(
	studentRepository repository.StudentRepository,
	awardRepository repository.AwardRepository,
) PrizeUsecase {
	return &prizeUsecaseImpl{
		StudentRepository: studentRepository,
		AwardRepository: awardRepository,
	}
}

// func (u *prizeUsecaseImpl) UpdateAward(student StudentInfo, typePrize string, prizeLevel string) error {
	
// }

func (u *prizeUsecaseImpl) GetAwardList(prizeType string) ([]model.Award, error) {
	awardList, err := u.AwardRepository.FindByType(prizeType)
	if err != nil {
		return nil, err
	}

	return *awardList, nil
}