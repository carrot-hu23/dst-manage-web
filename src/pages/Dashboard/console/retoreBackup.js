import { useEffect, useState } from 'react';
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

import { Input, Skeleton, Modal, List, Drawer, Button, Space, Popconfirm, message } from 'antd';

import { getBackupApi } from '../../../api/backupApi';


const RestoreBackup = (props) => {

    const { t } = useTranslation()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [backupList, setBackupList] = useState([])
    const [oldBackupList, setOldBackupList] = useState([])
    const [backupItem, setBackupItem] = useState({})
    const {cluster} = useParams()

    useEffect(() => {
        getBackupApi(cluster).then(data=>{
        setBackupList(data.data || [])
        setOldBackupList(data.data  || [])
        }).catch(error=>{
            console.log(error);
            message.error("获取游戏备份失败")
        })
        
    }, [])

    const [open, setOpen] = useState(false);
    const showDrawer = (item) => {
        setOpen(true);
        setBackupItem(item)
    };
    const onClose = () => {
        setOpen(false);
        setBackupItem({})
        setRestoreConfirmn(false);
    };

    const [restoreConfirm, setRestoreConfirmn] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showPopconfirm = () => {
        setRestoreConfirmn(true);
    };

    const handlOkRestore = () => {
        setConfirmLoading(true);

        // const config = readDstConfigSync()
        // const clusterPath = window.require('path').join(config.doNotStarveTogether, config.cluster)
        // const backPath = window.require('path').join(config.backupPath, backupItem.fileName)
        // console.log('clusterPath', clusterPath, 'backPath', backPath);

        // //删除 存档
        // removeDir(clusterPath)
        // //解压指定的存档
        // unzip(backPath, config.doNotStarveTogether, ()=>{
        //     message.success("恢复存档成功")
        // }, error=>{
        //     console.log('unzip error: ', error);
        //     message.error("恢复存档失败, 请先关闭服务器再恢复！！！")
        // })
        // setRestoreConfirmn(false);
        // setConfirmLoading(false);

    };


    return (
        <>
        <Button onClick={()=>setIsModalOpen(true)}>{t('restoreBackup')}</Button>
            <Modal
                getContainer={false}
                open={isModalOpen}
                footer={null}
                onOk={() => setIsModalOpen(true)}
                onCancel={() => setIsModalOpen(false)}
                className='modal'
            >
                <Skeleton title={"正在查询房间信息"} loading={props.loading} active>

                        <Input placeholder="搜索备份" allowClear
                            onChange={(e) => {
                                const {value} = e.target
                                if (value === null || value === '') {
                                    setBackupList(oldBackupList)
                                } else {
                                    const filter = oldBackupList.filter(item => item.fileName.search(value) !== -1)
                                    setBackupList(filter)
                                }
                            }}
                        />
                        <br /><br />
                        <div style={{
                            overflowY: 'auto',
                            height: 400
                        }}>
                            <List
                                itemLayout="horizontal"
                                dataSource={backupList}
                                renderItem={(item) => (
                                    <List.Item
                                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                                        actions={[<a key={item.fileName} onClick={() => showDrawer(item)}> 点击</a>]}
                                    >
                                        <List.Item.Meta
                                            description={<div style={{
                                                color: 'black',
                                            }}>{item.fileName}</div>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>

                </Skeleton>
            </Modal>

            <Drawer
                title={t('restoreBackup')}
                placement={'right'}
                width={500}
                onClose={onClose}
                open={open}
               
            >
                <h3>{backupItem.fileName}</h3>
                <div>
                    <span>时间: {`${new Date(backupItem.createTime).toLocaleString()  }`}</span>
                </div>
                <br />
                <div>
                    <span>大小: {(backupItem.fileSize / 1024 / 1024).toFixed(2)} M</span>
                </div>
                <br />
                <br />
                <Space>
                    {/* <Button onClick={() => { openBackupDir(backupItem.fileName) }} >打开</Button> */}

                    <Popconfirm
                        title="确认恢复存档吗"
                        description={(<div>
                            <div>
                                <span>请关闭游戏服务器后再恢复存档,</span>
                            </div>
                            <div>
                                <span>恢复存档后将丢失之前的进度,</span>
                            </div>
                            <div>
                                <span>请做好备份</span>
                            </div>
                            </div>)}
                        open={restoreConfirm}
                        onConfirm={handlOkRestore}
                        okButtonProps={{
                            loading: confirmLoading,
                        }}
                        onCancel={()=>setRestoreConfirmn(false)}
                    >
                        <Button type='primary' onClick={showPopconfirm}>恢复</Button>
                    </Popconfirm>
                    {/* <Button type='primary' danger >删除</Button> */}
                </Space>
            </Drawer>
        </>
    )
}

export default RestoreBackup