import { Button, Col, Row } from "antd"
import { Spin } from "components";
import { PATH, Student } from "constant";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { manageStudentAction } from "store/manageStudent/slice";
import { getLuckyListThunk } from "store/manageStudent/thunk";
import { useSpring, animated } from 'react-spring';
import '../style.scss'
import { useNavigate } from "react-router-dom";

export const WheelTemplate = () => {
  const { luckyList, studentPrize, isShowPrizes } = useSelector((state: RootState) => ({
    luckyList: state.manageStudent.luckyList,
    studentPrize: state.manageStudent.studentPrize,
    isShowPrizes: state.manageStudent.isShowPrizes
  })) as { luckyList: Student[], studentPrize: Student[], isShowPrizes: boolean[] };
  const [visibleItems, setVisibleItems] = useState([]);
  const [showDataWheel, setShowDataWheel] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const GenerateNumber = ({n}) => { 
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      config: { duration: 1000, delay: 1000 },
    });
    return <animated.p className="text-center py-[5px]">{number.to((n) => n.toFixed(0))}</animated.p>
  }

  useEffect(() => {
    const timeoutIds = [];
    luckyList.forEach((item, index) => {
      const timeoutId = setTimeout(() => {
        setVisibleItems(prevItems => [...prevItems, item]);
        if (index === luckyList.length - 1) {
          setTimeout(() => { 
            setShowDataWheel(true);
            setVisibleItems([]);
          }, 4000);
        }
      }, 1000 * (index + 1));
      timeoutIds.push(timeoutId);
    });
  
    return () => {
      timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    };
  }, [luckyList]);

  useEffect(() => {
    if (!localStorage.getItem('KEY')) {
      navigate(PATH.login);
    }
  }, [navigate]);

  useEffect(() => { 
    dispatch(manageStudentAction.getStudentPrize());
    console.log('Hello');
    
  }, [])

  return (
    <div className="WheelTemplate h-[60vh]">
      <Row className="h-full">
        <Col span={8} className="flex justify-center relative mt-4">
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
              <div key={index} className="flex justify-center items-center p-[4px]">
                {
                  index === visibleItems.length - 1 ? <GenerateNumber n={item.student_id} /> : item.student_id
                }
              </div>
            ))}
            <Button onClick={() => { 
              if(luckyList){
                dispatch(manageStudentAction.clearLuckyList());
                setVisibleItems([]);
                setShowDataWheel(false);
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
          <Spin showDataWheel={showDataWheel} prizeNumber={4-studentPrize?.length}></Spin>
        </Col>
        <Col span={8} className="relative">
          <div className="prize w-[48%] flex flex-col justify-center relative" style={{
            borderRadius: '10px',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            position: 'absolute',
            top: '40px',
            right: '155px'
          }}>
            <h1 style={{
              borderTopLeftRadius: '10px',  
              borderTopRightRadius: '10px', 
              overflow: 'hidden'
            }} className="bg-[#FEB602] text-center font-medium text-[16px] py-2">Giải nhất</h1>
            <h2 className="text-center py-2">{
              ( isShowPrizes[0] && studentPrize?.length == 3 )  ? studentPrize[2].name + ' - ' + studentPrize[2].student_id : ''
            }</h2>
            <img src="/image/first.png" alt="first" style={{
              position: 'absolute',
              top: '-72px',
              left: '-22px',
              width: '45%',
            }} />
          </div>
          <div className="prize mt-14 w-[48%] flex flex-col justify-center relative" style={{
            borderRadius: '10px',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            position: 'absolute',
            top: '120px',
            right: '155px'
          }}>
            <h1 style={{
              borderTopLeftRadius: '10px',  
              borderTopRightRadius: '10px', 
              overflow: 'hidden'
            }} className="bg-[#DDE1E6] text-center font-medium text-[16px] py-2">Giải nhì</h1>
            <h2 className="text-center py-2">{
             ( isShowPrizes[1] && studentPrize?.length >= 2 ) ? studentPrize[1].name + ' - ' + studentPrize[1].student_id : ''
            }</h2>
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
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            position: 'absolute',
            top: '260px',
            right: '155px'
          }}>
            <h1 style={{
              borderTopLeftRadius: '10px',  
              borderTopRightRadius: '10px', 
              overflow: 'hidden'
            }} className="bg-[#FAA377] text-center font-medium text-[16px] py-2">Giải ba</h1>
            <h2 className="text-center py-2">{
              ( isShowPrizes[2] && studentPrize?.length >= 1) ? studentPrize[0].name + ' - ' + studentPrize[0].student_id : ''
            }</h2>
            <img src="/image/third.png" alt="third" style={{
              position: 'absolute',
              top: '-38px',
              left: '-18px',
              width: '32%',
              transform: 'rotateY("180deg")'
            }} />
          </div>
          <div className="border w-2 h-full" style={{
            position: 'absolute',
            top: '30px',
            right: '150px',
            backgroundColor: '#FCE29C',
            border: '1px solid #1E1E1E'
          }}></div>
        </Col>
      </Row>
    </div>
  )
}

export default WheelTemplate