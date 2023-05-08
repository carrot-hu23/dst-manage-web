import { useEffect, useState } from 'react';
import _ from "lodash";
import { Row, Col, Card, Button, Space, Divider, message } from 'antd';
import ModItem from './component/modItem';
import ModDetail from './component/modConfig';
import { getHomeConfigApi, saveHomeConfigApi } from '../../api/gameApi';

// eslint-disable-next-line react/prop-types
const ModSelect = ({ modList, setModList, root, setRoot }) => {

    const [mod, setMod] = useState({})
    const changeMod = (mod) => {
        const _mod = _.cloneDeep(mod);
        setMod(_mod)
    }

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
                .map(([key, value]) => `${key}=${value.toString()},`)
                .join("\n");
            // console.log('key:', key, 'value:', str)
            const workshop = `["workshop-${key}"]={ configuration_options={${str}},enabled=true }`
            // console.log(workshop)
            config += `  ${workshop},\n`
        })
        config += "}"
        console.log(config);

        getHomeConfigApi()
            .then(data => {
                const homeConfig = data.data
                homeConfig.modData = config
                console.log(homeConfig)
                saveHomeConfigApi(homeConfig).then(() => {
                    message.info("保存mod成功")
                }).catch(error => {
                    console.log(error);
                    message.error("保存mod失败")
                })

            })
    }

    useEffect(() => {
        setMod(modList[0] || {})
    }, [modList])

    return (
        <>
            <Space>
                <Button type="primary" onClick={() => saveModConfig()}  >保存配置</Button>
                <Button type="primary"  >更新配置</Button>
            </Space>
            <br /><br />
            {/* <Divider /> */}
            <Row gutter={24}>
                <Col span={10} xs={24} md={10} lg={10}>
                    <div style={{
                        height: '360px',
                        overflowY: 'auto',
                        overflowX: 'auto'
                    }}>
                        {modList.length > 0 && <Card className='modlist'>
                            {modList.map(item => <ModItem
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
                    />}
                </Col>

            </Row>
        </>)
}

export default ModSelect
