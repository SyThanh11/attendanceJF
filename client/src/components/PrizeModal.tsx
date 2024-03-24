import { Modal, Button } from 'antd';
import fireworksSound from '../../public/music/fireworks.mp3';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from 'store';
import { manageStudentAction } from 'store/manageStudent/slice';
import { Fireworks } from '@fireworks-js/react'
import './style.scss'

export const PrizeModal = ({ prize, student, onClose, prizeNumber }) => {
  const fireworksSoundRef = useRef(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (prize) {
      fireworksSoundRef.current.play(); 
      console.log(prize);
    }
  }, [prize]);

  const handleModalOk = (prizeNumber) => {
    fireworksSoundRef.current.pause(); 
    dispatch(manageStudentAction.setIsShowPrizes(prizeNumber));
    onClose(); 
  };

  const handleModalCancel = () => {
    fireworksSoundRef.current.pause(); 
    dispatch(manageStudentAction.removeStudentPrize());
    onClose(); 
  };

  const modalTitleStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  };

  let titileImage = prizeNumber === 3 ? '/image/bronze-medal.png' : ( prizeNumber === 2 ? '/image/silver-medal.png' : '/image/gold-medal.png'); 

  return (
    <Modal
      centered={true}
      title={<div style={modalTitleStyle}><img className='w-[30%]' src={titileImage} alt="Medal" /></div>}
      open={!!prize}
      footer={[
        <Button className='bg-red-600 font-medium text-white !hover:cursor-pointer px-8' key="ok" onClick={() => { handleModalCancel() }}>AGAIN</Button>,
        <Button className='bg-[#FEB602] font-medium text-white !hover:cursor-pointer px-8' key="ok" onClick={() => { handleModalOk(prizeNumber-1) }}>OK</Button>,
      ]}
      width={350}
      style={{ height: '400px' }}
      className='Modal'
    >

    <Fireworks
      options={{ opacity: 0.5 }}
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'fixed',
      }}
    />

      <audio ref={fireworksSoundRef} src={fireworksSound} preload="auto" />

      <div className='flex justify-center items-center' style={{
        height: '15px',
        width: '100%',
      }}>
        <p style={{
          backgroundColor: '#D9D9D9',
          height: '100%',
          width: '30%',
          borderRadius: '50%',
        }}></p>
      </div>
      <p className='text-center text-[6C6D7E] text-[16px] pt-4 pb-2'>Chúc mừng</p>
      <p className='text-[24px] text-center font-semibold'>{student?.name.toUpperCase()}</p>
      <p className='text-[20px] text-center font-semibold'>{student?.student_id}</p>
    </Modal>
  );
}

export default PrizeModal;