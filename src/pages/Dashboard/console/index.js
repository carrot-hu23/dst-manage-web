/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Button,
    Form,
    Switch,
    Space,
    Card,
    message,
    Typography
} from 'antd';

import {useParams} from "react-router-dom";
import { useEffect, useState } from 'react';

import { updateGameApi, startHomeApi, archiveApi } from '../../../api/gameApi';
import { createBackupApi } from '../../../api/backupApi';
import CleanArchive from './cleanGame';
import RestoreBackup from './retoreBackup';

import './index.css'
import Regenerateworld from './regenerateworld';


const { Paragraph } = Typography;

function controlDst(cluster,checked, type) {
    return startHomeApi(cluster,checked, type)
}

const GameStatus = (props) => {

    const {cluster} = useParams()

    const [updateGameStatus, setUpdateStatus] = useState(false)
    const [createBackupStatus, setCreateBackupStatus] = useState(false)

    const [masterStatus, setMasterStatus] = useState(props.data.masterStatus)
    const [cavesStatus, setCavesStatus] = useState(props.data.cavesStatus)

    const [runStatus, setRunStatus] = useState((props.data.masterStatus || props.data.cavesStatus) || false)


    const [archive, setarchive] = useState({
        ipConnect: ""
    })

    useEffect(() => {
        // console.log("caves", props.data.cavesStatus)
        setMasterStatus(props.data.masterStatus)
        setCavesStatus(props.data.cavesStatus)
        setRunStatus(props.data.masterStatus || props.data.cavesStatus)

        archiveApi(cluster)
        .then(data => {
            console.log(data.data);
            const ar = {
                clusterName: data.data.clusterName,
                gameMod: data.data.gameMod,
                mods: data.data.mods,
                maxPlayers: data.data.maxPlayers,
                ipConnect: data.data.ipConnect
            }
            setarchive(ar)
        }).catch(error => console.log(error))

    }, [props.data])

    const runStatusOnClinck = (checked, event) => {
        controlDst(cluster,checked, 0)
            .then(data => {
                if (data.code === 200) {
                    message.success('启动游戏成功')
                }
                setMasterStatus(checked)
                setCavesStatus(checked)
                setRunStatus(checked)
            })
    }

    const masterStatusOnClick = (checked, event) => {
        setMasterStatus(checked)
        if (checked) {
            setRunStatus(checked)
        }
        if (!checked && !cavesStatus) {
            setRunStatus(checked)
        }
        controlDst(cluster,checked, 1)
    }

    const cavesStatusOnClick = (checked, event) => {
        setCavesStatus(checked)
        if (checked) {
            setRunStatus(checked)
        }
        if (!checked && !masterStatus) {
            setRunStatus(checked)
        }
        controlDst(cluster,checked, 2)
    }

    const updateGameOnclick = () => {
        message.success('正在更新游戏')
        setUpdateStatus(true)
        updateGameApi(cluster)
            .then(response => {
                if (response.code === 200) {
                    message.success('饥荒更新完成')
                } else {
                    message.error('饥荒更新失败', response.msg)
                }

                setUpdateStatus(false)
            })
            .catch(error => {
                message.error('饥荒更新失败')
                setUpdateStatus(false)
            })
    }

    const createBackupOnClick = () => {

        message.success('正在创建游戏备份')
        createBackupApi(cluster)
            .then(response => {
                message.success('创建游戏备份成功')
                setCreateBackupStatus(false)
            })
            .catch(error => {
                message.error('创建游戏备份失败')
                setCreateBackupStatus(false)
            })
    }

    return (
        <>
            <Card
                title="游戏状况"
                bordered={false}
            >
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    labelAlign={'left'}
                >
                     <Form.Item label="世界直连">
                        <Paragraph copyable>{archive.ipConnect}</Paragraph>
                    </Form.Item>

                    <Form.Item label="饥荒状况">
                        <Space>
                            <Button type={masterStatus ? 'primary' : 'default'} >{masterStatus ? '地面运行中' : '地面未启动'}</Button>
                            <Button type={cavesStatus ? 'primary' : 'default'} >{cavesStatus ? '洞穴运行中' : '洞穴未启动'}</Button>
                        </Space>

                    </Form.Item>
                    <Form.Item label="启动地面和洞穴" >
                        <Switch checkedChildren="开启" unCheckedChildren="关闭"
                            onClick={(checked, event) => {
                                runStatusOnClinck(checked, event)
                            }}
                            checked={runStatus} defaultChecked={!props.data.masterStatus || !props.data.cavesStatus} />
                    </Form.Item>
                    <Form.Item label="启动地面"  >
                        <Switch
                            checkedChildren="开启" unCheckedChildren="关闭"
                            onClick={(checked, event) => { masterStatusOnClick(checked, event) }}
                            checked={masterStatus}
                            defaultChecked={masterStatus} />
                    </Form.Item>
                    <Form.Item label="启动洞穴"  >
                        <Switch checkedChildren="开启" unCheckedChildren="关闭"
                            onClick={(checked, event) => { cavesStatusOnClick(checked, event) }}
                            checked={cavesStatus}
                            defaultChecked={cavesStatus} />
                    </Form.Item>
                    <Form.Item label="快捷操作">
                        <Space>
                            <Button type="primary"
                                onClick={() => { updateGameOnclick() }}
                                loading={updateGameStatus}
                            >
                                更新游戏
                            </Button>

                            <Button style={{
                                margin: '0 8px',
                                background: '#13CE66',
                                color: '#fff'
                            }}
                                onClick={() => { createBackupOnClick() }}
                                loading={createBackupStatus}
                            >
                                创建备份
                            </Button>
                        </Space>

                    </Form.Item>
                    <Form.Item label="清理游戏存档" >
                        <Space>
                            <CleanArchive />
                            <Regenerateworld />
                        </Space>
                    </Form.Item>

                    <Form.Item label="恢复游戏备份">
                        <RestoreBackup />
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default GameStatus