package repository

import (
	"attendanceJF/model"

	"gorm.io/gorm"
)

type AwardRepository interface {
	FindByType(awardType string) (*[]model.Award, error)
}

type awardRepositoryImpl struct {
	db *gorm.DB
}

func NewAwardRepository(db *gorm.DB) AwardRepository {
	return &awardRepositoryImpl{
		db: db,
	}
}

func (repo awardRepositoryImpl) FindByType(awardType string) (*[]model.Award, error) {
	var award []model.Award
	err := repo.db.Preload("Student").Where("type = ?", awardType).Find(&award).Error
	if err != nil {
		return nil, err
	}

	return &award, nil
}