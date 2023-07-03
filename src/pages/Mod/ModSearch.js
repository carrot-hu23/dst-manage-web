/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {Row, Col, Card, Input, Pagination, Button, message, Space, Image} from 'antd';
import {useParams} from "react-router-dom";
import { getModInfo, searchMod } from '../../api/modApi';
import {timestampToString} from "../../utils/dateUitls";

const { Search } = Input;

const ModCard = ({ modInfo, addModList, subscribe }) => {
    const [loading, setLoading] = useState(false)
    return (<>
        {/*
        <Card
            hoverable
            style={{
                width: 150,
                padding: '4px',
            }}
            cover={
                <a
                    target={'_blank'}
                    href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${modInfo.id}`} rel="noreferrer" >
                    <img
                        alt="example"
                        src={modInfo.img}
                    />
                </a>
            }
        >
            <div>
                <div>{modInfo.name}</div>
                <div>时间:{timestampToString(modInfo.time*1000)}</div>
                <div>订阅数: {modInfo.sub}</div>
            </div>
            <Button
                loading={loading}
                type="primary"
                onClick={() => subscribe(modInfo.id, modInfo.name, addModList, setLoading)}>订阅</Button>
        </Card>
        */}

        <Card style={{margin: '16px'}}>
            <Space size={16}>
                <div>
                    <a
                        target={'_blank'}
                        href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${modInfo.id}`} rel="noreferrer" >
                        <Image preview={false} width={100} src={modInfo.img} />
                    </a>
                </div>
                <div>
                    <div>
                        <div>{modInfo.name}</div>
                        <div>时间:{timestampToString(modInfo.time*1000)}</div>
                        <div>订阅数: {modInfo.sub}</div>
                    </div>
                    <Button
                        loading={loading}
                        type="primary"
                        size={'small'}
                        onClick={() => subscribe(modInfo.id, modInfo.name, addModList, setLoading)}>订阅</Button>
                </div>
            </Space>

        </Card>
    </>)
}

const ModSearch = ({ addModList }) => {

    const [modList, setModList] = useState([])

    const [pageSize, setPageSize] = useState(20)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [text, setText] = useState("")

    const [messageApi, contextHolder] = message.useMessage();
    const {cluster} = useParams()
    
    useEffect(() => {
        updateModList("", page, pageSize)
    }, [])

    const subscribe = (modId, modName, addModList, setLoading) => {
        messageApi.open({
            type: 'loading',
            content: `正在订阅 ${modName}`,
            duration: 0,
        });
        setLoading(true)
        // message.info(`正在订阅 ${modName}`)
        getModInfo(cluster,modId).then(data => {
            console.log(data.data);
            data.data.installed = true
            addModList(current => [...current, data.data])

            // Dismiss manually and asynchronously
            setTimeout(messageApi.destroy, 1);
            message.success(`订阅 ${modName} 成功`)
            setLoading(false)
        }).catch(error => {
            setTimeout(messageApi.destroy, 1);
            message.success(`获取 ${modName} 失败`)
            setLoading(false)
            console.log(error)
        })
    }

    const updateModList = (text, page, pageSize) => {
        message.info(`正在搜索`)
        searchMod(cluster, text, page, pageSize).then(data => {
            setModList(data.data.data)
            setPage(data.data.page)
            setPageSize(data.data.size)
            setTotal(data.data.total)
            message.success(`搜索成功`)
        }).catch(error => {
            message.error(`搜索失败`)
            console.log(error)
        })
    }

    const onSearch = (text) => {
        setText(text)
        updateModList(text, page, pageSize)
    }

    const onShowSizeChange = (current, pageSize) => {
        setPageSize(pageSize)
        updateModList(text, current, pageSize)
    }

    const onChange = (page) => {
        updateModList(text, page, pageSize)
    }

    return (
        <>
            {contextHolder}
            <Search
                placeholder="input search text"
                onSearch={onSearch}
                style={{
                    width: 200,
                }}
            />
            <br />
            <br />
            <Row>
                {modList.map(modinfo => (<Col key={modinfo.id} xs={24} sm={8} md={8} lg={8} xl={8}>
                    <ModCard modInfo={modinfo} addModList={addModList} subscribe={subscribe} />
                    <br />
                </Col>))}
            </Row>
            <br /><br />
            <Pagination
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={page}
                pageSize={pageSize}
                onChange={(i) => onChange(i)}
                total={total} />
        </>
    );
};

export default ModSearch;
