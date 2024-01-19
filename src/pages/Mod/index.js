import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import luaparse from 'luaparse';
import { parse } from "lua-json";

import {Skeleton, Tabs} from 'antd';
import ModList from "./ModList";
import ModSearch from "./ModSearch";

import {getMyModInfoList} from '../../api/modApi';
import Ugc from "./Ugc";


function unstring(str) {
    if (typeof str === 'string') {
        return str.replace(/^"(.*)"$/, '$1')
    }
    return str
}

function getWorkShopConfigMap2(modoverride) {
    try {
        const result = parse(modoverride);
        const keys = Object.keys(result)
        console.log("keys",keys.length)
        const workshopMap = new Map();
        keys.forEach(workshopId => {
            workshopMap.set(workshopId.replace('workshop-', '').replace('"', '').replace('"', ''), result[workshopId].configuration_options)
        })
        console.log("lua-json =-==-----", workshopMap)
        return workshopMap
    } catch (error) {
        return new Map()
    }

}

function getWorkShopConfigMap(modConfig) {

    if (modConfig === undefined || modConfig === null) {
        return new Map()
    }
    try {
        const ast = luaparse.parse(modConfig)
        const workshopListAst = ast.body[0].arguments[0].fields
        console.log("+++++++++", workshopListAst)
        const workshopMap = new Map();
        const workshopMap2 = {}
        // eslint-disable-next-line no-restricted-syntax
        for (const workshopAst of workshopListAst) {
            try {
                const {key} = workshopAst
                const {value} = workshopAst
                const workshopId = key.raw.replace("\n", "")
                const config = {}

                workshopMap.set(workshopId.replace('workshop-', '').replace('"', '').replace('"', ''), config)
                workshopMap2[`${workshopId.replace('workshop-', '').replace('"', '').replace('"', '')}`] = config
                // eslint-disable-next-line no-restricted-syntax
                for (const field of value.fields) {
                    if (field.key.name === 'configuration_options') {
                        // eslint-disable-next-line no-restricted-syntax
                        for (const configItem of field.value.fields) {
                            if (configItem.key !== undefined && configItem.key.raw === undefined) {
                                // 饥荒本地生成的配置
                                if(configItem.key.name !== undefined) {
                                    const name = unstring(configItem.key.name)
                                    if (configItem.value.value === undefined) {
                                        if (configItem.value.argument !== undefined && configItem.value.operator === "-") {
                                            config[name] = -(configItem.value.argument.value)
                                        } else {
                                            config[name] = configItem.value.value
                                        }
                                    } else if (configItem.value.value === null) {
                                        config[name] = unstring(configItem.value.raw)
                                    } else {
                                        config[name] = configItem.value.value
                                    }
                                }
                                // 判断是否是table
                                // eslint-disable-next-line no-lonely-if
                                if (configItem.type !== undefined && configItem.type === "TableKeyString") {
                                    if (configItem.value.type !== undefined &&
                                        configItem.value.type === "TableConstructorExpression") {
                                        const values = []
                                        // eslint-disable-next-line no-restricted-syntax
                                        for(const field of configItem.value.fields) {
                                            values.push(unstring(field.value.raw))
                                        }
                                        config[unstring(configItem.key.name)] = values
                                    }
                                }
                            } else {
                                const name = unstring(configItem.key.raw)
                                if (configItem.value.value === undefined) {
                                    if (configItem.value.argument !== undefined && configItem.value.operator === "-") {
                                        config[name] = -(configItem.value.argument.value)
                                    } else {
                                        config[name] = configItem.value.value
                                    }
                                } else if (configItem.value.value === null) {
                                    config[name] = unstring(configItem.value.raw)
                                } else {
                                    config[name] = configItem.value.value
                                }
                            }
                        }
                    }
                }
            } catch (error) {
                console.log('workshop error', error);
            }

        }
        console.log("workshopMap: ",workshopMap)
        return workshopMap
    } catch (error) {
        console.log('workshopMap error', error);
        return new Map()
    }
}


function initModList(subscribeModList, modoverrides, setDefaultValuesMap, setModList, setRoot) {
    const object = {}
    const workshopMap = getWorkShopConfigMap2(modoverrides)
    let subscribeModMap = new Map()
    if (subscribeModList === undefined || subscribeModList === null) {
        subscribeModList = []
    }
    subscribeModList.push({
        modid: "client_mods_disabled",
        installed: true,
        name: "client_mods_disabled",
        img: "https://steamuserimages-a.akamaihd.net/ugc/1829046490069435373/B2073D1E5B13DA00D29D316FC946C154C0854146/?imw=64&imh=64&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
        mod_config: {
            author: "kelei",
            description: "禁用本地所有模组，tips: 这个只是个虚拟的模组，只是兼容了下。如果不知道是干什么用的请不要开启！！！ 不支持自定禁用某些模组 \n\n 请勿乱点！！！"
        }
    })
    subscribeModList.forEach(mod => {
        const {modid} = mod
        const options = mod.mod_config.configuration_options
        if (options !== undefined && options !== null) {
            const temp = {}
            options.forEach(item => {
                if (item.default !== '' && item.name !== "null") {
                    temp[item.name] = item.default
                }
            })
            object[modid] = temp
        }
        if (workshopMap.has(modid)) {
            mod.enable = true
            mod.installed = true
        } else {
            mod.enable = false
            mod.installed = true
            workshopMap.set(modid, object[modid])
        }
    });

    subscribeModMap = subscribeModList.reduce((acc, item) => {
        acc.set(item.modid, item);
        return acc;
    }, new Map());

    // 如果没有订阅mod
    workshopMap.forEach((value, key) => {
        if (subscribeModMap.get(key) === undefined) {
            console.log("not subscribe mod: ", key)
            subscribeModList.push({
                modid: key,
                installed: false,
                enable: true,
            })
        }
    });

    setDefaultValuesMap(workshopMap)

    subscribeModList.sort((a, b) => {
        if (a.enable === b.enable) {
            return 0;
        }

        if (a.enable) {
            return -1; // a在前
        }
        return 1; // b在前
    });

    setModList(subscribeModList || [])
    console.log("======设置 root 默认值 ==============")
    console.log(object)
    setRoot(object)

}

const Mod = ({modoverrides}) => {

    const { t } = useTranslation()

    const [modList, setModList] = useState([])
    const [root, setRoot] = useState({})

    const [defaultValuesMap, setDefaultValuesMap] = useState(getWorkShopConfigMap2(modoverrides))
    const {cluster} = useParams()
    const [loading, setLoading] =useState(false)
    useEffect(() => {
        setLoading(true)
        getMyModInfoList(cluster)
            .then(resp => {
                initModList(resp.data, modoverrides, setDefaultValuesMap, setModList, setRoot)
            }).catch(error => console.log(error))
            .finally(()=>{
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        console.log('root', root);

    }, [root])

    const items = [
        {
            key: '1',
            label: t('Mod Setting'),
            children: <ModList
                modList={modList}
                setModList={setModList}
                root={root}
                setRoot={setRoot}
                defaultValuesMap={defaultValuesMap}
                setDefaultValuesMap={setDefaultValuesMap}
            />,
        },
        {
            key: '2',
            label: t('Mod Subscribe'),
            children: <ModSearch addModList={setModList}/>,
        },
        {
            key: '3',
            label: t('Ugc Mod'),
            children: <Ugc />,
        },
    ];


    return <Skeleton loading={loading} >
        <Tabs defaultActiveKey="1" items={items}/>
    </Skeleton>
}

export default Mod