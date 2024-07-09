import {Col, Row, Avatar, Alert, Button, Form, Space, message, Spin, Skeleton} from "antd";
import {
    CheckCard,
} from '@ant-design/pro-components';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {useTheme} from "../../../hooks/useTheme";
import {usePreinstallApi} from "../../../api/preinstallApi";

export default ({reload}) => {
    const {cluster} = useParams()
    const {theme} = useTheme();

    const [form] = Form.useForm();
    const [name, setName] = useState("default")
    const [spin, setSpin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [preinstalls, setPreinstalls] = useState([]);

    useEffect(() => {
        setLoading(true)
        fetch('/misc/preinstall.json')
            .then(response => response.json())
            .then(data => {
                setPreinstalls(data)
                setLoading(false)
            }).catch(error => {
            console.error('无法加载配置文件', error)
        })
    }, [])

    function save() {
        setSpin(true)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        usePreinstallApi(cluster, name)
            .then(resp => {
                if (resp.code === 200) {
                    message.success("设置成功")
                    reload()
                } else {
                    message.error(`设置失败 ${resp.msg}`)
                }
                setSpin(false)
            })
    }

    return (
        <>
            <Skeleton loading={loading}>
                <Spin spinning={spin} tip={"正在替换"}>
                    <Form form={form} layout="vertical">
                        <Form.Item name="template" label="世界模板">
                            <CheckCard.Group
                                style={{width: '100%'}}
                                onChange={(value) => {
                                    console.log('value', value);
                                    setName(value)
                                }}
                                defaultValue="default"
                            >
                                <Row>
                                    {preinstalls.map((item, index) => <>
                                        <Col key={index} xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <div key={index}>
                                                <CheckCard
                                                    className={theme === 'dark' ? 'dark' : ''}
                                                    avatar={
                                                        <Avatar
                                                            src={item.src}
                                                            size="large"
                                                        />
                                                    }
                                                    title={item.name} description={item.description}
                                                    value={item.value}/>
                                            </div>

                                        </Col>
                                    </>)}
                                </Row>

                            </CheckCard.Group>
                        </Form.Item>
                    </Form>

                    <Alert message="window版本 面板和饥荒存档以及备份路径请在C盘，其他盘将没有操作权限导致失败"
                           type="warning" showIcon/>
                    <Alert style={{marginTop: '8px'}}
                           message="此操作可能会导致世界启动不起来，比如模组冲突，配置文件更新等问题。请先停止所有世界，自行做好保存存档，此操作会删除之前的存档"
                           type="warning" showIcon/>
                    <br/>
                    <Alert style={{marginTop: '8px'}}
                           message={`如果想更改默认的模板，显示模板预设是在 dist/misc/preinstall.json 修改， 同时请在面板的static/preinstall目录下，设置对应的存档`}
                           type="info" showIcon/>
                    <br/><br/>
                    <Space size={8} wrap>
                        <Button type="primary" onClick={() => save()}>保存</Button>
                    </Space>
                </Spin>
            </Skeleton>
        </>
    )
}