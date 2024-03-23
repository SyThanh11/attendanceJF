import { Modal, Button } from 'antd';
import fireworksSound from '../../public/music/fireworks.mp3';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from 'store';
import { manageStudentAction } from 'store/manageStudent/slice';

export const PrizeModal = ({ prize, student, onClose, prizeNumber }) => {
  const fireworksSoundRef = useRef(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (prize) {
      fireworksSoundRef.current.play(); 
    }
  }, [prize]);

  const handleModalClose = (prizeNumber) => {
    fireworksSoundRef.current.pause(); 
    dispatch(manageStudentAction.setIsShowPrizes(prizeNumber));
    onClose(); 
  };

  return (
    <Modal
      title="Congratulations!"
      open={!!prize}
      footer={[
        <Button key="ok" onClick={() => { handleModalClose(prizeNumber-1) }}>OK</Button>,
      ]}
    >
      <audio ref={fireworksSoundRef} src={fireworksSound} preload="auto" />
      <p>You won: {prize}</p>
      <p>Student name: {student?.name}</p>
      <p>Class: {student?.class}</p>
      <p>School: {student?.school}</p>
    </Modal>
  );
}

export default PrizeModal;