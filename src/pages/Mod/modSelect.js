import { useEffect, useState } from 'react';

import { Row, Col, Card,Button } from 'antd';
import ModItem from './modItem';
import ModDetail from './modConfig';

// eslint-disable-next-line react/prop-types
const ModSelect = ({modList,setModList, forms}) => {
    
    const [mod, setMod] = useState({})
    const changeMod = (mod) => {
        setMod(mod)
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

    useEffect(() => {
        setMod(modList[0]||{})
    }, [modList])

    return (<Row gutter={24}>
        <Col span={10} xs={24} md={10} lg={10}>
            <div style={{
                height: '400px',
                overflowY: 'auto',
                overflowX: 'auto'
            }}>
                <Card style={{ padding: '24px' }}>
                    {modList.map(item => <ModItem
                        key={item.modid}
                        mod={item}
                        changeMod={changeMod}
                        changeEnable={changeEnable}
                    />)}
                </Card>
            </div>
            <br />
            {/* <Button type="primary"  >保存配置</Button> */}
        </Col>
        <Col span={14} xs={24} md={14} lg={14}>
            {mod.modid !== undefined && <ModDetail mod={mod} form={forms[mod.modid]}/>}
        </Col>
    </Row>)
}

export default ModSelect
