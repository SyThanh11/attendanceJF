import { Col, Row } from "antd"

export const Header = () => {
  return (
    <Row className="flex justify-center items-center w-full pt-[20px] overflow-hidden">
        <Col span={24} className="h-[80px] w-full" style={{
            backgroundImage: 'url(/image/header.png)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '30%',
        }}></Col>
    </Row>
  )
}

export default Header