import React, {useEffect, useState} from "react";
import {Box, Card, Container} from "@mui/material";
import {Button, List, Popconfirm, Skeleton, Space, Spin} from "antd";
import {useNavigate} from "react-router-dom";


export default () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [spinLoading, setSpinLoading] = useState(false)
    const [levelTemplateList, setLevelTemplateList] = useState([])

    useEffect(() => {
        setLevelTemplateList([{
            ID: 1,
            name: "森林"
        },{
            ID: 2,
            name: "洞穴"
        }])
    }, [])

    function deleteTemplateLevel(ID) {
        setSpinLoading(true)
        // deleteLevelTemplateApi("", ID)
        //     .then(resp => {
        //         if (resp.code === 200) {
        //             const newLevelTemplateList = []
        //             // eslint-disable-next-line no-restricted-syntax
        //             for (const level of levelTemplateList) {
        //                 if (level.ID !== ID) {
        //                     newLevelTemplateList.push(level)
        //                 }
        //             }
        //             setLevelTemplateList([...newLevelTemplateList])
        //             setSpinLoading(false)
        //         }
        //     })
    }

    return <>
        <Container maxWidth="xl">
            <Spin spinning={spinLoading} description={"正在保存 modoverrides "}>
                <Card>
                    <Box sx={{p: 2}} dir="ltr">
                        <div>
                            <Button type={"primary"}
                                    onClick={() => navigate(`/dashboard/addTemplate/0`)}
                            >
                                添加世界模板
                            </Button>
                        </div>
                    </Box>
                </Card>
                <br/>
                <Card>
                    <Box sx={{p: 3}} dir="ltr">
                        <Skeleton loading={loading} active>
                            <List
                                itemLayout="horizontal"
                                dataSource={levelTemplateList}
                                renderItem={(template) => (
                                    <List.Item
                                        actions={
                                            [
                                                <div key={template.name}>
                                                    <Space size={8} wrap>
                                                        <div>
                                                            <Popconfirm
                                                                title="是否删除世界模板"
                                                                description="删除世界模板后将丢失数据，请做好备份"
                                                                onConfirm={() => deleteTemplateLevel(template.ID)}
                                                                onCancel={() => {
                                                                }}
                                                            >
                                                                <Button type={"link"} danger>删除模板</Button>
                                                            </Popconfirm>
                                                        </div>
                                                        <div><Button
                                                            type={"link"}
                                                            onClick={() => navigate(`/dashboard/addTemplate/${template.ID}`)}>
                                                            查看
                                                        </Button>
                                                        </div>
                                                    </Space>
                                                </div>,
                                            ]}>

                                        <List.Item.Meta
                                            title={template.name}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Skeleton>
                    </Box>
                </Card>
            </Spin>
        </Container>
    </>
}