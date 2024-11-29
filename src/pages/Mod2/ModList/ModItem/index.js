/* eslint-disable react/prop-types */
import {useState} from 'react';
import {Card, Switch, Popconfirm, Row, Col, Button, message, Spin, Badge} from 'antd';

import './mod.css';
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {deleteModInfo, getModInfo} from "../../../../api/modApi";

function subscribeMod(lang, t, modid, modList, setModList, setStartLoading) {
    setStartLoading(true)
    getModInfo(lang, "", modid).then(data => {
        console.log(data.data);
        if (data.code !== 200) {
            message.warning(t('mod.subscribe.error'))
        } else {
            setStartLoading(false)
            setModList(current => {
                // return [...current, data.data]
                const newModList = []
                // eslint-disable-next-line no-restricted-syntax
                for (const mod of current) {
                    if (mod.modid !== modid) {
                        newModList.push(mod)
                    }
                }
                data.data.installed = true
                data.data.enable = true
                newModList.push(data.data)
                console.log("newModList: ", newModList)
                return newModList
            })
            message.success(`${t('mod.subscribe.ok')} ${modid}`)
        }
    }).catch(error => {
        console.log(error)
    })

}

const ModItem = (props) => {

    const {t} = useTranslation()
    const {i18n} = useTranslation();
    const lang = i18n.language;

    const {removeMod, modList, setModList} = props
    const [mod, setMod] = useState({})
    const {cluster} = useParams()
    const [startLoading, setStartLoading] = useState(false)

    return <Spin spinning={startLoading} tip={t('mod.subscribing')}>
        <Card className='mod' style={{margin: ' 0 0 16px', backgroundColor: props?.mod?.update ? "#583D23" : ""}}>
            <Row onClick={() => {
                props.changeMod(props?.mod)
            }}>
                {props?.mod?.installed && <>
                    <div style={{display: "flex", justifyContent: "stretch", flex: "1", overflow: "hidden"}}>
                        <div style={{flexBasis: "20%", marginRight: "20px"}}>
                            <img
                                style={{display: "inline-block", maxWidth: "auto"}}
                                alt="example"
                                src={props.mod.img}
                            />
                        </div>

                        <div style={{flexBasis: "80%", overflow: "hidden"}}>

                            <div style={{
                                fontSize: '16px',
                                paddingBottom: '8px',
                                maxWidth: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                            >

                                <span style={{}}>{props?.mod?.name}</span>
                            </div>
                            <div>
                                {props?.mod?.update && <Badge count={1}>
                                    <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}
                                            defaultChecked={props?.mod?.enable}
                                            onChange={() => {
                                                props.changeEnable(props?.mod?.modid)
                                            }}
                                    />
                                </Badge>}
                                {!props?.mod?.update &&
                                    <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}
                                            defaultChecked={props?.mod?.enable}
                                            onChange={() => {
                                                props.changeEnable(props?.mod?.modid)
                                            }}
                                    />}
                                {props?.mod?.modid !== "client_mods_disabled" && <>
                                    <Popconfirm
                                        title={t('mod.delete.title')}
                                        okText="Yes"
                                        cancelText="No"
                                        onConfirm={() => {
                                            deleteModInfo(cluster, mod.modid)
                                                .then(resp => {
                                                    if (resp.code === 200) {
                                                        message.success(t('mod.delete.ok'))
                                                        removeMod(mod.modid)
                                                    }
                                                })
                                        }}
                                    >
                                        <Button type="text" danger onClick={() => {
                                            setMod(props.mod)
                                        }}>
                                            {t('mod.delete')}
                                        </Button>
                                    </Popconfirm>
                                </>}
                                {props?.mod?.update && <span>{t('mod.update')}</span>}
                            </div>
                        </div>
                    </div>
                </>}
            </Row>
            <Row>
                {props?.mod?.installed === false && <>
                    <Col flex="64px">
                        <img
                            alt="example"
                            src={props?.mod?.img}
                        />
                    </Col>
                    <Col flex="auto" style={{paddingLeft: '16px'}}>
                        <Row>
                            <Col span={24}><span style={{
                                fontSize: '16px'
                            }}>{props?.mod?.modid}</span></Col>
                        </Row>
                        <Row style={{
                            marginTop: '12px'
                        }}>
                            <Col span={12}/>
                            <Col span={24}>

                                <Popconfirm
                                    title={t('mod.install')}
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => {
                                        subscribeMod(lang, t, props?.mod?.modid, modList, setModList, setStartLoading)
                                    }}
                                >
                                    <Button type="primary" onClick={() => {
                                        setMod(props.mod)
                                    }}>
                                        {t('mod.install')}
                                    </Button>
                                </Popconfirm>
                            </Col>
                        </Row>
                    </Col>
                </>}
            </Row>
        </Card>
    </Spin>
}

export default ModItem