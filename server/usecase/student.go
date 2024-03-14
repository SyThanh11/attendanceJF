package usecase

import (
	"attendanceJF/model"
	"attendanceJF/repository"
	"errors"
	"time"
)

type StudentUsecase interface {
	GetAttendanceList() ([]*StudentInfo, error)
	GetCheckOutList() ([]*StudentInfo, error)
	HandleCheckInOut(student int) (Status, error)
	GetLuckyAttendeeList() ([]*StudentInfo, error)
}

type studentUsecaseImpl struct {
	studentRepository repository.StudentRepository
}

func NewStudentUsecase(
	studentRepository repository.StudentRepository,
) StudentUsecase {
	return &studentUsecaseImpl{
		studentRepository: studentRepository,
	}
}

type StudentInfo struct {
	StudentID int
	Name      string
	Surname   string
	Class     string
	Year      model.SchoolYear
}

func (u *studentUsecaseImpl) GetAttendanceList() ([]*StudentInfo, error) {
	studentList, err := u.studentRepository.FindAll()
	if err != nil {
		return nil, err
	}

	attendanceList := make([]*StudentInfo, 0)
	for _, student := range studentList {
		if student.IsCheckin {
			attendanceList = append(attendanceList, &StudentInfo{
				StudentID: student.ID,
				Name:      student.Name,
				Surname:   student.Surname,
				Class:     student.Class,
				Year:      student.Year,
			})
		}
	}

	return attendanceList, nil
}

func (u *studentUsecaseImpl) GetCheckOutList() ([]*StudentInfo, error) {
	studentList, err := u.studentRepository.FindAll()
	if err != nil {
		return nil, err
	}

	checkOutList := make([]*StudentInfo, 0)
	for _, student := range studentList {
		if student.IsCheckout {
			checkOutList = append(checkOutList, &StudentInfo{
				StudentID: student.ID,
				Name:      student.Name,
				Surname:   student.Surname,
				Class:     student.Class,
				Year:      student.Year,
			})
		}
	}

	return checkOutList, nil
}

type Status string

const (
	CheckIn  Status = "checkin"
	CheckOut Status = "checkout"
)

func (u *studentUsecaseImpl) HandleCheckInOut(studentID int) (Status, error) {
	var status Status

	student, err := u.studentRepository.FindByID(studentID)
	if err != nil {
		return "", err
	}

	currentTime := time.Now()

	if !student.IsCheckin {
		student.IsCheckin = true
		student.TimeCheckin = currentTime

		err = u.studentRepository.Update(student)
		if err != nil {
			return "", err
		}

		status = CheckIn
	} else if !student.IsCheckout {
		duration := currentTime.Sub(student.TimeCheckin)
		if duration < time.Hour {
			return "", errors.New("attendance not enough time")
		}

		student.IsCheckout = true
		student.TimeCheckout = currentTime

		err = u.studentRepository.Update(student)
		if err != nil {
			return "", err
		}

		status = CheckOut
	}

	return status, nil
}

func (u *studentUsecaseImpl) GetLuckyAttendeeList() ([]*StudentInfo, error) {
	luckyAttendeeList := make([]*StudentInfo, 0)
	var luckyAttendee *model.Student
	var err error

	for i := 0; i < 10; i++ {
		luckyAttendee, err = u.studentRepository.FindRandom()
		if err != nil {
			return nil, err
		}

		if !luckyAttendee.IsLuckyAttendee && !luckyAttendee.IsComittee {
			luckyAttendee.IsLuckyAttendee = true
			if err = u.studentRepository.Update(luckyAttendee); err != nil {
				return nil, err
			}

			luckyAttendeeList = append(luckyAttendeeList, &StudentInfo{
				StudentID: luckyAttendee.ID,
				Surname:   luckyAttendee.Surname,
				Name:      luckyAttendee.Name,
				Class:     luckyAttendee.Class,
				Year:      luckyAttendee.Year,
			})
		} else {
			i--
		}
	}

	return luckyAttendeeList, nil
}
