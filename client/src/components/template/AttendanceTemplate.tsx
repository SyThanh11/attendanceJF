import { Button, Col, Input, Row } from 'antd';
import '../style.scss';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Student } from 'constant';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { attendanceStudentThunk, getStudentListThunk } from 'store/manageStudent/thunk';

const ITEMS_PER_PAGE = 6;

export const AttendanceTemplate = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [displayedStudents, setDisplayedStudents] = useState([]);
  const [studentInfo, setStudentInfo] = useState<Student>({
    student_id: '0',
    name: '',
    school: '',
    year: ''
  });
  const dispatch = useAppDispatch();

  const studentList: Student[] = useSelector((state: RootState) => state.manageStudent.studentList)
  const totalPages = 1 + Math.round(studentList.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const filteredStudents = searchText !== '' ? 
      studentList.filter(student => student.student_id.toString().includes(searchText)) :
      studentList;
  
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const studentsOnCurrentPage = filteredStudents.slice(startIndex, endIndex);
    
    setDisplayedStudents(studentsOnCurrentPage);
  }, [studentList, currentPage, searchText]);

  useEffect(() => {
    dispatch(getStudentListThunk())
  }, [dispatch])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="AttendanceTemplate h-[100vh] bg-[#F6F3F1]">
      <Row className='h-full z-10'>
        <Col span={11} className='flex flex-col items-center border-r-2'>
          <div className='top h-[15%] w-full'>
            <div style={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }} className='logo flex items-center justify-center bg-white h-[80%] w-full'>
              <img src="" alt="" />
              <h1 style={{
                fontFamily: 'Potta One'
              }} className='font-medium text-[50px] text-[#FEB602]'>CHECK-OUT</h1>
            </div>
          </div>
          <div className='center h-[30%] w-full flex justify-center items-center relative'>
            <div className='ovelay' style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              backgroundColor: '#FEB60247',
              opacity: '80%',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              textAlign: 'center',
              lineHeight: '180px',
              transform: 'translate(-50%, -50%)'
            }}>
            </div>
            <img src="/image/starOrange.png" alt="starOrange" style={{
              width: '30%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}/>
          </div>
          <div className='button flex w-full justify-center'>
            <Button style={{
              borderRadius: '10px'
            }} className='w-[15%] mt-4 py-[20px] bg-[#86A1E7] font-bold text-white text-[14px] flex items-center justify-center'>CHECK-OUT</Button>
          </div>  
          <div className='bottom bg-white w-[55%] mt-8' style={{
            borderRadius: '15px',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          }}>
            <p>Họ và tên: {studentInfo?.name}</p>
            <hr />
            <p>MSSV: {studentInfo?.student_id === '0' ? '' : studentInfo?.student_id}</p>
            <hr />
            <p>Trường: {studentInfo?.school}</p>
            <hr />
            <p>Niên khóa: {studentInfo?.year}</p>
          </div>
        </Col>
        <Col span={13}>
          <div className='top logo h-[10%]'></div>
          <div className='title flex items-center justify-between'>
            <h1 className='text-[40px] pl-4 font-medium text-[#FEB602]' style={{
              fontFamily: 'Potta One'
            }}>Attendance list</h1>
            <Input className='w-[16%] mr-16 flex justify-center items-center' style={{
              border: '3px solid black',
              borderRadius: '20px',
            }} size="large" placeholder="MSSV" suffix={<SearchOutlined className='text-[24px] font-bold'/>} onChange={handleSearch} />
          </div>
          <div className='content mt-4'>
            {
              displayedStudents.map((student, index) => (
                <div key={index} className='item flex items-center justify-between h-[75px] bg-white border-b-[3px]'>
                  <div className='left flex flex-col ml-10'>
                    <h2 className='text-left text-[20px]'>{student.name}</h2>
                    <h3 className='text-left text-[16px] text-gray-500'>{student.student_id}</h3>
                  </div>
                  <div className='right flex items-center'>
                    <Button onClick={() => { 
                      setStudentInfo(student)
                      dispatch(attendanceStudentThunk({
                       id: student.student_id 
                      })).then(() => { 
                        dispatch(getStudentListThunk())
                      })
                    }} style={{
                    borderRadius: '10px',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                    }} className='mr-16 py-[20px] font-bold text-[#86A1E7] border-2 border-[#86A1E7] text-[14px] flex items-center justify-center z-20'>CHECK-OUT
                    </Button>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="pagination flex items-center justify-end mr-6 mt-4">
            <Button className='z-30 mr-4 bg-[#FF6C22] font-medium text-white text-[16px] flex items-center justify-center !hover:cursor-pointer' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button className='z-30 bg-[#FF6C22] font-medium text-white text-[16px] flex items-center justify-center !hover:cursor-pointer' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
              Next
            </Button>
          </div>
        </Col>
      </Row>
      <footer className="footer relative z-0">
        <img src="/image/sun.png" alt="sun" style={{
              position: "absolute",
              bottom: -220,
              left: -67,  
              width: "28%",
              zIndex: 0
        }}/>
        <img src="/image/wave.png" alt="wave" style={{
            position: "absolute",
            bottom: -90,
            width: "100%",
            zIndex: 0
        }}/>
    </footer>
    </div>
  )
}

export default AttendanceTemplate