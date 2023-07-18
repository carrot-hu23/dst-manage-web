import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {Button, Form, Input, List, message, Modal, Select, Skeleton, Space} from "antd";
import {Box, Card, Container} from "@mui/material";
import {createNewLevelApi, getLevelListApi} from "../../api/levelApi";

const {Option} = Select;

export default () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [levelList, setLevelList] = useState([])
    const {cluster} = useParams()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLevelForm] = Form.useForm()

    useEffect(() => {
        setLoading(true)
        getLevelListApi(cluster)
            .then(resp => {
                if (resp.code === 200) {
                    setLevelList(resp.data || [])
                }
                setLoading(false)
            })
    }, [])

    function createNewLevel() {
        const level = newLevelForm.getFieldValue()
        console.log(level)
        createNewLevelApi(cluster,level)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success("创建成功")
                    setLevelList(current => [...current, level])
                } else {
                    message.error("创建失败")
                }
                setIsModalOpen(false)
            })
    }

    return <>
        <Container maxWidth="xl">

            <Modal title="创建新的世界"
                   open={isModalOpen}
                   onOk={() => createNewLevel()}
                   onCancel={() => setIsModalOpen(false)}>
                <Form
                    form={newLevelForm}
                    layout="horizontal"
                    labelCol={{
                        span: 6,
                    }}
                >
                    <Form.Item label={"世界名"} name='levelName'>
                        <Input placeholder="不要输入中文或者特殊字符"
                        />
                    </Form.Item>
                    <Form.Item label={"类型"} name='levelType'>
                        <Select
                            placeholder="请选择要创建的类型世界"
                        >
                            <Option value="MASTER">森林</Option>
                            <Option value="CAVES">洞穴</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={"描述"}
                        name='description'
                    >
                        <Input placeholder="请输入描述"
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Card>
                <Box sx={{p: 2}} dir="ltr">
                    <Button type={"primary"} onClick={() => setIsModalOpen(true)}>添加世界</Button>
                </Box>
            </Card>
            <br/>
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Skeleton loading={loading} active>
                        <List
                            itemLayout="horizontal"
                            dataSource={levelList}
                            renderItem={(level) => (
                                <List.Item
                                    actions={
                                        [
                                            <div key={level.levelName}>
                                                <Space size={8} wrap>
                                                    <div><Button type={"primary"} danger >删除世界</Button></div>
                                                    <div><Button type={"link"}
                                                                 onClick={() => navigate(`/dashboard/level/leveldataoverride/${level.levelName}/${level.levelType}`)}>世界配置</Button></div>
                                                    <div>
                                                        <Button type={"link"}
                                                                onClick={() => navigate(`/dashboard/level/modoverrides/${level.levelName}`)}>模组配置</Button>
                                                    </div>
                                                    <div>
                                                        <Button type={"link"}
                                                                onClick={() => navigate(`/dashboard/level/serverIni/${level.levelName}`)}>端口配置</Button>
                                                    </div>
                                                </Space>
                                            </div>,
                                        ]}>

                                    <List.Item.Meta
                                        title={level.levelName}

                                        description={<div>{level.description}</div>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Skeleton>
                </Box>
            </Card>
        </Container>
    </>
}