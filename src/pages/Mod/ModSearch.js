/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Row, Col, Card, Input, Pagination, Button, message } from 'antd';
import {useParams} from "react-router-dom";
import { getModInfo, searchMod } from '../../api/modApi';

const { Search } = Input;

const ModCard = ({ modInfo, addModList, subscribe }) => {
    const [loading, setLoading] = useState(false)
    return <Card
        hoverable
        style={{
            width: 150,
            padding: '8px',
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
        <br />
        {/* <Meta title="防卡两招" description="www.instagram.com" /> */}
        <div>{modInfo.name}</div>
        {/* <span>作者：{modInfo.author}</span> */}
        <Button
            loading={loading}
            type="primary"
            onClick={() => subscribe(modInfo.id, modInfo.name, addModList, setLoading)}>订阅</Button>
    </Card>
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
                {modList.map(modinfo => (<Col key={modinfo.id} xs={12} sm={8} md={6} lg={5} xl={4}>
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
