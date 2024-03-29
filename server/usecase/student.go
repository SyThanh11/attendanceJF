package usecase

import (
	"attendanceJF/model"
	"attendanceJF/repository"
	"context"
	"time"
)

type StudentUsecase interface {
	GetAttendanceList() ([]*StudentInfo, error)
	GetCheckOutList() ([]*StudentInfo, error)
	HandleCheckInOut(student int) (*StudentInfo, error)
	GetLuckyAttendeeList(ctx context.Context) ([]*StudentInfo, error)
	GetCount() (int, error)
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
	StudentID  int              `json:"student_id"`
	Name       string           `json:"name"`
	Surname    string           `json:"surname"`
	School     string           `json:"school"`
	Year       model.SchoolYear `json:"year"`
	IsCheckin  bool             `json:"is_checkin"`
	IsCheckout bool             `json:"is_checkout"`
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
				StudentID:  student.ID,
				Name:       student.Name,
				School:     student.School,
				Year:       student.Year,
				IsCheckin:  student.IsCheckin,
				IsCheckout: student.IsCheckout,
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
				StudentID:  student.ID,
				Name:       student.Name,
				School:     student.School,
				Year:       student.Year,
				IsCheckin:  student.IsCheckin,
				IsCheckout: student.IsCheckout,
			})
		}
	}

	return checkOutList, nil
}

// type Status string

// const (
// 	CheckIn  Status = "checkin"
// 	CheckOut Status = "checkout"
// )

func (u *studentUsecaseImpl) HandleCheckInOut(studentID int) (*StudentInfo, error) {
	// var status Status

	student, err := u.studentRepository.FindByID(studentID)
	if err != nil {
		return nil, err
	}

	currentTime := time.Now()

	if !student.IsCheckin {
		student.IsCheckin = true
		student.TimeCheckin = currentTime

		err = u.studentRepository.Update(student)
		if err != nil {
			return nil, err
		}

		// status = CheckIn
	} else if !student.IsCheckout {
		// duration := currentTime.Sub(student.TimeCheckin)
		// if duration < time.Hour {
		// 	return "", errors.New("attendance not enough time")
		// }

		student.IsCheckout = true
		student.TimeCheckout = currentTime

		err = u.studentRepository.Update(student)
		if err != nil {
			return nil, err
		}

		// status = CheckOut
	}

	return &StudentInfo{
		StudentID:  student.ID,
		Name:       student.Name,
		School:     student.School,
		Year:       student.Year,
		IsCheckin:  student.IsCheckin,
		IsCheckout: student.IsCheckout,
	}, nil
}

func (u *studentUsecaseImpl) GetLuckyAttendeeList(ctx context.Context) ([]*StudentInfo, error) {
	luckyAttendeeList := make([]*StudentInfo, 0)
	var luckyAttendee *model.Student
	var err error

	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	for i := 0; i < 10; i++ {
		select {
		case <-ctx.Done():
			return luckyAttendeeList, nil
		default:
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
					Name:      luckyAttendee.Name,
					School:    luckyAttendee.School,
					Year:      luckyAttendee.Year,
				})
			} else {
				i--
			}
		}
	}

	return luckyAttendeeList, nil
}

func (u *studentUsecaseImpl) GetCount() (int, error) {
	count, err := u.studentRepository.Count()
	if err != nil {
		return 0, err
	}

	return count, nil
}
