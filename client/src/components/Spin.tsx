import { Button } from "antd"
import { Student } from "constant"
import { useState } from "react"
import { Wheel } from "react-custom-roulette"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "store"
import PrizeModal from "./PrizeModal"
import { manageStudentAction } from "store/manageStudent/slice"

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
  '#BFCBF4',
  '#9CB3F1',
  '#9DC1A8',
  '#669175',
  '#D6F2F0',
  '#A5D4DC',
  '#FFEECC',
  '#F4D798',
  '#FAD8CA',
  '#F9B698'
]
  
const textColors = ['BLACK']

export const Spin = (probs) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [prize, setPrize] = useState(null);
  const [prizeInfo, setPrizeInfo] = useState(null);
  const luckyList: Student[]  = useSelector((state: RootState) => state.manageStudent.luckyList)
  const wheelData = luckyList.map((student) => ({ option: student.student_id }));
  const dispatch = useAppDispatch();

  const handleSpinClick = (student: Student) => {
    const newPrizeNumber = Math.floor(Math.random() * 10)
    dispatch(manageStudentAction.addStudentPrize(student))
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }

  const handleCloseModal = () => {
    setPrize(null);
    setPrizeInfo(null);
  }

  const handleStopSpinning = () => {
    setMustSpin(false);
    const student = luckyList[prizeNumber];
    setPrize(`Prize: ${probs.prizeNumber}`);
    setPrizeInfo(student);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={probs.showDataWheel ? wheelData : defaultData}
        backgroundColors={backgroundColors}
        textColors={textColors}
        outerBorderWidth={0}
        radiusLineWidth={2}
        radiusLineColor="rgba(255, 255, 255, 0)"
        fontFamily="Fira Sans"
        fontWeight={600}

        onStopSpinning={handleStopSpinning}
      />
      <Button
        onClick={() => {handleSpinClick(luckyList[prizeNumber])}}
        disabled={mustSpin}
        style={{
            borderRadius: '10px',
            padding: '20px',
            paddingInline: '40px'
        }} className='w-[20%] py-[20px] bg-[#FF6C22] font-medium text-white text-[18px] flex items-center justify-center !hover:cursor-pointer z-10'> SPIN
      </Button>
      <PrizeModal prize={prize} student={prizeInfo} onClose={handleCloseModal} prizeNumber={probs.prizeNumber}/>
    </div>
  )
}

export default Spin