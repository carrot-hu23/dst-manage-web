import React, {useEffect, useState} from "react";

import {Box, Card, Container} from "@mui/material";
import {Button, Form, message, Skeleton, Steps} from "antd";

import Master from "./Master";
import Slave1 from "./Slave1";
import Slave2 from "./Slave2";
import Slave3 from "./Slave3";
import Slave4 from "./Slave4";
import Slave5 from "./Slave5";
import Slave6 from "./Slave6";
import Slave7 from "./Slave7";

import {getLevelConfigApi, saveLevelConfigApi} from "../../api/8level";

export default () => {

    const [master] = Form.useForm();
    const [slave1] = Form.useForm();
    const [slave2] = Form.useForm();
    const [slave3] = Form.useForm();
    const [slave4] = Form.useForm();
    const [slave5] = Form.useForm();
    const [slave6] = Form.useForm();
    const [slave7] = Form.useForm();

    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        getLevelConfigApi("")
            .then(resp => {
                if (resp.code === 200) {
                    message.success("获取配置成功")
                    // {...{leveldataoverride: "return {}"}, ...data.data.master.server_ini}
                    master.setFieldsValue({...resp.data.master, ...resp.data.master.server_ini})
                    slave1.setFieldsValue({...resp.data.slave1, ...resp.data.slave1.server_ini})
                    slave2.setFieldsValue({...resp.data.slave2, ...resp.data.slave2.server_ini})
                    slave3.setFieldsValue({...resp.data.slave3, ...resp.data.slave3.server_ini})
                    slave4.setFieldsValue({...resp.data.slave4, ...resp.data.slave4.server_ini})
                    slave5.setFieldsValue({...resp.data.slave5, ...resp.data.slave5.server_ini})
                    slave6.setFieldsValue({...resp.data.slave6, ...resp.data.slave6.server_ini})
                    slave7.setFieldsValue({...resp.data.slave7, ...resp.data.slave7.server_ini})
                } else {
                    message.success("获取配置失败")
                }
                setLoading(false)
            })
    }, [])

    const steps = [
        // {
        //     title: '房间设置',
        //     content: <Cluster form={clusterIni}/>
        // },
        {
            title: '主世界',
            content: <Master levelForm={master}/>
        },
        {
            title: '从世界1',
            content: <Slave1 levelForm={slave1}/>
        },
        {
            title: '从世界2',
            content: <Slave2 levelForm={slave2}/>
        },
        {
            title: '从世界3',
            content: <Slave3 levelForm={slave3}/>
        },
        {
            title: '从世界4',
            content: <Slave4 levelForm={slave4}/>
        },
        {
            title: '从世界5',
            content: <Slave5 levelForm={slave5}/>
        },
        {
            title: '从世界6',
            content: <Slave6 levelForm={slave6}/>
        },
        {
            title: '从世界7',
            content: <Slave7 levelForm={slave7}/>
        },
    ]

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    function saveLevelConfig() {
        const body = {
            master: {
                leveldataoverride: master.getFieldValue().leveldataoverride,
                modoverrides: master.getFieldValue().modoverrides,
                server_ini: master.getFieldValue()
            },
            slave1: {
                leveldataoverride: slave1.getFieldValue().leveldataoverride,
                modoverrides: slave1.getFieldValue().modoverrides,
                server_ini: slave1.getFieldValue()
            },
            slave2: {
                leveldataoverride: slave2.getFieldValue().leveldataoverride,
                modoverrides: slave2.getFieldValue().modoverrides,
                server_ini: slave2.getFieldValue()
            },
            slave3: {
                leveldataoverride: slave3.getFieldValue().leveldataoverride,
                modoverrides: slave3.getFieldValue().modoverrides,
                server_ini: slave3.getFieldValue()
            },
            slave4: {
                leveldataoverride: slave4.getFieldValue().leveldataoverride,
                modoverrides: slave4.getFieldValue().modoverrides,
                server_ini: slave4.getFieldValue()
            },
            slave5: {
                leveldataoverride: slave5.getFieldValue().leveldataoverride,
                modoverrides: slave5.getFieldValue().modoverrides,
                server_ini: slave5.getFieldValue()
            },
            slave6: {
                leveldataoverride: slave6.getFieldValue().leveldataoverride,
                modoverrides: slave6.getFieldValue().modoverrides,
                server_ini: slave6.getFieldValue()
            },
            slave7: {
                leveldataoverride: slave7.getFieldValue().leveldataoverride,
                modoverrides: slave7.getFieldValue().modoverrides,
                server_ini: slave7.getFieldValue()
            },
        }
        console.log("levelConfig body: ", body)
        saveLevelConfigApi("", body)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success("保存成功")
                    setCurrent(0)
                } else {
                    message.error("保存失败")
                }
            })
    }

    return (<>
        <Container maxWidth="xl">
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Steps current={current} items={items} size="small"/>
                    <br/><br/>
                    <Skeleton loading={loading} active avatar>
                        <div>{steps[current].content}</div>
                    </Skeleton>

                    <br/>
                    <div>
                        {current > 0 && (
                            <Button
                                style={{
                                    margin: '0 8px',
                                }}
                                onClick={() => prev()}
                            >
                                上一步
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => {
                                saveLevelConfig()
                            }}>
                                保存设置
                            </Button>
                        )}
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()}>
                                下一步
                            </Button>
                        )}
                    </div>
                </Box>
            </Card>
        </Container>
    </>)
}