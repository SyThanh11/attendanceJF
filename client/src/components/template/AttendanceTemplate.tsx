import { Button, Col, Input, Row } from 'antd';
import '../style.scss';
import { SearchOutlined } from '@ant-design/icons';


export const AttendanceTemplate = () => {

  const data = [
    { key: '1', fullName: 'Student 1', MSSV: '2110002' },
    { key: '2', fullName: 'Student 2', MSSV: '2110002' },
    { key: '3', fullName: 'Student 3', MSSV: '2110003' },
    { key: '4', fullName: 'Student 4', MSSV: '2110004' },
    { key: '5', fullName: 'Student 5', MSSV: '2110005' },
    { key: '6', fullName: 'Student 6', MSSV: '2110006' },
    { key: '7', fullName: 'Student 6', MSSV: '2110007' }
  ]

  return (
    <div className="AttendanceTemplate h-[100vh] bg-[#F6F3F1]">
      <Row className='h-full'>
        <Col span={11} className='flex flex-col items-center border-r-2'>
          <div className='top h-[15%] w-full'>
            <div style={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }} className='logo flex items-center justify-center bg-white h-[80%] w-full'>
              <img src="" alt="" />
              <h1 style={{
                fontFamily: 'Potta One'
              }} className='font-medium text-[50px] text-[#FEB602]'>CHECK-IN</h1>
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
            <p>Họ và tên:</p>
            <hr />
            <p>MSSV:</p>
            <hr />
            <p>Lớp:</p>
            <hr />
            <p>Niên khóa:</p>
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
            }} size="large" placeholder="MSSV" suffix={<SearchOutlined className='text-[24px] font-bold'/>} />
          </div>
          <div className='content mt-4'>
            {
              data.map((student) => (
                <div key={student.key} className='item flex items-center justify-between h-[75px] bg-white border-b-[3px]'>
                  <div className='left flex flex-col ml-10'>
                    <h2 className='text-left text-[20px]'>{student.fullName}</h2>
                    <h3 className='text-left text-[16px] text-gray-500'>{student.MSSV}</h3>
                  </div>
                  <div className='right flex items-center'>
                    <Button style={{
                    borderRadius: '10px',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                    }} className='mr-16 py-[20px] font-bold text-[#86A1E7] border-2 border-[#86A1E7] text-[14px] flex items-center justify-center'>CHECK-OUT
                    </Button>
                  </div>
                </div>
              ))
            }
          </div>
        </Col>
      </Row>
      <footer className="footer relative">
        <img src="/image/sun.png" alt="sun" style={{
              position: "absolute",
              bottom: -220,
              left: -67,  
              width: "28%",
        }}/>
        <img src="/image/wave.png" alt="wave" style={{
            position: "absolute",
            bottom: -90,
            width: "100%",
        }}/>
    </footer>
  )
    </div>
  )
}

export default AttendanceTemplate