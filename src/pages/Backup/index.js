/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Space, Upload, message, Button, Modal, Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';

import { Card, Container, Box } from '@mui/material';

// import Highlighter from 'react-highlight-words';
import BackupStatistic from './Statistic';

import { getBackupApi, deleteBackupApi, renameBackupApi } from '../../api/backupApi';


const props = {
  name: 'file',
  action: 'http://localhost:8888/api/game/backup/upload',
  // showUploadList: false,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  customRequest(info) {
    console.log(info.file, info.fileList);
  }
};





const Backup = () => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}

            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    // filterIcon: (filtered) => (
    // ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      // searchedColumn === dataIndex ? (
      //   <Highlighter
      //     highlightStyle={{
      //       backgroundColor: '#ffc069',
      //       padding: 0,
      //     }}
      //     searchWords={[searchText]}
      //     autoEscape
      //     textToHighlight={text ? text.toString() : ''}
      //   />
      // ) : (
      //   text
      // ),
      text
  });



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
  const [newBackupName, setNewBackupName] = useState("");

  const inputRef = useRef("");

  const updateBackupData = () => {
    getBackupApi()
      .then(data => {
        const backupList = data.data || []
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < backupList.length; i++) {
          backupList[i].key = i
        }
        setBackupData(backupList)
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
    const { length } = selectBackup
    if (length < 1) {
      message.warning("请选择存档")
      return
    }
    const fileNames = selectBackup.map(item => item.fileName)
    deleteBackupApi(fileNames)
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

    deleteBackupApi([value.fileName])
      .then(data => {
        if (data.code === 200) {
          setTimeout(() => {
            message.success("删除成功")
            setConfirmLoading(false);
            setIsDeleteModalOpen(false)

            setBackupData(newBackupData)

          }, 1000);

        }
      })
  }

  const renameBackupItem = (value) => {
    setConfirmLoading(true);
    const data = {
      fileName: value.fileName,
      newName: `${inputRef.current.input.value}.zip`
    }
    renameBackupApi(data)
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


  const columns = [
    {
      title: '存档名称',
      dataIndex: 'fileName',
      key: 'fileName',
      render: (text) => <Button type="link" >{text}</Button>,
      editable: true,
      ...getColumnSearchProps('fileName'),
    },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
      key: 'fileSize',
      render: (fileSize) => <span>{`${(fileSize / 1024 / 1024).toFixed(2)} MB`}</span>,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => { setIsEditModalOpen(true); setDeleteBackup(record) }}>修改</Button>
          <Button type="link" onClick={() => { window.location.href = `/api/game/backup/download?fileName=${record.fileName}`; }} >下载</Button>
          <Button type="text" danger onClick={() => { setIsDeleteModalOpen(true); setDeleteBackup(record) }}>删除</Button>
        </Space>
      ),
    },
  ]

  const HeaderTitle = () => (
    <Space >
      <Upload {...props}>
        <Button type="primary">上传</Button>
      </Upload>
      <Button type="primary" danger onClick={deleteSelectBackup} >
        删除
      </Button>
      <Button onClick={updateBackupData} >
        刷新
      </Button>
    </Space>

  )

  const EditModal = () => (
    <Modal title="修改文件名"
      open={isEditModalOpen}
      confirmLoading={confirmLoading}
      getContainer={false}
      onOk={() => { renameBackupItem(deleteBackup) }}
      onCancel={() => { setIsEditModalOpen(false) }}>
      <br />
      <span>当前文件名：{deleteBackup.fileName}</span>
      <br /><br />
      <Input allowClear placeholder="新的文件名" ref={inputRef} />
    </Modal>
  )

  const DeletetModal = () => (
    <Modal title="提示"
      open={isDeleteModalOpen}
      confirmLoading={confirmLoading}
      getContainer={false}
      onOk={() => { deletBackupItem(deleteBackup) }}
      onCancel={() => { setIsDeleteModalOpen(false) }}>
      <p>确认删除：</p>
      <p>{deleteBackup.fileName || ""}</p>
    </Modal>
  )

  const backupDataSize = (backupData
    .map(backup => backup.fileSize)
    // eslint-disable-next-line no-restricted-globals
    .reduce((prev, curr) => !isNaN(Number(curr)) ? prev + curr : prev, 0) / 1024 / 1024 / 1024).toFixed(4)

  return (
    <>
      <Container maxWidth="xl">
        <Card>
          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <BackupStatistic size={backupData.length} data={backupDataSize} />
            <br />
            <ProTable
              scroll={{
                x: 600,
              }}
              headerTitle={
                <HeaderTitle />
              }
              columns={columns}
              dataSource={backupData}
              rowSelection={rowSelection}
              pagination={{
                position: ['none'],
                pageSize: 99999
              }}
              // bordered
              search={false}
              cardBordered
              actionRef={actionRef}
              loading = {loading}
            />

            <EditModal />
            <DeletetModal />
          </Box>
        </Card>
      </Container>
    </>
  )
};
export default Backup;