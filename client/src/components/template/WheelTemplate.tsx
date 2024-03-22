import { Button, Col, Row } from "antd"
import { Spin } from "components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { manageStudentAction } from "store/manageStudent/slice";
import { getLuckyListThunk } from "store/manageStudent/thunk";

export const WheelTemplate = () => {
  const luckyPrize = useSelector((state: RootState) => state.manageStudent.luckyList);
  const [visibleItems, setVisibleItems] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeoutIds = [];
    luckyPrize.forEach((item, index) => {
      const timeoutId = setTimeout(() => {
        setVisibleItems(prevItems => [...prevItems, item]);
      }, 3000 * (index + 1));
      timeoutIds.push(timeoutId);
    });
  
    return () => {
      timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    };
  }, [luckyPrize]);

  return (
    <div className="WheelTemplate h-[60vh]">
      <Row className="h-full">
        <Col span={8} className="flex justify-center relative">
          <div className='bottom bg-white w-[50%] h-[76%]' style={{
            borderRadius: '15px',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          }}>
            <h1 style={{
              borderTopLeftRadius: '15px',  
              borderTopRightRadius: '15px', 
              overflow: 'hidden'
            }} className="bg-[#FAA377] font-semibold text-center text-[16px] py-2">MSSV</h1>
            <hr />
            {visibleItems?.map((item, index) => (
              <div key={index} className="flex justify-center items-center">
                <p className="text-center py-[5px]">{item.student_id}</p>
                {index < visibleItems?.length - 1 && <hr />}
              </div>
            ))}
            <Button onClick={() => { 
              if(luckyPrize){
                dispatch(manageStudentAction.clearLuckyList());
                setVisibleItems([]);
              }
              dispatch(getLuckyListThunk())
            }} style={{
                borderRadius: '10px',
                position: 'absolute',
                bottom: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
            }} className='w-[18%] py-[20px] bg-[#FF6C22] font-medium text-white text-[18px] flex items-center justify-center !hover:cursor-pointer z-10'>Random</Button>
          </div>
        </Col>
        <Col span={8} className="flex justify-center items-center">
          <Spin></Spin>
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
              transform: 'rotateY("180deg")'
            }} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default WheelTemplate