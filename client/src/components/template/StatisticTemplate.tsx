import { Col, Row, Table, TableProps } from "antd";
import { Student } from "constant/type";
import { useEffect, useState } from "react";
import '../style.scss';

export const StatisticTemplate = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const columns: TableProps<Student>['columns'] = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Mã số sinh viên',
      dataIndex: 'studentCode',
      key: 'studentCode',
    },
  ]

  const studentList: Student[] = [] // Lấy student từ UseSelector - UseSelector xử lý lấy dữ liệu từ BE
  
  // Duy trì 5 sinh viên điểm danh mới nhất show lên màn hìnhn
  const checkStudentList = (studentList: Student[]): Student[] => { 
    return studentList.length <= 5 ? studentList : studentList.slice(1,6)
  };

  useEffect(() => { 
    const setDate = setInterval(() => { 
      setCurrentTime(new Date());
    }, 1000)
    return () => clearInterval(setDate);
  }, [])

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
            <Table columns={columns} dataSource={checkStudentList(studentList).reverse()} pagination={false} ></Table>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default StatisticTemplate