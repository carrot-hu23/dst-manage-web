/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react';
import {Row, Col, Card, Input, Pagination, Button, message} from 'antd';
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {getModInfo, searchMod} from '../../../api/modApi';
import {timestampToString} from "../../../utils/dateUitls";
import {fShortenNumber} from "../../../utils/formatNumber";


const {Search} = Input;
const {Meta} = Card;

const ModCard2 = ({modinfo, addModList, subscribe}) => {

    const { t } = useTranslation()

    const [loading, setLoading] = useState(false)
    return (<>
        <Card
            key={modinfo.id}
            hoverable
            style={{
                width: 156,
            }}
            cover={<a
                target={'_blank'}
                href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${modinfo.id}`} rel="noreferrer">
                <img alt="example" style={{
                    height: 160
                }} src={modinfo.img}/>
            </a>}
        >
            <Meta title={modinfo.name}/>

            <div style={{
                fontSize: '12px',
                paddingTop: '2px',
                paddingBottom: '2px'
            }}>{timestampToString(modinfo.time * 1000)}</div>
            <div style={{
                fontSize: '12px',
                paddingBottom: '2px'
            }}>
                {t('mod.subscriptions')}:&nbsp;{fShortenNumber(modinfo.sub)}</div>
            <Button
                loading={loading}
                type="primary"
                size={'small'}
                onClick={() => subscribe(modinfo.id, modinfo.name, addModList, setLoading)}>{t('mod.subscribe')}</Button>
        </Card>
        <br/>
    </>)
}

export default ({addModList}) => {

    const { t } = useTranslation()
    const { i18n } = useTranslation();
    const lang = i18n.language;

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
            content: `${t('mod.subscribing')} ${modName}`,
            duration: 0,
        });
        setLoading(true)
        // message.info(`正在订阅 ${modName}`)
        getModInfo(lang, cluster, modId).then(data => {
            data.data.installed = true
            addModList(current => {
                const newData = []
                current.forEach(item=>{
                    if (item.modid !== data.data.modid) {
                        newData.push(item)
                    }
                })
                newData.push(data.data)
                return [... newData]
            })

            // Dismiss manually and asynchronously
            setTimeout(messageApi.destroy, 1);
            message.success(`${t('mod.subscribe.ok')} ${modName}`)
            setLoading(false)
        }).catch(error => {
            setTimeout(messageApi.destroy, 1);
            message.warning(`${t('mod.subscribe.error')} ${modName} 失败`)
            setLoading(false)
            console.log(error)
        })
    }

    const updateModList = (text, page, pageSize) => {
        message.info(t('mod.search'))
        searchMod(lang, cluster, text, page, pageSize).then(data => {
            setModList(data.data.data)
            setPage(data.data.page)
            setPageSize(data.data.size)
            setTotal(data.data.total)
        }).catch(error => {
            console.log(error)
        })
    }

    const onSearch = (text) => {
        setText(text)
        updateModList(text, 1, pageSize)
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
            <br/>
            <br/>
            <Row>
                {modList.map(modinfo => (
                    <Col key={modinfo.id} xs={12} sm={8} md={6} lg={4} xl={4}>
                        <ModCard2 modinfo={modinfo} addModList={addModList} subscribe={subscribe}/>
                    </Col>
                ))}
            </Row>
            <br/><br/>
            <Pagination
                onShowSizeChange={onShowSizeChange}
                current={page}
                pageSize={pageSize}
                onChange={(i) => onChange(i)}
                total={total}/>
        </>
    );
};
