import { Col, Row, Table } from "antd";
import { Student } from "constant/type";
import { useEffect, useState } from "react";
import '../style.scss';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { attendanceStudentThunk, getStudentListThunk } from "store/manageStudent/thunk";
import useScanDetection from "use-scan-detection";

export const StatisticTemplate = () => {
  const currentTime = new Date();
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

  const studentList: Student[] = useSelector((state: RootState) => state.manageStudent.studentList) 

  // useEffect(() => { 
  //   const timerId = setTimeout(() => { 
  //     setCurrentTime(new Date());
  //   }, 1000);
  //   return () => clearTimeout(timerId);
  // }, [currentTime])

  useEffect(() => {
    dispatch(getStudentListThunk())
  }, [dispatch])

  useEffect(() => {
    if (barcodeScan !== null) { 
      dispatch(attendanceStudentThunk({
        id: Number(barcodeScan)
      })).then(() => {
        dispatch(getStudentListThunk());
      });
    }
  }, [barcodeScan, dispatch]);

  return (
    <div className="container StatisticTemplate h-[60vh] overflow-hidden">
      <Row className="style={{ height: '300px' }}">
        <Col span={8} className="flex flex-col justify-center items-center">
          <h2 className="text-[#FF6C22] italic font-bold text-[1.5rem]">Sinh viên tham gia</h2>
          <div className="item mt-2" style={{
            backgroundColor: '#FF6C22',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            textAlign: 'center',
            lineHeight: '350px',
          }}>
            <h2 className="font-bold text-white text-[10rem]">999</h2>
          </div>
        </Col>
        <Col span={16} className="flex flex-col justify-center items-center">
          <div className="top text-center font-bold text-[4rem]">
            {
              (currentTime.getHours() >= 10 ? currentTime.getHours() : '0' + currentTime.getHours()) + ':' + (currentTime.getMinutes() >= 10 ? currentTime.getMinutes() : '0' + currentTime.getMinutes()) + ':' + (currentTime.getSeconds() >= 10 ? currentTime.getSeconds() : '0' + currentTime.getSeconds())
            }
          </div>
          <div className="bottom table" style={{ height: '300px' }}>
            <Table columns={columns} dataSource={studentList} pagination={false} ></Table>
          </div>
        </Col>
      </Row>

    </div>
  )
}



export default StatisticTemplate