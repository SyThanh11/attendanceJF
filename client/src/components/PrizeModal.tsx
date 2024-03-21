import { Modal, Button } from 'antd';
import fireworksSound from '../../public/music/fireworks.mp3';
import { useEffect, useRef } from 'react';

export const PrizeModal = ({ prize, student, onClose }) => {
  const fireworksSoundRef = useRef(null);

  useEffect(() => {
    if (prize) {
      fireworksSoundRef.current.play(); // Phát âm thanh pháo hoa khi modal xuất hiện
    }
  }, [prize]);

  const handleModalClose = () => {
    fireworksSoundRef.current.pause(); 
    onClose(); 
  };

  return (
    <Modal
      title="Congratulations!"
      open={!!prize}
      footer={[
        <Button key="ok" onClick={handleModalClose}>OK</Button>,
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