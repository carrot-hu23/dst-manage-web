/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Image, Row, Col, Button, Divider, Space, message } from 'antd';
import {useParams} from "react-router-dom";
import { kickPlayerApi, killPlayerApi, respawnPlayerApi } from '../../../api/playerApi';
import { dstRoles } from '../../../utils/dst';

const Online = ({ playerList }) => {
    
    const {cluster} = useParams()
    
    const kickPlayer = (player) => {
        kickPlayerApi(cluster,player)
            .then(response => {
                message.success(`提出 ${player.name} success`)
            })
    }
    const killPlayer = (player) => {
        killPlayerApi(cluster,player)
            .then(response => {
                message.success(`kill ${player.name} success`)
            })
    }
    const respawnPlayer = (player) => {
        respawnPlayerApi(cluster,player)
            .then(response => {
                message.success(`复活 ${player.name} success`)
            })
    }

    const pullPlayer2BlockList = (player) => {
        message.warning("未实现拉黑")
    }
    const pullPlayer2AdminList = (player) => {
        message.warning("未实现设置管理员")
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
                <Space>
                    <Button size={'small'} type="primary" onClick={() => { killPlayer(item) }} >K I L L</Button>
                    <Button size={'small'} type="primary" onClick={() => { respawnPlayer(item) }} >复活</Button>
                    <Button size={'small'} type="primary" onClick={() => { kickPlayer(item) }} >踢出</Button>
                    <Button size={'small'} danger onClick={() => { pullPlayer2BlockList(item) }} >拉黑</Button>
                    {/* <Button size={'small'} type="primary" onClick={() => { pullPlayer2AdminList(item) }} >管理员</Button> */}
                </Space>
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