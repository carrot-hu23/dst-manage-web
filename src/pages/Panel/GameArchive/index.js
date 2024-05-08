import {Alert, Button, Col, Drawer, Form, Image, message, Row, Space, Tag, Tooltip} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';

import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

import {parse} from "lua-json";

import {archiveApi} from '../../../api/gameApi';

import style from "../../DstServerList/index.module.css";
import HiddenText from "../../Home2/HiddenText/HiddenText";
import {getUgcModAcfApi} from "../../../api/modApi";
import {formatTimestamp} from "../../../utils/dateUitls";
import {dstSeason, dstSegs} from "../../../utils/dst";



export default ({levels}) => {

    const [archive, setArchive] = useState({
        players: [],
        maxPlayers: 0
    })
    const {cluster} = useParams()
    const {t} = useTranslation()

    useEffect(() => {
        archiveApi(cluster)
            .then(data => {
                console.log(data.data);
                setArchive(data.data)
            }).catch(error => console.log(error))

    }, [])
    const [updateUgcMods, setUpdateUgcMods] = useState([])
    useEffect(()=>{
        getUgcModAcfApi(cluster, "Master")
            .then(resp=>{
            if (resp.code === 200) {
                try {
                    const modoverrides = parse(levels[0]?.modoverrides)
                    const workshopIds = Object.keys(modoverrides).map(key=>key.replace("workshop-", ""))
                    console.log("workshopIds", workshopIds)
                    console.log(resp.data.filter(ugc=>ugc.timeupdated !== ugc.timelast))
                    // workshopId
                    setUpdateUgcMods(resp.data
                        .filter(ugc=>ugc.timeupdated !== ugc.timelast)
                        .filter(ugc=>workshopIds.includes(ugc.workshopId))
                    )
                } catch (e) {
                    console.log(e)
                }
            }
            console.log(resp)
        })
    }, [])

    const [openUgc, setOpenUgc] = useState(false)

    const NeedUpdateUgcMods = ()=>{
        return(<>
            <Drawer width={640}  title="需要更新的模组"  onClose={()=>setOpenUgc(false)} open={openUgc}
                    getContainer={()=>document.body}
            >
                {updateUgcMods.map(ugc=>(
                    <div key={ugc.workshopId}>
                        <Row align="middle">
                            <Col span={4}>
                                <Image preview={false} width={48} src={ugc.img} />
                            </Col>
                            <Col span={6}>{<Tag color={'green'}>{ugc.name}</Tag>}</Col>
                            <Col span={4}>{ugc.workshopId}</Col>
                            <Col span={5}>{formatTimestamp(ugc.timeupdated)}</Col>
                            <Col span={5}>{<Tag color={'blue'}>{formatTimestamp(ugc.timelast)}</Tag>}</Col>
                        </Row>
                    </div>
                ))}
            </Drawer>

            {updateUgcMods.length > 0 && (
                <>
                    <Alert
                        action={[
                            <>
                                <Button type={'link'} size={'small'} onClick={()=>{
                                    setOpenUgc(true)
                                }}>
                                    查看
                                </Button>

                            </>
                        ]}
                        message={`${updateUgcMods.length} 个模组需要更新，请重启世界更新模组`} type="warning" showIcon />

                </>
            )}

        </>)
    }

    function getTimeStatus(daysElapsedInSeason, daysLeftInSeason) {
        const totalDays = daysElapsedInSeason + daysLeftInSeason;
        const thresholdEarly = totalDays / 3;

        if (daysElapsedInSeason <= thresholdEarly) {
            return '早';
        } 
        if (daysLeftInSeason < thresholdEarly) {
            return '晚';
        } 
        return '';
    }

    function shareClusterInfo() {
        if (navigator.clipboard) {
            // 使用Clipboard API复制文本
            let text = ""
            text += `房间: ${  archive.clusterName}\n`
            const status = getTimeStatus(archive?.meta?.Seasons?.ElapsedDaysInSeason, archive?.meta?.Seasons?.RemainingDaysInSeason)
            text += `天数: ${  archive?.meta?.Clock?.Cycles+1}天/${dstSegs[archive.meta?.Clock?.Phase]} ${status}${dstSeason[archive?.meta?.Seasons?.Season]} (${archive?.meta?.Seasons?.ElapsedDaysInSeason}/${archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})\n`
            text += `模组: ${  archive.mods}\n`
            if (archive?.password) {
                text += `密码: ${  archive?.password}\n`
            } else {
                text += `密码: 无\n`
            }
            text += `直连: ${  archive.ipConnect}\n`
            navigator.clipboard.writeText(text)
                .then(()=> {
                    message.success("复制成功")
                })
        } else {
            console.error("浏览器不支持Clipboard API");
        }
    }

    return (
        <>
            <Form className={'dst'}>
                <Form.Item label={t('ClusterName')}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span className={style.icon}>
                            {archive.clusterName}
                        </span>
                        <Button type={'link'} onClick={() => {
                            shareClusterInfo()
                        }}>分享</Button>
                    </div>

                </Form.Item>
                <Form.Item label={t('GameMod')}>
                    <span>
                        {archive.gameMod}
                    </span>
                </Form.Item>
                <Form.Item label={t('Season')}>
                    <span>
                        {archive?.meta?.Clock?.Cycles+1}天/{dstSegs[archive.meta?.Clock?.Phase]} {getTimeStatus(archive?.meta?.Seasons?.ElapsedDaysInSeason, archive?.meta?.Seasons?.RemainingDaysInSeason)}{dstSeason[archive?.meta?.Seasons?.Season]}({archive?.meta?.Seasons?.ElapsedDaysInSeason}/{archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})
                    </span>
                </Form.Item>
                <Form.Item label={t('Mods')}>
                    <span>
                        {archive.mods}
                    </span>
                </Form.Item>
                <Form.Item label={t('Players')}>
                    <span>{`${archive?.players?.length}/${archive.maxPlayers}`}</span>
                </Form.Item>
                <Form.Item label={t('IpConnect')}>
                    <Space size={8}>
                        <HiddenText text={archive.ipConnect} />
                        <Tooltip placement="topLeft" title={`请开放对应的 ${archive.port} udp 端口，已开放请忽略`}>
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </Space>
                </Form.Item>
                <Form.Item label={t('Password')}>
                    <HiddenText text={archive.password} />
                </Form.Item>
                <Form.Item label={t('Version')}>
                    <span>
                        {archive.version} / {archive.lastVersion}
                    </span>
                </Form.Item>
                <Alert style={{
                    marginBottom: '4px'
                }} message={`请开放对应的 ${archive.port} udp 端口，已开放请忽略`} type="info" showIcon closable />
                {archive.version !== archive.lastVersion && archive.version !== 0 &&
                    <Alert
                        action={[
                            <>
                                <a target={'_blank'}
                                   href={'https://forums.kleientertainment.com/game-updates/dst/'} key="list-loadmore-edit"
                                   rel="noreferrer">
                                    查看
                                </a>
                            </>
                        ]}
                        message="饥荒有新的版本了，请点击更新" type="warning" showIcon closable />}
                {archive.version === 0 &&
                    <Alert
                        action={[]}
                        message="读取饥荒服务 version.txt 路径失败" type="warning" showIcon closable />}
                {/*
                <NeedUpdateUgcMods  />
                */}
            </Form>
        </>
    )
}