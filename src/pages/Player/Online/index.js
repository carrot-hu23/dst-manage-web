/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Image, Row, Col, Button, Divider, Space, message, Spin} from 'antd';
import {useParams} from "react-router-dom";
import {useState} from "react";
import { kickPlayerApi, killPlayerApi, respawnPlayerApi } from '../../../api/playerApi';
import { dstRoles } from '../../../utils/dst';

const Online = ({ playerList, addBlacklist, addAdminlist }) => {
    
    const {cluster} = useParams()
    const [loading, setLoading] = useState(false)
    const kickPlayer = (player) => {
        setLoading(true)
        kickPlayerApi(cluster,player)
            .then(response => {
                message.success(`提出 ${player.name} success`)
                setLoading(false)
            })
    }
    const killPlayer = (player) => {
        setLoading(true)
        killPlayerApi(cluster,player)
            .then(response => {
                message.success(`kill ${player.name} success`)
                setLoading(false)
            })
    }
    const respawnPlayer = (player) => {
        setLoading(true)
        respawnPlayerApi(cluster,player)
            .then(response => {
                message.success(`复活 ${player.name} success`)
                setLoading(false)
            })
    }

    const pullPlayer2BlockList = (player) => {
        setLoading(true)
        addBlacklist(player.kuId)
        setLoading(false)
        message.success(`拉黑 ${player.name} 黑名单 success`)
    }
    const pullPlayer2AdminList = (player) => {
        setLoading(true)
        addAdminlist(player.kuId)
        setLoading(false)
        message.success(`设置 ${player.name} 管理员 success`)
    }

    const list = playerList.map((item) => (
        <>
            <Col xs={18} sm={10} md={10} lg={10} xl={10}>
                <Space align="center" size={'middle'}>
                    <div>
                        <Image preview={false} width={48} src={dstRoles[item.role]} />
                    </div>
                    <div>
                        {item.name}
                    </div>
                    <div>
                        <span style={{ color: '#1677ff' }}>{item.kuId}</span>
                    </div>
                </Space>
            </Col>
            <Col xs={4} sm={1} md={4} lg={4} xl={4}>
                <Space size={'middle'}>
                    <span>{item.day}天</span>
                </Space>

            </Col>
            <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                <Spin spinning={loading}>
                <Space wrap>
                    <Button size={'small'} type="primary" onClick={() => { killPlayer(item) }} >K I L L</Button>
                    <Button size={'small'} type="primary" onClick={() => { respawnPlayer(item) }} >复活</Button>
                    <Button size={'small'} type="primary" onClick={() => { kickPlayer(item) }} >踢出</Button>
                    <Button size={'small'} danger onClick={() => { pullPlayer2BlockList(item) }} >拉黑</Button>
                    <Button size={'small'} type="primary" onClick={() => { pullPlayer2AdminList(item) }} >管理员</Button>
                </Space>
                </Spin>
            </Col>
            <Divider style={{ margin: '10px' }} />

        </>
    ))

    return (
        <Row align="middle" gutter={[16, 24]} style={{ rowGap: '14px' }}>
            <br />
            {list}
            {playerList.length === 0 && <span>当前暂无玩家</span>}
        </Row>
    )
}

export default Online