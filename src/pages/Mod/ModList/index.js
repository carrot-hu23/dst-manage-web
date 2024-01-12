import React, {useEffect, useState} from 'react';
import _ from "lodash";
import {Row, Col, Button, Space, Tooltip, message, Popconfirm, Spin, Alert} from 'antd';
import {useNavigate, useParams} from "react-router-dom";

import {format} from "lua-json";

import ModItem from '../component/modItem';
import ModDetail from '../component/modConfig';
import {getHomeConfigApi, saveHomeConfigApi} from '../../../api/gameApi';
import {deleteStepupWorkshopApi, updateModinfosApi} from '../../../api/modApi';

// eslint-disable-next-line react/prop-types
export default ({modList, setModList, root, setRoot, defaultValuesMap, setDefaultValuesMap}) => {

    const navigate = useNavigate();

    const [mod, setMod] = useState({})
    const changeMod = (mod) => {
        const _mod = _.cloneDeep(mod);
        setMod(_mod)
    }
    const {cluster,name} = useParams()

    const changeEnable = (modId) => {

        // eslint-disable-next-line no-restricted-syntax
        for (const mod of modList) {
            if (mod.modid === modId) {
                mod.enable = !mod.enable
            }
        }
        setModList([...modList])
    }

    function isWorkshopId(str) {
        return /^[0-9]+$/.test(str);
    }

    function formatModOverride() {
        try {
            const chooses = modList.filter(mod => mod.enable)
            const modids = chooses.map(mod => mod.modid)
            const object = _.pick(root, modids)
            const object1 = {}
            // eslint-disable-next-line no-restricted-syntax
            for (const id of modids) {
                defaultValuesMap.get(id)
                object1[id] = defaultValuesMap.get(id)
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
                // removeNullProperties(options)
                delete options.null
                workShops[workshop] = {
                    configuration_options: options,
                    enabled: true
                }
            })
            console.log(workShops)
            return format(workShops, {
                singleQuote: false
            })
        } catch (error) {
            console.log(error)
            message.error("mod配置解析错误", error.message)
            return "return {}"
        }
    }

    function saveModConfig2() {
        getHomeConfigApi(cluster)
            .then(data => {
                const homeConfig = data.data
                homeConfig.modData = formatModOverride()
                if (homeConfig.modData !== "return {}") {
                    console.log(homeConfig)
                    saveHomeConfigApi(cluster, homeConfig).then(() => {
                        message.info("保存mod成功")
                    }).catch(error => {
                        console.log(error);
                        message.error("保存mod失败")
                    })
                }
            })
    }

    function deleteStepupWorkshop() {
        deleteStepupWorkshopApi()
            .then(data => {
                if (data.code === 200) {
                    message.success("更新模组成功，请重启房间")
                } else {
                    message.warning("更新模组失败")
                }
            })
    }

    const removeMod = (modId, ID) => {
        const newModList = []
        // eslint-disable-next-line no-restricted-syntax
        for (const mod of modList) {
            if (mod.modid !== modId) {
                newModList.push(mod)
            }
        }
        setModList([...newModList])
    }
    const [confirmLoading, setConfirmLoading] = useState(false);
    function updateModinfos() {
        setConfirmLoading(true)
        updateModinfosApi(cluster)
            .then(data => {
                if (data.code === 200) {
                    message.success("更新模组配置成功，请刷新页面")
                } else {
                    message.warning("更新模组配置失败")
                }
                setConfirmLoading(false)
            })
    }

    useEffect(() => {
        setMod(modList[0] || {})
    }, [modList])

    return (
        <>
            <Spin spinning={confirmLoading} >
                <Alert message="请先启动世界，再点击订阅，默认优先读取ugc模组配置。此界面只是模组配置，和游戏模组没有任何关系，只是读取配置"
                       type="info"
                       showIcon
                       closable
                />
                <br/>
            <Space size={16} wrap>
                <Button type="primary" onClick={() => saveModConfig2()}>保存配置</Button>
                <Popconfirm
                    title="是否更新所有模组配置"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={()=>updateModinfos()}
                >
                    <Button type="primary" >更新所有模组配置</Button>
                </Popconfirm>
                <Tooltip
                    title="手动上传modifo.lua文件。由于服务器网络问题，mod会经常下载失败，此时你可以把本地的模组modinfo上传到服务器">
                    <Button type="primary" onClick={() => navigate(`/${cluster}/${name}/dashboard/mod/add/0`)}>上传模组</Button>
                </Tooltip>
            </Space>
            <br/><br/>
            <Row gutter={24}>
                <Col span={10} xs={24} md={10} lg={10}>
                    <div className="scrollbar" style={{
                        height: '52vh',
                        overflowY: 'auto',
                        overflowX: 'auto'
                    }}>
                        {modList.length > 0 && <div>
                            {modList.map(item => <>
                                <ModItem
                                    key={item.modid}
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
                    {mod.modid !== undefined && <ModDetail
                        mod={mod}
                        setMod={setMod}
                        setModList={setModList}
                        root={root}
                        setRoot={setRoot}
                        defaultValues={defaultValuesMap[`${mod.modid}`]}
                        defaultValuesMap={defaultValuesMap}
                        setDefaultValuesMap={setDefaultValuesMap}
                    />}
                </Col>
            </Row>
            </Spin>
        </>)
}
