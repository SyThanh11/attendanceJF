<<<<<<< Updated upstream
import { Button, Col, Row } from "antd"
=======
import { Button, Col, Row } from "antd";
import { useState } from "react";
import cls from "classnames";
// import { Spin } from "components";
>>>>>>> Stashed changes

export const WheelTemplate = () => {
  const studentPrize = new Array(10).fill('2110540');
  return (
    <div className="WheelTemplate h-[60vh]">
      <Row>
        <Col span={8} className="flex justify-center relative">
          <div className='bottom bg-white w-[50%] h-[90%]' style={{
            borderRadius: '15px',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          }}>
            <h1 style={{
              borderTopLeftRadius: '15px',  
              borderTopRightRadius: '15px', 
              overflow: 'hidden'
            }} className="bg-[#FAA377] font-semibold text-center text-[16px] py-2">MSSV</h1>
            <hr />
            {studentPrize.map((item, index) => (
              <div key={index} className="flex justify-center items-center">
                <p className="text-center py-[5px]">{item}</p>
                {index < studentPrize.length - 1 && <hr />}
              </div>
            ))}
            <Button style={{
                borderRadius: '10px',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)'
            }} className='w-[18%] py-[20px] bg-[#FF6C22] font-medium text-white text-[16px] flex items-center justify-center'>Random</Button>
          </div>
        </Col>
<<<<<<< Updated upstream
        <Col span={8} className="flex justify-center items-center">
          <div style={{
            backgroundColor: '#FF6C22',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            textAlign: 'center',
            lineHeight: '400px',
          }}>
          </div>
        </Col>
        <Col span={8}>
          <div className="prize w-[48%] flex flex-col justify-center relative" style={{
            borderRadius: '10px',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          }}>
            <h1 style={{
              borderTopLeftRadius: '10px',  
              borderTopRightRadius: '10px', 
              overflow: 'hidden'
            }} className="bg-[#FEB602] text-center font-medium text-[16px] py-2">Giải nhất</h1>
            <h2 className="text-center py-2">Sỹ Thành - 2110540</h2>
            <img src="/image/first.png" alt="first" style={{
              position: 'absolute',
              top: '-72px',
              left: '-22px',
              width: '45%',
            }} />
          </div>
          <div className="prize mt-14 w-[48%] flex flex-col justify-center relative" style={{
            borderRadius: '10px',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          }}>
            <h1 style={{
              borderTopLeftRadius: '10px',  
              borderTopRightRadius: '10px', 
              overflow: 'hidden'
            }} className="bg-[#DDE1E6] text-center font-medium text-[16px] py-2">Giải nhì</h1>
            <h2 className="text-center py-2">Sỹ Thành - 2110540</h2>
            <img src="/image/second.png" alt="second" style={{
              position: 'absolute',
              top: '-40px',
              left: '-10px',
              width: '30%',
              transform: 'rotate(30deg) rotateY(180deg)',
            }} />
          </div>
          <div className="prize mt-14 w-[48%] flex flex-col justify-center relative" style={{
            borderRadius: '10px',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          }}>
            <h1 style={{
              borderTopLeftRadius: '10px',  
              borderTopRightRadius: '10px', 
              overflow: 'hidden'
            }} className="bg-[#FAA377] text-center font-medium text-[16px] py-2">Giải ba</h1>
            <h2 className="text-center py-2">Sỹ Thành - 2110540</h2>
            <img src="/image/third.png" alt="third" style={{
              position: 'absolute',
              top: '-38px',
              left: '-18px',
              width: '32%',
              transform: 'rotateY(180deg)'
            }} />
          </div>
=======
        <Col offset={1} span={13} className="bg-white h-[560px] py-2">
          <h1 className="font-bold text-[24px] pl-2">VÒNG QUAY MAY MẮN</h1>   
          {/* <div className="flex items-center w-full justify-center">
            <Spin data={[]} />
          </div> */}
>>>>>>> Stashed changes
        </Col>
      </Row>
    </div>
  )
}

export default WheelTemplate