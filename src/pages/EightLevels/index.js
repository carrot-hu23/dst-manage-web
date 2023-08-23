/* eslint-disable */
import React, {useEffect, useState} from "react";

import {Box, Card, Container} from "@mui/material";
import {Button, Form, message, Skeleton, Space, Steps} from "antd";

import Master from "./Master";
import Slave1 from "./Slave1";
import Slave2 from "./Slave2";
import Slave3 from "./Slave3";
import Slave4 from "./Slave4";
import Slave5 from "./Slave5";
import Slave6 from "./Slave6";
import Slave7 from "./Slave7";

import {getLevelConfigApi, saveLevelConfigApi} from "../../api/8level";
import SamePortSettings from "./SamePortSettings";
import ShareConfig from "./ShareConfig";

export default () => {

    const [master] = Form.useForm();
    const [slave1] = Form.useForm();
    const [slave2] = Form.useForm();
    const [slave3] = Form.useForm();
    const [slave4] = Form.useForm();
    const [slave5] = Form.useForm();
    const [slave6] = Form.useForm();
    const [slave7] = Form.useForm();

    const levelFormMap = {
        Master: master,
        Slave1: slave1,
        Slave2: slave2,
        Slave3: slave3,
        Slave4: slave4,
        Slave5: slave5,
        Slave6: slave6,
        Slave7: slave7,
    }

    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);

    const [dstWorldSetting, setDstWorldSetting] = useState({
        zh: {
            forest: {
                WORLDGEN_GROUP: {},
                WORLDSETTINGS_GROUP: {}
            },
            cave: {
                WORLDGEN_GROUP: {},
                WORLDSETTINGS_GROUP: {}
            }
        }
    })

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
                    fetch('misc/dst_world_setting.json')
                        .then(response => response.json())
                        .then(data => {
                            setDstWorldSetting(data)
                        })
                        .catch(error => {
                            console.error('无法加载配置文件', error);
                        })
                } else {
                    message.success("获取配置失败")
                }
                setLoading(false)
            })
    }, [])

    const steps = [
        {
            title: '主世界',
            content: <Master levelForm={master} dstWorldSetting={dstWorldSetting}/>
        },
        {
            title: '从世界1',
            content: <Slave1 levelForm={slave1} dstWorldSetting={dstWorldSetting}/>
        },
        {
            title: '从世界2',
            content: <Slave2 levelForm={slave2} dstWorldSetting={dstWorldSetting}/>
        },
        {
            title: '从世界3',
            content: <Slave3 levelForm={slave3} dstWorldSetting={dstWorldSetting}/>
        },
        {
            title: '从世界4',
            content: <Slave4 levelForm={slave4} dstWorldSetting={dstWorldSetting}/>
        },
        {
            title: '从世界5',
            content: <Slave5 levelForm={slave5} dstWorldSetting={dstWorldSetting}/>
        },
        {
            title: '从世界6',
            content: <Slave6 levelForm={slave6} dstWorldSetting={dstWorldSetting}/>
        },
        {
            title: '从世界7',
            content: <Slave7 levelForm={slave7} dstWorldSetting={dstWorldSetting}/>
        },
    ]

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    const onChange = (value) => {
        setCurrent(value);
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

    function syncModConfig(levelName, levelList) {

        levelList.forEach(syncLevelName=>{

            const levelForm = levelFormMap[levelName]
            const syncLevelForm = levelFormMap[syncLevelName]

            const syncModoverrides = levelForm.getFieldValue().modoverrides
            syncLevelForm.setFieldsValue({
                modoverrides: syncModoverrides,
            });
        })
    }

    function syncLeveldataConfig(levelName, levelList) {

        levelList.forEach(syncLevelName=>{

            const levelForm = levelFormMap[levelName]
            const syncLevelForm = levelFormMap[syncLevelName]

            const syncLeveldataoverride = levelForm.getFieldValue().leveldataoverride
            syncLevelForm.setFieldsValue({
                leveldataoverride: syncLeveldataoverride,
            });
            console.log(levelName, syncLevelName, syncLeveldataoverride)
        })
    }

    function syncAllSlaveLevelModConfig(syncLevelName) {
        const syncModoverrides = master.getFieldValue().modoverrides
        slave1.setFieldsValue({modoverrides: syncModoverrides,});
        slave2.setFieldsValue({modoverrides: syncModoverrides,});
        slave3.setFieldsValue({modoverrides: syncModoverrides,});
        slave4.setFieldsValue({modoverrides: syncModoverrides,});
        slave5.setFieldsValue({modoverrides: syncModoverrides,});
        slave6.setFieldsValue({modoverrides: syncModoverrides,});
        slave7.setFieldsValue({modoverrides: syncModoverrides,});
    }

    function syncSamePort(values) {

        const {server_port, authentication_port, master_server_port} = values
        console.log(values)
        master.setFieldsValue({server_port, authentication_port, master_server_port})

        slave1.setFieldsValue({
            server_port: server_port + 1,
            authentication_port: authentication_port + 1,
            master_server_port: master_server_port + 1
        })
        slave2.setFieldsValue({
            server_port: server_port + 2,
            authentication_port: authentication_port + 2,
            master_server_port: master_server_port + 2
        })
        slave3.setFieldsValue({
            server_port: server_port + 3,
            authentication_port: authentication_port + 3,
            master_server_port: master_server_port + 3
        })
        slave4.setFieldsValue({
            server_port: server_port + 4,
            authentication_port: authentication_port + 4,
            master_server_port: master_server_port + 4
        })
        slave5.setFieldsValue({
            server_port: server_port + 5,
            authentication_port: authentication_port + 5,
            master_server_port: master_server_port + 5
        })
        slave6.setFieldsValue({
            server_port: server_port + 6,
            authentication_port: authentication_port + 6,
            master_server_port: master_server_port + 6
        })
        slave7.setFieldsValue({
            server_port: server_port + 7,
            authentication_port: authentication_port + 7,
            master_server_port: master_server_port + 7
        })
    }

    function syncSameId(id) {

        master.setFieldsValue({id: id})

        slave1.setFieldsValue({
            id: id + 1,
        })
        slave2.setFieldsValue({
            id: id + 2,
        })
        slave3.setFieldsValue({
            id: id + 3,
        })
        slave4.setFieldsValue({
            id: id + 4,
        })
        slave5.setFieldsValue({
            id: id + 5,
        })
        slave6.setFieldsValue({
            id: id + 6,
        })
        slave7.setFieldsValue({
            id: id + 7,
        })
    }

    return (<>
        <Container maxWidth="xl">
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Steps current={current} items={items} size="small" onChange={onChange} />
                    <br/><br/>
                    <Skeleton loading={loading} active avatar>
                        <div>{steps[current].content}</div>
                    </Skeleton>

                    <br/>
                    <div>
                        <Space size={8} wrap>
                            {current > 0 && (
                                <Button
                                    onClick={() => prev()}
                                >
                                    上一步
                                </Button>
                            )}
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => next()}>
                                    下一步
                                </Button>
                            )}
                            {/* eslint-disable-next-line react/jsx-no-bind */}
                            <SamePortSettings syncSamePort={syncSamePort} syncSameId={syncSameId} />
                            {/* eslint-disable-next-line react/jsx-no-bind */}
                            <ShareConfig syncLeveldataConfig={syncLeveldataConfig} syncModConfig={syncModConfig} syncAllSlaveLevelModConfig={syncAllSlaveLevelModConfig} />
                        </Space>

                        <Button
                            type="primary"
                            style={{
                                float: 'right',
                                backgroundColor: '#13CE66'
                            }}
                            onClick={() => {saveLevelConfig()}}>
                            保存设置
                        </Button>
                    </div>
                </Box>
            </Card>
        </Container>
    </>)
}