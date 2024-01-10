import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {Alert, Button, Image, message, Popconfirm, Select, Skeleton, Space, Spin, Table, Tag} from "antd";

import {deleteUgcModAcfFileApi, getUgcModAcfApi} from "../../../api/modApi";
import {getLevelStatusApi} from "../../../api/8level";
import {formatTimestamp} from "../../../utils/dateUitls";



export default () => {
    const {cluster} = useParams()
    const { t } = useTranslation()


    const [acfworkshops, setAcfworkshops] = useState([])
    const [levels, setLevels] = useState(["Master"])
    const notHasLevels = levels === undefined || levels === null || levels.length === 0
    const [levelName, setLevelName] = useState(notHasLevels?"":levels[0])

    const [spin, setSpin] = useState(false)
    const [loading, setLoading] = useState(false)

    async function init() {
        setLoading(true)
        const levelStatusResp = await  getLevelStatusApi()
        if (levelStatusResp.code === 200) {
            const levels = levelStatusResp.data
            const items = []
            levels.forEach(level=>{
                const item = {
                    key: level.uuid,
                    uuid: level.uuid,
                    levelName: level.levelName,
                }
                items.push(item)
            })
            setLevels(items)
        }
        const UgcModAcfResp = await getUgcModAcfApi(cluster, levelName)
        if (UgcModAcfResp.code === 200) {
            setAcfworkshops(UgcModAcfResp.data)
        } else {
            message.error("获取数据失败")
        }
        setLoading(false)
    }

    function queryAcf() {
        setSpin(true)
        getUgcModAcfApi(cluster, levelName)
            .then(resp=>{
                if (resp.code === 200) {
                    setAcfworkshops(resp.data)
                } else {
                    message.error("获取失败")
                }
                setSpin(false)
            })
    }

    useEffect( () => {
        init()
    }, [])

    const handleChange = (value) => {
        console.log(value)
        setLevelName(value)
    }

    const columns = [
        {
            title: '模组图片',
            dataIndex: 'img',
            key: 'img',
            render:  (_, record) => (<Image preview={false} width={48} src={record.img} />),
        },
        {
            title: '模组名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '模组id',
            dataIndex: 'workshopId',
            key: 'workshopId',
            render: (_, record) => (
                <a
                    target={'_blank'}
                    href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${record.workshopId}`}
                    rel="noreferrer"
                >
                    {record.workshopId}
                </a>
            )
        },
        {
            title: '最后更新时间',
            dataIndex: 'timeupdated',
            key: 'timeupdated',
            render: (_, record)=>(
                <>{formatTimestamp(record.timeupdated)}</>
            )
        },
        {
            title: '最新时间',
            dataIndex: 'timelast',
            key: 'timelast',
            render: (_, record)=>(
                <>{formatTimestamp(record.timelast)}</>
            )
        },
        {
            title: '是否需要更新',
            key: 'tags',
            dataIndex: 'tags',
            render: (_,  record) => (
                <>
                    {record.timelast > record.timeupdated && (
                        <Tag color={'red'}>
                            <span>是</span>
                        </Tag>
                    )}
                    {record.timelast <= record.timeupdated && (
                        <Tag >
                            <span>否</span>
                        </Tag>
                    )}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Restore the archive"
                        description="Are you sure to back up this archive?"
                        onConfirm={()=>{
                            deleteUgcModAcfFileApi(cluster, levelName, record.workshopId)
                                .then(resp=>{
                                    if (resp.code === 200) {
                                        message.success("删除成功，请重启世界")
                                    } else {
                                        message.warning("删除失败")
                                    }
                                })
                        }}
                        onCancel={()=>{}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link">删除模组文件</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Skeleton loading={loading}>

                {notHasLevels && (
                    <span>当前暂无世界</span>
                ) }

                {!notHasLevels && (
                    <Spin spinning={spin}>
                        <Skeleton loading={loading} active>
                            <Alert style={{
                                marginBottom: '4px'
                            }} message={`删除旧模组后，请重启世界来下载新模组`} type="info" showIcon closable />
                            <br/>
                            <Space size={8}>
                                <span>{t('level')}</span>
                                <Select
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={handleChange}
                                    defaultValue={notHasLevels?"":levels[0].levelName}
                                    options={levels.map(level=>({
                                            value: level.key,
                                            label: level.levelName,
                                        }))}
                                />
                                <Button type={'primary'} onClick={() => queryAcf()}>{t('query')}</Button>
                            </Space>
                            <br/><br/>
                            <Table scroll={{x: 500}} columns={columns} dataSource={acfworkshops} />
                        </Skeleton>
                    </Spin>
                )}
            </Skeleton>
        </>
    )
}