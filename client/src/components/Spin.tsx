import { Button } from "antd"
import { Student } from "constant"
import { useState } from "react"
import { Wheel } from "react-custom-roulette"
import { useSelector } from "react-redux"
import { RootState } from "store"
import PrizeModal from "./PrizeModal"

const defaultData = [
  { option: '' },
  { option: '' },
  { option: '' },
  { option: '' },
  { option: '' },
  { option: '' },
  { option: '' },
  { option: '' },
  { option: '' },
  { option: '' },
]
  
const backgroundColors = [
  '#FF7F50',
  '#6495ED',
  '#7FFFD4',
  '#8A2BE2',
  '#FFD700',
  '#20B2AA',
  '#32CD32',
  '#FF69B4',
  '#9370DB',
  '#FF4500'
]
  
const textColors = ['BLACK']

export const Spin = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [prize, setPrize] = useState(null);
  const [prizeInfo, setPrizeInfo] = useState(null);
  const studentList: Student[]  = useSelector((state: RootState) => state.manageStudent.studentList)
  // const [student, setStudent] = useState(null)
  // const [data, setData] = useState(defaultData)

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * defaultData.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }

  const handleCloseModal = () => {
    setPrize(null);
    setPrizeInfo(null);
  }

  const handleStopSpinning = () => {
    setMustSpin(false);
    const student = studentList[prizeNumber];
    setPrize(`Prize: ${prizeNumber}`);
    setPrizeInfo(student);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={defaultData}
        backgroundColors={backgroundColors}
        textColors={textColors}
        outerBorderWidth={3}
        radiusLineWidth={2}

        onStopSpinning={handleStopSpinning}
      />
      <Button
        onClick={handleSpinClick}
        disabled={mustSpin}
        style={{
            borderRadius: '10px',
            padding: '20px',
            paddingInline: '40px'
        }} className='w-[20%] py-[20px] bg-[#FF6C22] font-medium text-white text-[18px] flex items-center justify-center !hover:cursor-pointer z-10'> SPIN
      </Button>
      <PrizeModal prize={prize} student={prizeInfo} onClose={handleCloseModal} />
    </div>
  )
}

export default Spin