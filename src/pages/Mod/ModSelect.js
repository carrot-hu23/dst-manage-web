import {useEffect, useState} from 'react';
import _ from "lodash";
import {Row, Col, Card, Button, Space, Tooltip, message} from 'antd';
import {useParams} from "react-router-dom";
import ModInfo from './component/ModInfo';
import ModDetail from './component/ModConfig';
import {getHomeConfigApi, saveHomeConfigApi} from '../../api/gameApi';
import {deleteStepupWorkshopApi} from '../../api/modApi';

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
const ModSelect = ({modList, setModList, root, setRoot, defaultValuesMap}) => {

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

    function saveModConfig() {
        const chooses = modList.filter(mod => !mod.enable)
        const modids = chooses.map(mod => mod.modid)
        const object = _.omit(root, modids)

        const keys = Object.keys(object)
        let config = "return {\n"
        keys.forEach(key => {
            const str = Object.entries(object[key])
                .filter(([key, value]) => key !== '' && !containsChinese(key))
                .map(([key, value]) => `${key}=${value.toString()},`)
                .join("\n");
            const workshop = `["workshop-${key}"]={ configuration_options={${str}},enabled=true }`
            config += `  ${workshop},\n`
        })
        config += "}"

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

    useEffect(() => {
        setMod(modList[0] || {})
    }, [modList])

    return (
        <>
            <Space>
                <Button type="primary" onClick={() => saveModConfig()}>保存配置</Button>
                <Tooltip title="点击会删除房间的mods, 重新启动会自动重新下载mod">
                    <Button type="primary" onClick={() => deleteStepupWorkshop()}>更新配置</Button>
                </Tooltip>
            </Space>
            <br/><br/>
            {/* <Divider /> */}
            <Row gutter={24}>
                <Col span={10} xs={24} md={10} lg={10}>
                    <div style={{
                        height: '360px',
                        overflowY: 'auto',
                        overflowX: 'auto'
                    }}>
                        {modList.length > 0 && <Card className='modlist'>
                            {modList.map(item => <ModInfo
                                key={item.modid}
                                mod={item}
                                changeMod={changeMod}
                                changeEnable={changeEnable}
                            />)}
                        </Card>}
                    </div>
                    <br />
                </Col>
                <Col span={14} xs={24} md={14} lg={14}>
                    {mod.modid !== undefined && <ModDetail
                        mod={mod}
                        root={root}
                        setRoot={setRoot}
                        defaultValues={defaultValuesMap.get(`${mod.modid}`)}
                    />}
                </Col>

            </Row>
        </>)
}

export default ModSelect
