import { Col, Row, Table } from "antd";
import { useEffect, useState } from "react";
import '../style.scss';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { attendanceStudentThunk, getStudentListThunk } from "store/manageStudent/thunk";
import useScanDetection from "use-scan-detection";
// import io from 'socket.io-client';

// const socket = io("http://localhost:8080");

export const StatisticTemplate = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [barcodeScan, setBarcodeScan] = useState(null);
  const dispatch = useAppDispatch();

  useScanDetection({
    onComplete: (code: string) => setBarcodeScan(code),
    minLength: 3
  })

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Mã số sinh viên',
      dataIndex: 'student_id',
      key: 'student_id',
    },
  ]

  const { studentList, countStudent } = useSelector((state: RootState) => state.manageStudent) 

  useEffect(() => { 
    const timerId = setTimeout(() => { 
      setCurrentTime(new Date());
    }, 1000);
    return () => clearTimeout(timerId);
  }, [currentTime])

  useEffect(() => {
    dispatch(getStudentListThunk())
  }, [dispatch])

  useEffect(() => {
    if (barcodeScan !== null) { 
      dispatch(attendanceStudentThunk({
        id: Number(barcodeScan)
      })).then(() => {
        dispatch(getStudentListThunk());
        // Khi checkin thành công
        // socket.emit('checkin-notification');
      });
    }
  }, [barcodeScan, dispatch]);

  // Lắng nghe sự kiện từ server
  // updatedStudentData = {
    //   attendanceList: [],
    //   total: number,
    // }

  // useEffect(() => {
  //   socket.on('attendance-update', (updatedStudentData) => {
  //     console.log('Received attendance update:', updatedStudentData);
  //   });
  // }, []);

  return (
    <div className="container StatisticTemplate h-[60vh] overflow-hidden z-0">
      <Row className="h-full">
        <Col span={8} className="flex flex-col justify-center items-center">
          <h2 className="text-[#FF6C22] italic font-bold text-[1.5rem]">Sinh viên tham gia</h2>
          <div className="item mt-2 flex items-center justify-center" style={{
            backgroundColor: '#FF6C22',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            textAlign: 'center',
            lineHeight: '350px',
          }}>
            <h2 className="font-bold h-full text-white text-[10rem]">{countStudent}</h2>
          </div>
        </Col>
        <Col span={16} className="flex flex-col justify-center items-center">
          <div className="top text-center font-bold text-[4rem]">
            {
              (currentTime.getHours() >= 10 ? currentTime.getHours() : '0' + currentTime.getHours()) + ':' + (currentTime.getMinutes() >= 10 ? currentTime.getMinutes() : '0' + currentTime.getMinutes()) + ':' + (currentTime.getSeconds() >= 10 ? currentTime.getSeconds() : '0' + currentTime.getSeconds())
            }
          </div>
          <div className="bottom table" style={{ height: '300px' }}>
            <Table columns={columns} dataSource={studentList.length < 6 ? studentList : studentList.slice(1,6)} pagination={false} ></Table>
          </div>
        </Col>
      </Row>

    </div>
  )
}



export default StatisticTemplate