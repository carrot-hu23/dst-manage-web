import {useEffect, useState} from 'react';
import _ from "lodash";
import {Row, Col, Button, Space, Tooltip, message, Alert, Popconfirm, Spin} from 'antd';
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {format} from "lua-json";

import {getHomeConfigApi, saveHomeConfigApi} from '../../../api/gameApi';
import {updateModinfosApi} from '../../../api/modApi';
import ModItem from "./ModItem";
import ModConfigOptions from "../ModConfigOptions";

// eslint-disable-next-line react/prop-types
export default ({modList, setModList,defaultConfigOptionsRef, modConfigOptionsRef}) => {

    const { t } = useTranslation()
    const navigate = useNavigate();
    const {cluster} = useParams()

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [mod, setMod] = useState({})

    const changeMod = (mod) => {
        const _mod = _.cloneDeep(mod);
        setMod(_mod)
    }

    const changeEnable = (modId) => {
        modList.forEach(mod=>{
            if (mod.modid === modId) {
                mod.enable = !mod.enable
            }
        })
        setModList([...modList])
    }

    function isWorkshopId(str) {
        return /^[0-9]+$/.test(str);
    }

    function formatModOverride() {
        try {
            const chooses = modList.filter(mod => mod.enable)
            const modids = chooses.map(mod => mod.modid)
            const object = _.pick(modConfigOptionsRef.current, modids)
            const object1 = {}
            // eslint-disable-next-line no-restricted-syntax
            for (const id of modids) {
                defaultConfigOptionsRef.current.get(id)
                object1[id] = defaultConfigOptionsRef.current.get(id)
            }
            const workshopObject = _.merge({}, object, object1)
            const workshopIdKeys = Object.keys(workshopObject)
            const workShops = {}
            workshopIdKeys.forEach(workshopId => {
                if (workshopObject[workshopId] === undefined) {
                    workshopObject[workshopId] = {}
                }
                let workshop
                if (isWorkshopId(workshopId)) {
                    workshop = `workshop-${workshopId}`
                } else {
                    workshop = workshopId
                }
                const options = workshopObject[workshopId]
                delete options.null
                workShops[workshop] = {
                    configuration_options: options,
                    enabled: true
                }
            })
            console.log("结果",workShops)
            return format(workShops, {
                singleQuote: false
            })
        } catch (error) {
            console.log(error)
            message.warning("mod配置解析错误", error.message)
            return "return { error }"
        }
    }

    function saveModConfig() {
        getHomeConfigApi(cluster)
            .then(data => {
                const homeConfig = data.data
                homeConfig.modData = formatModOverride()
                if (homeConfig.modData !== "return { error }") {
                    console.log(homeConfig)
                    saveHomeConfigApi(cluster, homeConfig).then(() => {
                        message.info(t('mod.save.ok'))
                    }).catch(error => {
                        console.log(error);
                        message.error(t('mod.save.error'))
                    })
                } else {
                    message.warning(t('mod.parse.error'))
                }
            })
    }

    function updateModConfigOptions() {
        setConfirmLoading(true)
        updateModinfosApi()
            .then(data => {
                if (data.code === 200) {
                    message.success(t('mod.update.ok'))
                } else {
                    message.warning(t('mod.update.error'))
                }
                setConfirmLoading(false)
            })
    }

    const removeMod = (modId) => {
        const newModList = []
        // eslint-disable-next-line no-restricted-syntax
        for (const mod of modList) {
            if (mod.modid !== modId) {
                newModList.push(mod)
            }
        }
        setModList([...newModList])
    }

    useEffect(() => {
        setMod(modList[0] || {})
    }, [modList])

    const updateModSize = modList.filter(mod=>mod.update)

    return (
        <>
            <Spin spinning={confirmLoading} >
                <Alert message={t('mod.tips1')} type="warning" showIcon closable />
                <br/>

                {updateModSize.length > 0 && <>
                    <Alert message={`你有 ${updateModSize.length} 个模组配置有更新`} type="warning" showIcon closable />
                    <br/>
                </>}
                <Space size={16} wrap>

                    <Button type="primary" onClick={() => saveModConfig()}>{t('mod.save')}</Button>
                    <Popconfirm
                        title={t('mod.tips2')}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={()=>updateModConfigOptions()}
                    >
                        <Button type="primary" >{t('mod.update.all')}</Button>
                    </Popconfirm>

                    <Tooltip
                        title={t('mod.tips3')}>
                        <Button type="primary" onClick={() => navigate(`/dashboard/mod/add/0`)}>{t('mod.upload.modinfo')}</Button>
                    </Tooltip>
                </Space>
                <br/><br/>
                <Row gutter={24}>
                    <Col span={10} xs={24} md={10} lg={10}>
                        <div className={'scrollbar'} style={{
                            height: '52vh',
                            overflowY: 'auto',
                            overflowX: 'auto'
                        }}>
                            {modList.length > 0 && <div>
                                {modList.map(item => <>
                                    <ModItem
                                        key={item?.modid}
                                        mod={item}
                                        changeMod={changeMod}
                                        changeEnable={changeEnable}
                                        removeMod={removeMod}
                                        modList={modList}
                                        setModList={setModList}
                                    />
                                </>)}
                            </div>}
                        </div>
                        <br/>
                    </Col>
                    <Col span={14} xs={24} md={14} lg={14}>
                        {mod.modid !== undefined && <ModConfigOptions
                            mod={mod}
                            setMod={setMod}
                            setModList={setModList}
                            defaultConfigOptionsRef={defaultConfigOptionsRef}
                            modConfigOptionsRef={modConfigOptionsRef}
                        />}
                    </Col>
                </Row>
            </Spin>
        </>)
}
