/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Button,
    Form,
    Switch,
    Space,
    message,
    Typography,
    Spin, Popconfirm
} from 'antd';

import {useParams} from "react-router-dom";
import {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";

import {updateGameApi, startHomeApi} from '../../../api/gameApi';
import {createBackupApi} from '../../../api/backupApi';
import CleanArchive from './cleanGame';
import Regenerateworld from './regenerateworld';

import './index.css'
import {deleteStepupWorkshopApi} from "../../../api/modApi";


const {Paragraph} = Typography;

function controlDst(cluster, checked, type) {
    return startHomeApi(cluster, checked, type)
}

const GameStatus = (props) => {

    const {t} = useTranslation()

    const {cluster} = useParams()

    const [updateGameStatus, setUpdateStatus] = useState(false)
    const [createBackupStatus, setCreateBackupStatus] = useState(false)

    const [masterStatus, setMasterStatus] = useState(props.data.masterStatus)
    const [cavesStatus, setCavesStatus] = useState(props.data.cavesStatus)

    const [runStatus, setRunStatus] = useState((props.data.masterStatus || props.data.cavesStatus) || false)

    const [startLoading, setStartLoading] = useState(false)
    const [startText, setStartText] = useState("")

    const [open, setOpen] = useState(false);

    useEffect(() => {
        // console.log("caves", props.data.cavesStatus)
        setMasterStatus(props.data.masterStatus)
        setCavesStatus(props.data.cavesStatus)
        setRunStatus(props.data.masterStatus || props.data.cavesStatus)

    }, [props.data])

    const runStatusOnClinck = (checked, event) => {
        let prefix
        if (checked) {
            prefix = "启动"
            setStartText("正在启动游戏。。。")
        } else {
            prefix = "关闭"
            setStartText("正在关闭游戏。。。")
        }
        setStartLoading(true)
        controlDst(cluster, checked, 0)
            .then(data => {
                if (data.code === 200) {
                    message.success(`正在${prefix}游戏。。。`)
                } else {
                    message.error(`${prefix}游戏失败`)
                }
                setMasterStatus(checked)
                setCavesStatus(checked)
                setRunStatus(checked)
                setStartLoading(false)
                setStartText("")
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
        controlDst(cluster, checked, 1).then(resp => {
            if (resp.code !== 200) {
                message.error(`${prefix}森林失败${resp.msg}`)
                message.warning("请检查饥荒服务器路径是否设置正确")
            } else {
                message.success(`正在${prefix}森林。。。`)
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
        controlDst(cluster, checked, 2).then(resp => {
            if (resp.code !== 200) {
                message.error(`${prefix}洞穴失败${resp.msg}`)
                message.warning("请检查饥荒服务器路径是否设置正确")
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
                    message.error(`${response.msg}`)
                    message.warning("请检查steamcmd路径是否设置正确")
                }

                setUpdateStatus(false)
            })
            .catch(error => {
                message.error(`饥荒更新失败${error}`)
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
                message.error(`创建游戏备份失败${error}`)
                setCreateBackupStatus(false)
            })
    }

    function deleteStepupWorkshop() {
        deleteStepupWorkshopApi()
            .then(data => {
                if (data.code === 200) {
                    message.success("更新模组成功，请重启房间")
                } else {
                    message.warning("更新模组失败")
                }
                setOpen(false)
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
                        span: 24,
                    }}
                    layout="horizontal"
                    labelAlign={'left'}
                >
                    {/*
                    <Form.Item label={t('dstStatus')}>
                        <Space wrap>
                            <Button
                                type={masterStatus ? 'primary' : 'default'}>{masterStatus ? t('masterRunning') : t('masterNotRun')}</Button>
                            <Button
                                type={cavesStatus ? 'primary' : 'default'}>{cavesStatus ? t('cavesRunning') : t('cavesNotRun')}</Button>
                        </Space>

                    </Form.Item>
                    <Form.Item label="启动">
                        <Switch checkedChildren="开启" unCheckedChildren="关闭"
                                onClick={(checked, event) => {
                                    runStatusOnClinck(checked, event)
                                }}
                                checked={runStatus}
                                defaultChecked={!props.data.masterStatus || !props.data.cavesStatus}/>
                    </Form.Item>
                    <Form.Item label={t('master')}>
                        <Switch
                            checkedChildren={t('start')} unCheckedChildren={t('stop')}
                            onClick={(checked, event) => {
                                masterStatusOnClick(checked, event)
                            }}
                            checked={masterStatus}
                            defaultChecked={masterStatus}/>
                    </Form.Item>
                    <Form.Item label={t('caves')}>
                        <Switch
                            checkedChildren={t('start')} unCheckedChildren={t('stop')}
                            onClick={(checked, event) => {
                                cavesStatusOnClick(checked, event)
                            }}
                            checked={cavesStatus}
                            defaultChecked={cavesStatus}/>
                    </Form.Item>
                    */}
                    <Form.Item label={t('quickActions')}>
                        <Space size={8} wrap>
                            <Button type="primary"
                                    onClick={() => {
                                        updateGameOnclick()
                                    }}
                                    loading={updateGameStatus}
                            >
                                {t('updateGame')}
                            </Button>

                            <Button style={{
                                background: '#13CE66',
                                color: '#fff'
                            }}
                                    onClick={() => {
                                        createBackupOnClick()
                                    }}
                                    loading={createBackupStatus}
                            >
                                {t('createBackup')}
                            </Button>
                        </Space>
                    </Form.Item>
                    <Form.Item label={t('其他操作')}>
                        <Space size={8} wrap>
                        <CleanArchive/>
                        <Popconfirm
                            title="是否更新房间模组"
                            description={(
                                <span>
                        当房间出现服务器模板版本过低时点击
                            <br />
                        点击后请重新启动房间
                        </span>
                            )}
                            open={open}
                            onConfirm={()=>deleteStepupWorkshop()}
                            onCancel={()=>setOpen(false)}
                        >
                            <Button type="primary" danger onClick={() => setOpen(true)}>更新模组</Button>
                        </Popconfirm>
                        </Space>
                    </Form.Item>
                    {/*
                     <Form.Item label={t('gameBackup')}>
                        <RestoreBackup />
                    </Form.Item>
                     */}

                </Form>
            </Spin>
        </>
    )
}

export default GameStatus