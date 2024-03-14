import { Col, Row } from "antd"

export const Footer = () => {
  return (
    <Row className="flex justify-center items-center w-full overflow-hidden">
        <Col span={24} className="h-[150px] w-full" style={{
            backgroundImage: 'url(/image/footer.png)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '44%',
        }}></Col>
    </Row>
  )
}

export default Footer