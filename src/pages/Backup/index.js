/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {Button, Input, message, Modal, Popconfirm, Space, Table, Upload} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {UploadOutlined} from '@ant-design/icons';
import axios from 'axios';

import {Box, Card, Container} from '@mui/material';

// import Highlighter from 'react-highlight-words';
import BackupStatistic from './Statistic';

import {deleteBackupApi, getBackupApi, renameBackupApi, restoreBackupApi} from '../../api/backupApi';


const MyUploadFile = () => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const {cluster} = useParams()

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
        });

        setUploading(true);
        // 发送上传请求
        // 这里使用了axios库，你可以使用你喜欢的库
        axios.post('/api/game/backup/upload', formData,{
            headers: {
                'Cluster': cluster,
            }
        })
            .then(response => {
                console.log(response.data);
                setFileList([]);
                setUploading(false);
            })
            .catch(error => {
                console.log(error);
                setUploading(false);
            });
    };

    const handleRemove = file => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    };

    const handleBeforeUpload = file => {
        setFileList([...fileList, file]);
        return false;
    };

    return (
        <div>
            <Space>
                <Upload
                    fileList={fileList}
                    beforeUpload={handleBeforeUpload}
                    onRemove={handleRemove}
                >
                    <Button icon={<UploadOutlined/>}>选择文件</Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0 || uploading}
                    loading={uploading}
                    // style={{ marginTop: 16 }}
                >
                    {uploading ? '正在上传' : '开始上传'}
                </Button>
            </Space>
        </div>
    );
};


const Backup = () => {

    const {cluster} = useParams()

    // 选中的备份文件
    const [selectBackup, setSelectBackup] = useState({})
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [backupData, setBackupData] = useState([])

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deleteBackup, setDeleteBackup] = useState({});

    const [confirmLoading, setConfirmLoading] = useState(false);

    const inputRef = useRef("");

    const updateBackupData = () => {
        getBackupApi(cluster)
            .then(data => {
                const backupList = data.data || []
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < backupList.length; i++) {
                    backupList[i].key = i
                }
                backupList.sort((a, b) => b.createTime < a.createTime ? -1 : 1)
                setBackupData(backupList)
                setData(backupList)
            })
    }

    useEffect(() => {
        updateBackupData()
    }, [])

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
            setSelectedRowKeys(selectedRowKeys)
            setSelectBackup(selectedRows)
        },
    }

    const deleteSelectBackup = () => {
        const {length} = selectBackup
        if (length < 1) {
            message.warning("请选择存档")
            return
        }
        const fileNames = selectBackup.map(item => item.fileName)
        deleteBackupApi(cluster, fileNames)
            .then(data => {
                console.log(data);
                message.success("删除成功")

                setSelectBackup([])
                setSelectedRowKeys([])
                updateBackupData()
            })
    }

    const deletBackupItem = (value) => {
        setConfirmLoading(true);
        const oldBackupData = backupData
        const newBackupData = oldBackupData.filter(item => value.key !== item.key)

        const newData = data.filter(item => value.key !== item.key)

        deleteBackupApi(cluster, [value.fileName])
            .then(data => {
                if (data.code === 200) {
                    setTimeout(() => {
                        message.success("删除成功")
                        setConfirmLoading(false);
                        setIsDeleteModalOpen(false)
                        setBackupData(newBackupData)

                        setData(newData)
                    }, 100);

                }
            })
    }

    const renameBackupItem = (value) => {
        setConfirmLoading(true);
        const data = {
            fileName: value.fileName,
            newName: `${inputRef.current.input.value}.zip`
        }
        renameBackupApi(cluster, data)
            .then(data => {
                if (data.code === 200) {
                    setTimeout(() => {
                        message.success("重命名成功")
                        updateBackupData()
                    }, 1000);
                }
            }).catch(error => {
            message.error("重名失败")
        }).finally(() => {
            setConfirmLoading(false);
            setIsEditModalOpen(false)
        });
    }

    const restoreArchive = (fileName) => {
        restoreBackupApi(cluster, fileName)
            .then(data => {
                if (data.code === 200) {
                    message.success("恢复存档成功")
                }
            }).catch(error => {
                message.error("恢复存档失败")
            })
    }

    const downloadFile = async (url, cluster, name) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    // 可以在这里添加必要的请求头，例如 Authorization
                    Cluster: cluster
                },
            });

            // 检查响应是否成功
            if (!response.ok) {
                message.warning("下载文件时出错 Network response was not ok")
                return
            }

            // 获取文件 Blob
            const blob = await response.blob();

            // 创建一个链接并下载文件
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = name; // 设置下载的文件名
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(downloadUrl); // 释放内存
        } catch (error) {
            console.error('下载文件时出错:', error);
            message.warning("下载文件时出错")
        }
    }

    const columns = [
        {
            title: '存档名称',
            dataIndex: 'fileName',
            key: 'fileName',
            render: (text) => <Button type="link">{text}</Button>,
            editable: true,
        },
        {
            title: '文件大小',
            dataIndex: 'fileSize',
            key: 'fileSize',
            render: (fileSize) => <span>{`${(fileSize / 1024 / 1024).toFixed(2)} MB`}</span>,
            sorter: (a, b) => b.fileSize - a.fileSize,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (createTime) => <span>{new Date(createTime).toLocaleString()}</span>,
            sorter: (a, b) => b.createTime - a.createTime,
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Restore the archive"
                        description="Are you sure to back up this archive?"
                        onConfirm={()=>{restoreArchive(record.fileName)}}
                        onCancel={()=>{}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link">恢复备份</Button>
                    </Popconfirm>

                    <Button type="link" onClick={() => {
                        setIsEditModalOpen(true);
                        setDeleteBackup(record)
                    }}>修改</Button>
                    <Button type="link" onClick={() => {
                        downloadFile(`/api/game/backup/download?fileName=${record.fileName}&cluster=${cluster}`, cluster, record.fileName)
                    }}>下载</Button>
                    <Button type="text" danger onClick={() => {
                        setIsDeleteModalOpen(true);
                        setDeleteBackup(record)
                    }}>删除</Button>
                </Space>
            ),
        },
    ]

    const HeaderTitle = () => (
        <Space wrap>
            <MyUploadFile/>
            <Button type="primary" danger onClick={deleteSelectBackup}>
                删除
            </Button>
            <Button onClick={updateBackupData}>
                刷新
            </Button>
        </Space>

    )

    const EditModal = () => (
        <Modal title="修改文件名"
               open={isEditModalOpen}
               confirmLoading={confirmLoading}
               getContainer={false}
               onOk={() => {
                   renameBackupItem(deleteBackup)
               }}
               onCancel={() => {
                   setIsEditModalOpen(false)
               }}>
            <br/>
            <span>当前文件名：{deleteBackup.fileName}</span>
            <br/><br/>
            <Input allowClear placeholder="新的文件名" ref={inputRef}/>
        </Modal>
    )

    const DeletetModal = () => (
        <Modal title="提示"
               open={isDeleteModalOpen}
               confirmLoading={confirmLoading}
               getContainer={false}
               onOk={() => {
                   deletBackupItem(deleteBackup)
               }}
               onCancel={() => {
                   setIsDeleteModalOpen(false)
               }}>
            <p>确认删除：</p>
            <p>{deleteBackup.fileName || ""}</p>
        </Modal>
    )

    const backupDataSize = (backupData
        .map(backup => backup.fileSize)
        // eslint-disable-next-line no-restricted-globals
        .reduce((prev, curr) => !isNaN(Number(curr)) ? prev + curr : prev, 0) / 1024 / 1024 / 1024).toFixed(4)

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const dataSource = data.slice(startIndex, endIndex);

    return (
        <>
            <Container maxWidth="xxl">
                <Card>
                    <Box sx={{p: 3}} dir="ltr">
                        <BackupStatistic size={backupData.length} data={backupDataSize}/>
                        <HeaderTitle />
                        <br/><br/>
                        <Table
                            rowSelection={rowSelection}
                            scroll={{
                                x: 600,
                            }}
                            columns={columns}
                            dataSource={dataSource}
                            pagination={{
                                current: currentPage,
                                pageSize,
                                total: data.length,
                                onChange: setCurrentPage,
                                showSizeChanger: true,
                                onShowSizeChange: (current, size) => setPageSize(size),
                            }}
                        />

                        <EditModal/>
                        <DeletetModal/>
                    </Box>
                </Card>
            </Container>
        </>
    )
};
export default Backup;