import { Button, Col, Row } from "antd";
import { useState } from "react";
import cls from "classnames";
import { Spin } from "components";

export const WheelTemplate = () => {
  const [prizeList, setPrizeList] = useState([1,2,3,4,5]);
  return (
    <div className="container WheelTemplate">
      <Row>
        <Col span={24} className="font-bold text-[24px] bg-white py-4 pl-10">
          QUAY SỐ TRÚNG THƯỞNG
        </Col>
      </Row>
      <Row className="mt-4">
        <Col span={10}>
           <Row>
            <Col span={24} className="bg-white h-[170px] flex justify-between py-2">
              <h1 className="font-bold text-[24px] pl-2">MSSV ĐƯỢC CHỌN</h1>
              <Button size="large" className="mssv-choose mr-2 bg-[#336699] shadow-sm font-medium text-white">Bắt đầu</Button>
            </Col>
            <Col span={24} className="bg-white h-[390px] mt-4 py-2">
              <h1 className="font-bold text-[24px] pl-2">GIẢI THƯỞNG</h1>
              <div>
                <Button onClick={() => { 
                  prizeList.length == 5 ? setPrizeList([2,3,4,5]) : setPrizeList([1,2,3,4,5])
                }} size="large" className={
                  cls({
                    "bg-[#F7C8E0] shadow-sm font-medium cse flex items-center ml-2": prizeList.length == 5,
                    "bg-[#336699] shadow-sm font-medium kms text-white flex items-center ml-2": prizeList.length == 4
                  })
                }>{
                  prizeList.length == 5 ? 'CSE' : 'KMS'
                }</Button>
                <div className="prize-list">
                  {prizeList.map((index) => (
                    <div className="prize flex font-semibold text-[20px] pl-2 pt-6" key={index}>
                      <p className="mr-4" style={{
                        borderRadius: '50%',
                        backgroundColor: '#000000',
                        color: '#FFFFFF',
                        width: '30px',
                        height: '30px',
                        textAlign: 'center',
                        lineHeight: '30px',
                      }}>{index == 1 && prizeList.length == 5 ? 'S' : index - 1}</p>
                      <h2>Nguyễn Sỹ Thành</h2>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
           </Row>
        </Col>
        <Col offset={1} span={13} className="bg-white h-[560px] py-2">
          <h1 className="font-bold text-[24px] pl-2">VÒNG QUAY MAY MẮN</h1>   
          <div className="flex items-center w-full justify-center">
            <Spin data={[]} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default WheelTemplate