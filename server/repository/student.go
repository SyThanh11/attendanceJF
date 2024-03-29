package repository

import (
	"attendanceJF/model"

	"gorm.io/gorm"
)

type StudentRepository interface {
	Create(student *model.Student) error
	Update(student *model.Student) error
	Delete(student *model.Student) error
	FindByID(id string) (*model.Student, error)
	FindAll() ([]model.Student, error)
	FindRandom() (*model.Student, error)
	Count() (int, error)
}

type studentRepositoryImpl struct {
	db *gorm.DB
}

func NewStudentRepository(db *gorm.DB) StudentRepository {
	return &studentRepositoryImpl{
		db: db,
	}
}

func (repo *studentRepositoryImpl) Create(student *model.Student) error {
	return repo.db.Create(student).Error
}

func (repo *studentRepositoryImpl) Update(student *model.Student) error {
	return repo.db.Save(student).Error
}

func (repo *studentRepositoryImpl) Delete(student *model.Student) error {
	return repo.db.Delete(student).Error
}

func (repo *studentRepositoryImpl) FindByID(id string) (*model.Student, error) {
	var student model.Student
	err := repo.db.First(&student, id).Error
	if err != nil {
		return nil, err
	}

	return &student, nil
}

func (repo *studentRepositoryImpl) FindAll() ([]model.Student, error) {
	var student []model.Student
	err := repo.db.Order("time_checkin DESC").Find(&student).Error
	if err != nil {
		return nil, err
	}

	return student, nil
}

func (repo *studentRepositoryImpl) FindRandom() (*model.Student, error) {
	var student model.Student
	err := repo.db.Where("is_checkin = ?", true).Order("RANDOM()").First(&student).Error
	if err != nil {
		return nil, err
	}
	return &student, nil
}

func (repo *studentRepositoryImpl) Count() (int, error) {
	var count int64
	if err := repo.db.Model(&model.Student{}).Where("is_checkin = ?", true).Count(&count).Error; err != nil {
		return 0, err
	}

	return int(count), nil
}
