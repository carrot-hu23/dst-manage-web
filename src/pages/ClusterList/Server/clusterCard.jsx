import React, {useState} from "react";
import {Button, Col, Dropdown, message, Modal, Popconfirm, Row, Space, Tag, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import {Box, Card} from "@mui/material";

import {useTheme} from "../../../hooks/useTheme";
import {dstSeason, dstSegs, getDstMod, getTimeStatus} from "../../../utils/dst";
import {UpdateServer} from "./index";
import {deleteCluster} from "../../../api/clusterApi";
import style from "@/pages/DstServerList/index.module.css";

const {Link} = Typography;

export default ({cluster, showAddBtn, serverList, updateServerList, removeServerList}) => {

    const t = useTheme()
    const navigate = useNavigate()
    const [openUpdate, setOpenUpdate] = useState(false)

    function deleteServer(server) {
        deleteCluster(server.clusterName)
            .then(resp => {
                if (resp.code === 200) {
                    message.success("删除成功")
                    removeServerList(server)
                } else {
                    message.error("删除失败")
                }
            })
    }

    const items = [
        // {
        //     label: (
        //         <div>
        //             <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultValue={cluster.status}/>
        //         </div>
        //     ),
        //     key: '0',
        // },
        // {
        //     type: 'divider',
        // },
        {
            label: (
                <div>
                    {showAddBtn && (
                        <Popconfirm
                            title="是否删除房间"
                            description="请自行做好备份"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                                deleteServer(cluster)
                            }}
                        >
                            <Button size={"small"} color="danger" variant="filled">删除</Button>
                        </Popconfirm>
                    )}
                </div>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <div>
                    {showAddBtn && (
                        <Button size={"small"} color="primary" variant="filled" onClick={() => {
                            setOpenUpdate(true)
                        }}>编辑</Button>
                    )}
                </div>
            ),
            key: '2',
        },
    ];

    return (<>

        <Modal width={860} title="更新房间配置" open={openUpdate} onOk={() => setOpenUpdate(false)}
               onCancel={() => setOpenUpdate(false)}
               footer={null}>
            <UpdateServer server={cluster}
                          serverList={serverList}
                          updateServerList={updateServerList}
                          setOpen={setOpenUpdate}
            />
        </Modal>

        <Card>
            <Box sx={{p: 3}} dir="ltr">
                <div className={'header'}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Typography.Title
                                level={5}
                                style={{
                                    margin: 0,
                                }}
                                ellipsis
                            >
                                <Link onClick={() => {
                                    if (cluster.gameArchive === null) {
                                        message.warning("当前房间服务不可用")
                                    } else {
                                        navigate(`/${cluster.clusterName}/${cluster.name}/dashboard/panel`)
                                    }

                                }}>
                                    {cluster.name}
                                </Link>

                            </Typography.Title>
                        </Col>
                        <Col span={8}>
                            <div className={'day'}>
                                {cluster.gameArchive === null && (
                                    <Tag color={'red'} bordered={false}>当前房间不可访问</Tag>
                                )}
                                {cluster.gameArchive && (
                                    <span>
                                        {cluster?.gameArchive?.meta?.Clock?.Cycles + 1}天/{dstSegs[cluster?.gameArchive?.meta?.Clock?.Phase]} {getTimeStatus("zh", cluster?.gameArchive?.meta?.Seasons?.ElapsedDaysInSeason, cluster?.gameArchive?.meta?.Seasons?.RemainingDaysInSeason)}{dstSeason[cluster?.gameArchive?.meta?.Seasons?.Season]}({cluster?.gameArchive?.meta?.Seasons?.ElapsedDaysInSeason}/{cluster?.gameArchive?.meta?.Seasons?.ElapsedDaysInSeason + cluster?.gameArchive?.meta?.Seasons?.RemainingDaysInSeason})
                                    </span>
                                )}
                            </div>
                        </Col>
                        <Col span={4}>
                            <div>
                                <Button color={cluster.status ? 'primary' : 'default'} variant="filled" size={'small'}
                                        style={{
                                            float: 'right',
                                            borderRadius: 12,
                                            fontSize: 12
                                        }}>
                                    {cluster.status && (<span>运行</span>)}
                                    {!cluster.status && (<span>停止</span>)}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={'content'} style={{
                    paddingTop: 12
                }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Space size={16} wrap>
                                <div>
                                    <Tag color={'green'} bordered={false}>{getDstMod("", cluster?.gameArchive?.gameMod)}</Tag>
                                    <Tag color={'green'} bordered={false}>模组:{cluster?.gameArchive?.mods}</Tag>
                                </div>
                                <Typography.Text
                                    style={{
                                        width: 300
                                    }}
                                    ellipsis
                                >
                                    <span className={style.icon}>
                                         {cluster?.gameArchive?.clusterName}
                                    </span>

                                </Typography.Text>
                            </Space>
                        </Col>
                        <Col span={8}>
                            <Tag color={'gold'} bordered={false}>{cluster.clusterType}</Tag>
                            {cluster.clusterType !== '本地' && <span>
                                 <Tag color={'blue'} bordered={false}>{cluster.ip}</Tag>
                            </span>}
                        </Col>
                        <Col span={4}>
                            <Dropdown
                                trigger={['click']}
                                menu={{
                                    items,
                                }}
                            >
                                <Button type={'text'} size={'small'}
                                        variant="filled"
                                        style={{
                                            float: 'right',
                                            borderRadius: 12,
                                        }}>
                                    更多
                                </Button>
                            </Dropdown>
                        </Col>
                    </Row>
                </div>
            </Box>
        </Card>
    </>)
}