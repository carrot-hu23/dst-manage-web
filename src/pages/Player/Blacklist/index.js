import { Row, Col, Button, Divider, Space } from 'antd';

// eslint-disable-next-line react/prop-types
const Blacklist = ({ blacklistPlayerList }) => {
    // eslint-disable-next-line react/prop-types
    const list = blacklistPlayerList.map((item) => (
        <>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Space size={'middle'}>
                    <span>{item}</span>
                </Space>

            </Col>
            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                <Space style={{ float: 'right' }}>
                    <Button type="link" onClick={() => { console.log(item); }} >修改</Button>
                    <Button type="link" danger >删除</Button>
                </Space>
            </Col>
            <Divider style={{ margin: '0px' }} />
        </>
    ))

    return (
        <Row align="middle" gutter={[8, 20]} style={{ rowGap: '12px' }}>
            {list}
        </Row>
    )
}

export default Blacklist