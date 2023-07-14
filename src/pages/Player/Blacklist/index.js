import {Row, Col, Button, Divider, Space, Popconfirm, Modal} from 'antd';
import {useState} from "react";
import AddModel from "../AddModel";

// eslint-disable-next-line react/prop-types
const Blacklist = ({ blacklistPlayerList, addBlacklist, deleteBlacklist }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

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
                    <Popconfirm
                        title="是否删除管理员"
                        onConfirm={()=>{deleteBlacklist(item)}}
                        onCancel={()=>{}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger >删除</Button>
                    </Popconfirm>
                </Space>
            </Col>
            <Divider style={{ margin: '0px' }} />
        </>
    ))


    return (
        <>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <AddModel title={"添加黑名单"} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} add={addBlacklist} />
            <Row align="middle" gutter={[8, 20]} style={{ rowGap: '12px' }}>
                {list}
            </Row>
        </>
    )
}

export default Blacklist