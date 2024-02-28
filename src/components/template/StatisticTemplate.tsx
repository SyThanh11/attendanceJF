import { Col, Row } from "antd";
import '../style.scss';
import { useEffect, useState } from "react";

export const StatisticTemplate = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => { 
    const setDate = setInterval(() => { 
      setCurrentTime(new Date());
    }, 1000)
    return () => clearInterval(setDate);
  }, [])

  return (
    <div className="container">
      <Row>
        <Col span={24} className="font-bold text-[24px] bg-white py-4 pl-10">
          THỐNG KÊ SỰ KIỆN JOB FAIR 2024
        </Col>
      </Row>
      <Row className="h-[500px] mt-4">
        <Col span={11} className="h-full bg-white font-bold text-[24px] text-center pt-2">
          SINH VIÊN VỪA ĐIỂM DANH
        </Col>
        <Col span={12} offset={1} className="font-bold text-[24px] text-center">
          <div className="h-1/2">
            <h1 className="h-[50px] bg-white flex items-center justify-center">THỜI GIAN HIỆN TẠI</h1>
            <p className="h-[200px] flex items-center justify-center text-[#336699] text-[60px]">{currentTime.getHours()}:{currentTime.getMinutes()}:{currentTime.getSeconds()}</p>
          </div>
          <div className="h-1/2 bg-white">
            <h1 className="flex items-center justify-center pt-2">THỐNG KÊ</h1>
            <Row className="flex items-center h-3/4">
              <Col className="flex flex-col items-center justify-center" span={12}>
                <p className="w-[150px] h-[150px] bg-[#ECF2FF] flex items-center justify-center text-[#336699] text-[60px]" style={{
                  borderRadius: "50%"
                }}>0</p>
                <p className="mt-2 text-[20px] font-medium">Sinh viên tham gia</p>
              </Col>
              <Col className="flex flex-col items-center justify-center" span={12}>
              <p className="w-[150px] h-[150px] bg-[#ECF2FF] flex items-center justify-center text-[#336699] text-[60px]" style={{
                  borderRadius: "50%"
                }}>50</p>
                <p className="mt-2 text-[20px] font-medium">Doanh nghiệp tham gia</p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default StatisticTemplate