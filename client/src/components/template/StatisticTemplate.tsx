import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import '../style.scss';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { attendanceStudentThunk } from "store/manageStudent/thunk";
import useScanDetection from "use-scan-detection";
import { manageStudentAction } from "store/manageStudent/slice";

export const StatisticTemplate = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [barcodeScan, setBarcodeScan] = useState(null);
  const [studentDetail, setStudentDetail] = useState(null)
  const dispatch = useAppDispatch();

  useScanDetection({
    onComplete: (code: string) => setBarcodeScan(code),
    minLength: 3
  })

  const { countStudent, displayStudent } = useSelector((state: RootState) => state.manageStudent) 

  useEffect(() => { 
    const timerId = setTimeout(() => { 
      setCurrentTime(new Date());
    }, 1000);
    return () => clearTimeout(timerId);
  }, [currentTime])

  useEffect(() => {
    if (barcodeScan !== null) { 
      dispatch(attendanceStudentThunk({
        id: Number(barcodeScan)
      }))
    }
  }, [barcodeScan, dispatch]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/api/students/ws");

    socket.onopen = () => {
        console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      console.log('Received data:', receivedData);
      if(!receivedData?.StudentInfo){
        dispatch(manageStudentAction.setDisplayStudent(receivedData?.student_list));
        dispatch(manageStudentAction.setCountStudent(receivedData?.count));
      } else {
        dispatch(manageStudentAction.increaseStudentCount());
        dispatch(manageStudentAction.addStudent(receivedData?.StudentInfo))
        setStudentDetail(receivedData?.StudentInfo);
      }
    };

    socket.onclose = () => {
        console.log('Disconnected from WebSocket server');
    };

    return () => {
        socket.close();
    };
  }, [dispatch]);

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
            <table style={{  width: '100%', height: '300px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '10px', paddingInline: '80px' }}>Họ và tên</th>
                  <th style={{ padding: '10px', paddingInline: '80px' }}>MSSV</th>
                </tr>
              </thead>
              <tbody>
                <tr className={studentDetail == null ? 'hidden' : 'table-row'}>
                    <td style={{ padding: '10px', textAlign: 'center', fontSize: '20px' }}>{studentDetail?.name}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontSize: '20px' }}>{studentDetail?.student_id}</td>
                </tr>
                {displayStudent?.map((student, index) => (
                  <tr key={index}>
                    <td style={{ padding: '10px' }}>{student.name}</td>
                    <td style={{ padding: '10px' }}>{student.student_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>

    </div>
  )
}



export default StatisticTemplate