/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Button,
    Form,
    Switch,
    Space,
    Card,
    message,
    Typography,
    Spin
} from 'antd';

import {useParams} from "react-router-dom";
import { useEffect, useState } from 'react';
import {useTranslation} from "react-i18next";

import { updateGameApi, startHomeApi, archiveApi } from '../../../api/gameApi';
import { createBackupApi } from '../../../api/backupApi';
import CleanArchive from './cleanGame';
import RestoreBackup from './retoreBackup';
import Regenerateworld from './regenerateworld';

import './index.css'





const { Paragraph } = Typography;

function controlDst(cluster,checked, type) {
    return startHomeApi(cluster,checked, type)
}

const GameStatus = (props) => {

    const { t } = useTranslation()

    const {cluster} = useParams()

    const [updateGameStatus, setUpdateStatus] = useState(false)
    const [createBackupStatus, setCreateBackupStatus] = useState(false)

    const [masterStatus, setMasterStatus] = useState(props.data.masterStatus)
    const [cavesStatus, setCavesStatus] = useState(props.data.cavesStatus)

    const [runStatus, setRunStatus] = useState((props.data.masterStatus || props.data.cavesStatus) || false)


    const [archive, setarchive] = useState({
        ipConnect: ""
    })

    const [startLoading, setStartLoading] = useState(false)
    const [startText, setStartText] = useState("")

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
        let prefix
        if (checked) {
            prefix = "启动"
            setStartText("正在启动森林。。。")
        } else {
            prefix = "关闭"
            setStartText("正在关闭森林。。。")
        }
        setStartLoading(true)
        controlDst(cluster,checked, 1).then(resp=>{
            if (resp.code !== 200) {
                message.error(`${prefix}森林失败`,resp.msg)
            } else {
                message.success(`${prefix}森林成功`)
            }
            setStartLoading(false)
            setStartText("")
        })
    }

    const cavesStatusOnClick = (checked, event) => {
        setCavesStatus(checked)
        if (checked) {
            setRunStatus(checked)
        }
        if (!checked && !masterStatus) {
            setRunStatus(checked)
        }
        let prefix
        if (checked) {
            prefix = "启动"
            setStartText("正在启动洞穴。。。")
        } else {
            prefix = "关闭"
            setStartText("正在关闭洞穴。。。")
        }
        setStartLoading(true)
        controlDst(cluster,checked, 2).then(resp=>{
            if (resp.code !== 200) {
                message.error(`${prefix}洞穴失败`,resp.msg)
            } else {
                message.success(`${prefix}洞穴成功`)
            }
            setStartLoading(false)
            setStartText("")
        })
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
            <Spin spinning={startLoading} tip={startText}>
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
                     <Form.Item label={t('ipConnect')}>
                        <Paragraph copyable>{archive.ipConnect}</Paragraph>
                    </Form.Item>

                    <Form.Item label={t('dstStatus')}>
                        <Space>
                            <Button type={masterStatus ? 'primary' : 'default'} >{masterStatus ? t('masterRunning') : t('masterNotRun')}</Button>
                            <Button type={cavesStatus ? 'primary' : 'default'} >{cavesStatus ? t('cavesRunning') : t('cavesNotRun')}</Button>
                        </Space>

                    </Form.Item>
                    {/* <Form.Item label="启动地面和洞穴" >
                        <Switch checkedChildren="开启" unCheckedChildren="关闭"
                            onClick={(checked, event) => {
                                runStatusOnClinck(checked, event)
                            }}
                            checked={runStatus} defaultChecked={!props.data.masterStatus || !props.data.cavesStatus} />
                    </Form.Item> */}
                    <Form.Item label={t('master')}  >
                        <Switch
                            checkedChildren={t('start')} unCheckedChildren={t('stop')}
                            onClick={(checked, event) => { masterStatusOnClick(checked, event) }}
                            checked={masterStatus}
                            defaultChecked={masterStatus} />
                    </Form.Item>
                    <Form.Item label={t('caves')}  >
                        <Switch
                            checkedChildren={t('start')} unCheckedChildren={t('stop')}
                            onClick={(checked, event) => { cavesStatusOnClick(checked, event) }}
                            checked={cavesStatus}
                            defaultChecked={cavesStatus} />
                    </Form.Item>
                    <Form.Item label={t('quickActions')}>
                        <Space>
                            <Button type="primary"
                                onClick={() => { updateGameOnclick() }}
                                loading={updateGameStatus}
                            >
                                {t('updateGame')}
                            </Button>

                            <Button style={{
                                margin: '0 8px',
                                background: '#13CE66',
                                color: '#fff'
                            }}
                                onClick={() => { createBackupOnClick() }}
                                loading={createBackupStatus}
                            >
                                {t('createBackup')}
                            </Button>
                        </Space>

                    </Form.Item>
                    <Form.Item label={t('cleanGame')} >
                        <Space>
                            <CleanArchive />
                            <Regenerateworld />
                        </Space>
                    </Form.Item>

                    <Form.Item label={t('gameBackup')}>
                        <RestoreBackup />
                    </Form.Item>
                </Form>
            </Spin>
        </>
    )
}

export default GameStatus