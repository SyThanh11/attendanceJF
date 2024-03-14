import { Button, Col, Input, Row } from "antd";
import '../style.scss';
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

export const AttendanceTemplate = () => {
  const [content, setContent] = useState('ĐIỂM DANH SINH VIÊN VÀO');

  const search = async (event) => { 
    try {
      if(event.key === 'Enter'){
        console.log(event.target.value);
      }
    } catch (error) {
      
    }
  }

  return (
    <div className="container AttendanceTemplate">
      <Row>
        <Col span={24} className="bg-white py-4 flex justify-between">
          <h1 className="font-bold text-[24px] pl-10">ĐIỂM DANH SINH VIÊN</h1>
          <div className="button-right flex items-center pr-10">
            <Button size="large" onClick={() => { setContent('ĐIỂM DANH SINH VIÊN VÀO') }} className="check-in mr-2 bg-[#F7C8E0] shadow-sm font-medium">CHECK IN</Button>
            <Button size="large" onClick={() => { setContent('ĐIỂM DANH SINH VIÊN RA') }} className="check-out mr-2 bg-[#3C90CC] shadow-sm font-medium text-white">CHECK OUT</Button>
          </div>
        </Col>
      </Row>
      <Row className="h-[70px] mt-4">
        <Col span={24} className="h-full bg-white font-bold text-[32px] flex items-center justify-center">
          {
            content
          }
        </Col>
      </Row>
      <Row className="h-[70px] mt-4">
        <Col span={24} className="h-full bg-white flex items-center justify-center">
          <Input className="w-2/3 py-[12px] text-[17px] font-medium" onKeyUp={(event) => { search(event) }} style={{
            borderRadius: "20px",
            border: "2px solid black",
          }} size="large" placeholder="Tìm kiếm sinh viên" prefix={<SearchOutlined className="pr-4 pl-2 font-semibold"/>} />
        </Col>
      </Row>
      <Row className="h-[400px] mt-4">
        <Col span={12} className="h-full bg-white flex flex-col">
          <h1 className="font-bold text-[24px] pl-6 pt-4">THÔNG TIN SINH VIÊN</h1>
          <div className="info-student pl-6">
            <h2>Họ và tên</h2>
            <h2>Mã số sinh viên</h2>
            <h2>Lớp</h2>
            <h2>Niên khóa</h2>
          </div>
        </Col>
        <Col offset={1} span={11} className="h-full bg-white font-bold text-[24px] text-center pt-4">
          SINH VIÊN ĐIỂM DANH THÀNH CÔNG
        </Col>
      </Row>
    </div>
  )
}

export default AttendanceTemplate