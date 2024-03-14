package repository

import (
	"attendanceJF/model"

	"gorm.io/gorm"
)

type StudentRepository interface {
	Create(student *model.Student) error
	Update(student *model.Student) error
	Delete(student *model.Student) error
	FindByID(id int) (*model.Student, error)
	FindAll() ([]model.Student, error)
	FindRandom() (*model.Student, error)
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

func (repo *studentRepositoryImpl) FindByID(id int) (*model.Student, error) {
	var student model.Student
	err := repo.db.First(&student, id).Error
	if err != nil {
		return nil, err
	}

	return &student, nil
}

func (repo *studentRepositoryImpl) FindAll() ([]model.Student, error) {
	var student []model.Student
	err := repo.db.Find(&student).Error
	if err != nil {
		return nil, err
	}

	return student, nil
}

func (repo *studentRepositoryImpl) FindRandom() (*model.Student, error) {
	var student model.Student
	err := repo.db.Order("RANDOM()").First(&student).Error
	if err != nil {
		return nil, err
	}
	return &student, nil
}
