import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {message, Skeleton, Tabs} from "antd";
import {Container, Card, Box} from '@mui/material';
import {parse} from "lua-json";

import {getHomeConfigApi} from "../../api/gameApi";
import {getMyModInfoList} from "../../api/modApi";
import ModList from "./ModList";


import Workshop from "./Workshop";
import UgcAcf from "./UgcAcf";
import UploadModFiles from "./UploadModFiles";


export default () => {

    const {cluster} = useParams()
    const { t } = useTranslation()

    const [modoverrides, setmodoverrides] = useState("")
    const [loading, setLoading] = useState(true);

    // 模组列表展示数据
    const [modList, setmodList] = useState([])
    // 模组默认的配置项 Module default configuration items
    const defaultConfigOptionsRef = useRef(new Map())
    // 模组配置项
    const modConfigOptionsRef = useRef({})

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const modoverridesResp = await getHomeConfigApi(cluster)
            if (modoverridesResp.code !== 200) {
                message.warning("获取模组配置失败")
                return
            }
            const modoverrides = modoverridesResp.data.modData
            setmodoverrides(modoverrides)

            const modInfoListResp = await getMyModInfoList(cluster)
            if (modInfoListResp.code !== 200) {
                message.warning("获取模组配置失败")
                return
            }
            let modList = modInfoListResp.data
            if (modList === null) {
                modList = []
            }
            setmodList(modList)
            // modInfoListResp.data
            initModConfigList(modoverrides, modList, setmodList, defaultConfigOptionsRef, modConfigOptionsRef)
            setLoading(false)
        }
        fetchData()

    }, [])

    function initModConfigList(modoverrides, subscribeModList, setModList, defaultConfigOptionsRef, modConfigOptionsRef) {
        const workshopMap = parseModoverrides(modoverrides);
        console.log("workshopMap", workshopMap)
        subscribeModList.push({
            mod_config: {
                author: "kelei",
                description: "禁用本地所有模组，tips: 这个只是个虚拟的模组，只是兼容了下。如果不知道是干什么用的请不要开启！！！ 不支持自定禁用某些模组 \n\n 请勿乱点！！！\n\n 如果要删除，对应模组配置里面的 client_mods_disabled = {\n" +
                    "    configuration_options = {},\n" +
                    "    enabled = true,\n" +
                    "  },",
                name: "client_mods_disabled",
                configuration_options: []
            },
            enable: false,
            update: false,
            modid: "client_mods_disabled",
            installed: true,
            name: "client_mods_disabled",
            img: "https://steamuserimages-a.akamaihd.net/ugc/1829046490069435373/B2073D1E5B13DA00D29D316FC946C154C0854146/?imw=64&imh=64&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"

        })
        const modOptions = {}
        subscribeModList.forEach(mod => {
            const {modid} = mod
            const options = mod.mod_config.configuration_options
            if (options !== undefined && options !== null) {
                const defaultOptions = {}
                options.forEach((item) => {
                    if (item.default !== '' && item.name !== "null" && item.name !== undefined) {
                        defaultOptions[item.name] = item.default
                    }
                })
                modOptions[modid] = defaultOptions
            }
            if (workshopMap.has(modid)) {
                mod.enable = true
                mod.installed = true
            } else {
                mod.enable = false
                mod.installed = true
                workshopMap.set(modid, modOptions[modid])
            }
        });

        const subscribeModMap = subscribeModList.reduce((acc, item) => {
            acc.set(item.modid, item);
            return acc;
        }, new Map());

        // 如果没有订阅mod
        workshopMap.forEach((value, key) => {
            if (subscribeModMap.get(key) === undefined) {
                console.log("not subscribe mod: ", key)
                subscribeModList.push({
                    mod_config: {
                        author: "unknown",
                        name: "unknown"
                    },
                    name: "",
                    update: false,
                    modid: key,
                    installed: false,
                    enable: true
                })
            }
        });

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
        defaultConfigOptionsRef.current = workshopMap
        modConfigOptionsRef.current = modOptions
    }

    function parseModoverrides(modoverrides) {
        console.log(modoverrides)
        try {
            const result = parse(modoverrides);
            const keys = Object.keys(result)
            const workshopMap = new Map();
            keys.forEach(workshopId => {
                workshopMap.set(workshopId.replace('workshop-', '').replace('"', '').replace('"', ''), {...result[workshopId].configuration_options})
            })
            console.log("modoverrides 解析对象", workshopMap)
            return workshopMap
        } catch (error) {
            return new Map()
        }
    }


    const items = [
        {
            key: '1',
            label: t('Mod Setting'),
            children: <ModList modList={modList} setModList={setmodList}
                               defaultConfigOptionsRef={defaultConfigOptionsRef}
                               modConfigOptionsRef={modConfigOptionsRef}
            />,
        },
        {
            key: '2',
            label: t('Mod Subscribe'),
            children: <Workshop addModList={setmodList}/>,
        },
        {
            key: '3',
            label: t('Ugc Mod'),
            children: <UgcAcf />,
        },
    ];

    return (
        <>
            <Container maxWidth="xxl">
                <Card>
                    <Box sx={{p: 3}} dir="ltr">
                        <Skeleton loading={loading}>
                            <Tabs defaultActiveKey="1" items={items}/>
                        </Skeleton>
                    </Box>
                </Card>
            </Container>
        </>
    )
}