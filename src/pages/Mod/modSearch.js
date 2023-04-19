import { useEffect, useState } from 'react';
import { Row, Col, Card, Input, Pagination, Button } from 'antd';
import { getModInfo, searchMod } from '../../api/modApi';

const { Search } = Input;

const subscribe = (modId, addModList) => {

    getModInfo(modId).then(data => {
        console.log(data);
        addModList(current => [...current, data.modInfo])
    }).catch(error => console.log(error))


}

const ModCard = ({ modInfo, addModList }) => (
    <Card
        hoverable
        style={{
            width: 150,
            padding: '8px',
        }}
        cover={
            <img
                alt="example"
                src={modInfo.img}
            />
        }
    >
        <br />
        {/* <Meta title="防卡两招" description="www.instagram.com" /> */}
        <div>{modInfo.name}</div>
        {/* <span>作者：{modInfo.author}</span> */}
        <Button type="primary" onClick={() => subscribe(modInfo.id, addModList)}>订阅</Button>
    </Card>
);

const ModSearch = ({ addModList }) => {

    const [modList, setModList] = useState([])

    const [pageSize, setPageSize] = useState(20)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [text, setText] = useState("")

    const onSearch = (text) => {
        setText(text)
        searchMod(text, page, pageSize).then(data => {
            console.log(data);
            setModList(data.data)
            setPage(data.page)
            setPageSize(data.size)
            setTotal(data.total)
        }).catch(error => { console.log(error); })
    }

    const onShowSizeChange = (current, pageSize) => {
        setPageSize(pageSize)
        searchMod(text, current, pageSize).then(data => {
            console.log(data);
            setModList(data.data)
            setPage(data.data)
            setPage(data.size)
            setTotal(data.total)
        }).catch(error => { console.log(error); })
    }

    const onChange = (page) => {
        searchMod(text, page, pageSize).then(data => {
            console.log(data);
            setModList(data.data)
            setPage(data.data)
            setPage(data.size)
            setTotal(data.total)
        }).catch(error => { console.log(error); })
    }

    return (
        <>
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
                    <ModCard modInfo={modinfo} addModList={addModList} />
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
