/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {Alert, Button, Input, message, Modal, Popconfirm, Space, Table, Upload} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {UploadOutlined} from '@ant-design/icons';
import axios from 'axios';
import {useTranslation} from "react-i18next";

import {
    deleteBackupApi,
    getBackupApi,
    renameBackupApi,
    restoreBackupApi
} from '../../../api/backupApi';
import BackupStatistic from "./Statistic";
import CreateBackUpBtn from "../../Panel/Op/CreateBackUpBtn";


const MyUploadFile = ({reload}) => {
    const {t} = useTranslation()

    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
        });

        setUploading(true);
        // 发送上传请求
        // 这里使用了axios库，你可以使用你喜欢的库
        axios.post('/api/game/backup/upload', formData)
            .then(response => {
                console.log(response.data);
                if (response?.data?.code === 200) {
                    message.success("上传成功")
                }
                setFileList([]);
                setUploading(false);
                reload()
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
                    <Button icon={<UploadOutlined/>}>{t('backup.select.File')}</Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0 || uploading}
                    loading={uploading}
                    // style={{ marginTop: 16 }}
                >
                    {uploading ? t('backup.uploading') : t('backup.upload')}
                </Button>
            </Space>
        </div>
    );
};


const Backup = () => {

    const {t} = useTranslation()
    const {cluster} = useParams()
    const actionRef = useRef();

    const [loading, setLoading] = useState(true)

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
                backupList.sort((a, b) => {
                    return b.createTime < a.createTime ? -1 : 1
                })
                setBackupData(backupList)
                setData(backupList)
                setLoading(false)
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
                message.success(t("backup.delete.ok"))

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
                        message.success(t("backup.delete.ok"))
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
                        message.success(t("backup.rename.ok"))
                        updateBackupData()
                    }, 1000);
                }
            }).catch(error => {
            message.error(t("backup.rename.error"))
        }).finally(() => {
            setConfirmLoading(false);
            setIsEditModalOpen(false)
        });
    }

    const restoreArchive = (fileName) => {
        restoreBackupApi(cluster, fileName)
            .then(data => {
                if (data.code === 200) {
                    message.success(t("backup.restore.ok"))
                }
            }).catch(error => {
            console.log(error)
            message.error(t("backup.restore.error"))
        })
    }

    const columns = [
        {
            title: t('backup.fileName'),
            dataIndex: 'fileName',
            key: 'fileName',
            render: (text) => <Button type="link">{text}</Button>,
            editable: true,
        },
        {
            title: t('backup.fileSize'),
            dataIndex: 'fileSize',
            key: 'fileSize',
            render: (fileSize) => <span>{`${(fileSize / 1024 / 1024).toFixed(2)} MB`}</span>,
            sorter: (a, b) => b.fileSize - a.fileSize,
        },
        {
            title: t('backup.createTime'),
            dataIndex: 'createTime',
            key: 'createTime',
            render: (createTime) => <span>{new Date(createTime).toLocaleString()}</span>,
            sorter: (a, b) => b.createTime - a.createTime,
        },
        {
            title: t('backup.action'),
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title={t('backup.restore.title')}
                        description={<>
                            <br/>
                           <span>
                               {t('backup.restore.desc')}
                           </span>
                            <br/><br/>
                            <CreateBackUpBtn/>
                        </>}
                        onConfirm={() => {
                            restoreArchive(record.fileName)
                        }}
                        onCancel={() => {
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link">{t('backup.restore')}</Button>
                    </Popconfirm>

                    <Button type="link" onClick={() => {
                        setIsEditModalOpen(true);
                        setDeleteBackup(record)
                    }}>{t('backup.edit')}</Button>
                    <Button type="link" onClick={() => {
                        window.location.href = `/api/game/backup/download?fileName=${record.fileName}`;
                    }}>{t('backup.download')}</Button>
                    <Button type="text" danger onClick={() => {
                        setIsDeleteModalOpen(true);
                        setDeleteBackup(record)
                    }}>{t('backup.delete')}</Button>
                </Space>
            ),
        },
    ]

    const HeaderTitle = () => (
        <Space wrap>
            <MyUploadFile reload={updateBackupData}/>
            <Button type="primary" danger onClick={deleteSelectBackup}>
                {t('backup.delete')}
            </Button>
            <Button onClick={updateBackupData}>
                {t('backup.refresh')}
            </Button>
            <CreateBackUpBtn/>
        </Space>

    )

    const EditModal = () => (
        <Modal title={t('backup.edit.title')}
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
            <div>{t('backup.cur.filename')}: </div>
            <div>
                {deleteBackup.fileName}
            </div>
            <br/>
            <Input allowClear placeholder={t('backup.newBackupName')} ref={inputRef}/>
        </Modal>
    )

    const DeletetModal = () => (
        <Modal title={t('backup.delete.title')}
               open={isDeleteModalOpen}
               confirmLoading={confirmLoading}
               getContainer={false}
               onOk={() => {
                   deletBackupItem(deleteBackup)
               }}
               onCancel={() => {
                   setIsDeleteModalOpen(false)
               }}>
            <p>{t('backup.cur.filename')}</p>
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
            <DeletetModal/>
            <Alert message={`Tips: ${t('backup.tips1')}`} type="info" showIcon/>
            <BackupStatistic size={backupData.length} data={backupDataSize}/>
            <HeaderTitle/>
            <Table
                ref={actionRef}
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
        </>
    )
};
export default Backup;