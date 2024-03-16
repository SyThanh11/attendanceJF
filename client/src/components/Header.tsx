import { Col, Row } from "antd"
import { useLocation } from "react-router-dom"

export const Header = () => {  
  const location = useLocation();
  const isWheel = location.pathname === "/wheel";

  return (
    <header className="header h-[20vh]">
        <Row>
          <Col className="relative h-[20vh]" span={4}>
            <img style={{
              position: "absolute",
              top: -120,
              left: -120,
              width: "300px",
              height: "300px",
            }} src="/image/cloud.png" alt="cloud" />
          </Col>
          <Col span={16} className="flex justify-center items-center h-[20vh]">
            {
              isWheel ? <h1 className="font-medium text-[45px] text-[#FEB602]" style={{
                fontFamily: "Potta One"
              }}>MINIGAME</h1> : (<img style={{
                width: '45%'
              }} src="/image/logoStatitic.png" alt="logoStatitic" />)
            }
          </Col>
          <Col span={4} className="h-[20vh]">
            <img src="/image/starOrange.png" alt="starOrange" />
          </Col>
        </Row>
    </header>
  )
}

export default Header