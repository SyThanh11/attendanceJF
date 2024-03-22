import { Col, Row } from "antd"
import { useState } from "react";
import { useLocation } from "react-router-dom"
import Navbar from "./Navbar";

export const Header = () => {  
  const location = useLocation();
  const isWheel = location.pathname === "/wheel";
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const toggleNavbarVisibility = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

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
              isWheel ? <div className="flex items-center justify-center">
                <img className="w-[5%] mr-4" src="/image/guildlines.png" alt="guildline" />
                <h1 className="font-medium text-[40px] text-[#FEB602]" style={{
                  fontFamily: "Potta One"
                }}>
                  MINIGAME
                </h1>
              </div> : (<img style={{
                width: '45%'
              }} src="/image/logoStatitic.png" alt="logoStatitic" />)
            }
          </Col>
          <Col span={4} className="h-[20vh]">
            <img className="hover:cursor-pointer" src="/image/starOrange.png" alt="starOrange" onClick={toggleNavbarVisibility}/>
            {isNavbarVisible && <Navbar />}
          </Col>
        </Row>
    </header>
  )
}

export default Header