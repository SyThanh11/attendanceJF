import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import '../style.scss';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { attendanceStudentThunk } from "store/manageStudent/thunk";
import useScanDetection from "use-scan-detection";
import { manageStudentAction } from "store/manageStudent/slice";
import { useNavigate } from "react-router-dom";
import { PATH } from "constant";
import { toast } from "react-toastify";

export const StatisticTemplate = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [barcodeScan, setBarcodeScan] = useState(null);
  const [studentDetail, setStudentDetail] = useState(null);
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
        id: String(barcodeScan)
      })).then(() => { 
        if(studentDetail?.is_checkout){
          toast.error('Bạn đã check in rồi!')
        }
      })
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
        if(receivedData?.StudentInfo?.is_checkout != true){
          dispatch(manageStudentAction.increaseStudentCount());
          dispatch(manageStudentAction.addStudentDisplay(receivedData?.StudentInfo))
          setStudentDetail(receivedData?.StudentInfo)
        } 
      }
    };

    socket.onclose = () => {
        console.log('Disconnected from WebSocket server');
    };

    return () => {
        socket.close();
    };
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem('KEY')) {
      navigate(PATH.login);
    }
  }, [navigate]);

  return (
    <div className="container StatisticTemplate h-[60vh] overflow-hidden z-0">
      <Row className="h-full">
        <Col span={8} className="flex flex-col justify-center items-center">
          <h2 className="text-[#FF6C22] italic font-bold text-[1.5rem]">Sinh viên tham gia</h2>
          <div className="item mt-2 flex items-center justify-center" style={{
            backgroundColor: '#FF6C22',
            width: '370px',
            height: '370px',
            borderRadius: '50%',
            textAlign: 'center',
            lineHeight: '370px',
          }}>
            <h2 className="font-bold h-full text-white text-[10rem]">{countStudent}</h2>
          </div>
        </Col>
        <Col span={16} className="flex flex-col justify-center items-center">
          <div className="top text-center font-bold text-[60px]">
            {
              (currentTime.getHours() >= 10 ? currentTime.getHours() : '0' + currentTime.getHours()) + ':' + (currentTime.getMinutes() >= 10 ? currentTime.getMinutes() : '0' + currentTime.getMinutes()) + ':' + (currentTime.getSeconds() >= 10 ? currentTime.getSeconds() : '0' + currentTime.getSeconds())
            }
          </div>
          <div className="bottom table z-30" style={{ height: '300px' }}>
            <div className="flex justify-end items-center w-full pb-2">
              <input type="text" className="w-[30%] p-[5px] z-50" placeholder="MSSV" name="student_id" onKeyDown={(event) => { 
                if (event.key === 'Enter') {
                  const target = event.target as HTMLInputElement
                  setBarcodeScan(target.value)
                } 
              }}/>
            </div>
            <table style={{  width: '100%', height: '300px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '10px', paddingInline: '80px' }}>Họ và tên</th>
                  <th style={{ padding: '10px', paddingInline: '80px' }}>MSSV</th>
                </tr>
              </thead>
              <tbody>
                {displayStudent?.length > 0 && (
                    <tr>
                        <td className="text-blue-600" style={{ padding: '10px', textAlign: 'center', fontSize: '24px', fontWeight: 600 }}>{displayStudent[0]?.name}</td>
                        <td className="text-blue-600" style={{ padding: '10px', textAlign: 'center', fontSize: '24px', fontWeight: 600 }}>{displayStudent[0]?.student_id}</td>
                    </tr>
                )}
                {displayStudent?.slice(1).map((student, index) => (
                    <tr key={index + 1}>
                        <td style={{ padding: '10px' }}>{student?.name}</td>
                        <td style={{ padding: '10px' }}>{student?.student_id}</td>
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