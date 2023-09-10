import {useEffect, useState} from 'react';
import _ from "lodash";
import {Row, Col, Card, Button, Space, Tooltip, message} from 'antd';
import {useParams} from "react-router-dom";

import { parse,format } from "lua-json";

import ModItem from './component/modItem';
import ModDetail from './component/modConfig';
import {getHomeConfigApi, saveHomeConfigApi} from '../../api/gameApi';
import {deleteStepupWorkshopApi} from '../../api/modApi';
import {beautifyLua, jsObjectToLuaTable} from "../../utils/dstUtils";

function containsChinese(str) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (charCode >= 0x4e00 && charCode <= 0x9fff) {
            return true;
        }
    }
    return false;
}

// eslint-disable-next-line react/prop-types
const ModList = ({modList, setModList, root, setRoot, defaultValuesMap, setDefaultValuesMap}) => {

    console.log("modList: ", modList)

    const [mod, setMod] = useState({})
    const changeMod = (mod) => {
        const _mod = _.cloneDeep(mod);
        setMod(_mod)
    }
    const {cluster} = useParams()

    const changeEnable = (modId) => {

        // eslint-disable-next-line no-restricted-syntax
        for (const mod of modList) {
            if (mod.modid === modId) {
                mod.enable = !mod.enable
            }
        }
        setModList([...modList])
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
            workshopIdKeys.forEach(workshopId=>{
                if (workshopObject[workshopId] === undefined) {
                    workshopObject[workshopId] = {}
                }
                const workshop = `workshop-${workshopId}`
                workShops[workshop] = {
                    configuration_options: workshopObject[workshopId],
                    enabled: true
                }
            })
            return format(workShops, {
                singleQuote: false
            })
        } catch (error) {
            console.log(error)
            return "return {}"
        }
    }

    function saveModConfig2() {
        getHomeConfigApi(cluster)
            .then(data => {
                const homeConfig = data.data
                homeConfig.modData = formatModOverride()
                console.log(homeConfig)
                saveHomeConfigApi(cluster, homeConfig).then(() => {
                    message.info("保存mod成功")
                }).catch(error => {
                    console.log(error);
                    message.error("保存mod失败")
                })

            })
    }

    function saveModConfig() {
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
            const object2 = _.merge({}, object, object1)

            const keys = Object.keys(object2)
            let config = "return {\n"
            keys.forEach(key => {
                if (object2[key] === undefined || object2[key] === null) {
                    const workshop = `["workshop-${key}"]={ configuration_options={},enabled=true }`
                    config += `  ${workshop},\n`
                } else {
                    const o = {}
                    Object.entries(object2[key])
                        // eslint-disable-next-line consistent-return
                        .forEach(([key, value])=>{
                            if (key !== '') {
                                let k = ""
                                if (key.includes(' ') || containsChinese(key)) {
                                    k = `["${key}"]`
                                } else {
                                    k = key
                                }
                                if (typeof value === "string") {
                                    const s= value.split("\n")
                                    if (s.length > 1) {
                                        o[k] = s
                                    } else {
                                        if(value === "") {
                                            value = {}
                                        }
                                        o[k] = value
                                    }
                                } else {
                                    if(value === "") {
                                        value = {}
                                    }
                                    o[k] = value
                                }
                            }
                        })
                    console.log("oo", o)
                    const luaTable = jsObjectToLuaTable(o)

                    const str = Object.entries(object2[key])
                        .filter(([key, value]) => key !== '' && !containsChinese(key))
                        .map(([key, value]) => {
                            if (typeof value === "string") {
                                return `["${key}"]="${value.toString()}",`
                            }
                            return `["${key}"]=${value},`
                        })
                        .join("\n");
                    // const workshop = `["workshop-${key}"]={ configuration_options={${str}},enabled=true }`
                    const workshop = `["workshop-${key}"]={ configuration_options=${luaTable},enabled=true }`
                    config += `  ${workshop},\n`
                }
            })
            config += "}"

            // console.log(config)
            config = beautifyLua(config)
            getHomeConfigApi(cluster)
                .then(data => {
                    const homeConfig = data.data
                    homeConfig.modData = config
                    console.log(homeConfig)
                    saveHomeConfigApi(cluster, homeConfig).then(() => {
                        message.info("保存mod成功")
                    }).catch(error => {
                        console.log(error);
                        message.error("保存mod失败")
                    })

                })
        } catch (error) {
            console.log(error)
            message.error("保存失败", error)
        }
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
        if(!mod || !_.find(modList, {modid: mod.modid})) {
            setMod(modList[0] || {})
        }
    }, [modList])

    return (
        <>
            <Space>
                <Button type="primary" onClick={() => saveModConfig2()}>保存配置</Button>
                <Tooltip title="点击会删除房间的mods, 重新启动会自动重新下载mod">
                    <   Button type="primary" onClick={() => deleteStepupWorkshop()}>更新模组</Button>
                </Tooltip>
            </Space>
            <br/><br/>

            <Card className='modlist'>
                <Row gutter={24}>
                    <Col span={10} xs={24} md={10} lg={10}>
                        <div style={{
                            height: '370px',
                            overflowY: 'auto',
                            overflowX: 'auto'
                        }}>
                            {modList.length > 0 && <div>
                                {modList.map(item => <ModItem
                                    key={item.modid}
                                    mod={item}
                                    changeMod={changeMod}
                                    changeEnable={changeEnable}
                                    removeMod={removeMod}
                                    modList={modList}
                                    setModList={setModList}
                                />)}
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
            </Card>
        </>)
}

export default ModList
