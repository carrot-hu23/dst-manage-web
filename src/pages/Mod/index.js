import { useEffect, useState } from 'react';
import _ from 'lodash'
import luaparse from 'luaparse';

import { Container, Box } from '@mui/material';
import { Tabs } from 'antd';
import ModSelect from './modSelect';
import ModSearch from './modSearch';
import { getMyModInfoList } from '../../api/modApi';

function getWorkShopConfigMap(modConfig) {

    if (modConfig === undefined || modConfig === null) {
        return new Map()
    }
    try {
        const ast = luaparse.parse(modConfig)
        const workshopListAst = ast.body[0].arguments[0].fields
        // const workshopMap = {}
        const workshopMap = new Map();
        // eslint-disable-next-line no-restricted-syntax
        for (const workshopAst of workshopListAst) {
            const { key } = workshopAst
            const { value } = workshopAst
            const workshopId = key.raw.replace("\n", "")
            const config = {}
            
            workshopMap.set(workshopId.replace('workshop-', '').replace('"','').replace('"',''), config)
            // eslint-disable-next-line no-restricted-syntax
            for (const field of value.fields) {
                if (field.key.name === 'configuration_options') {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const configItem of field.value.fields) {
                        config[configItem.key.name] = configItem.value.value
                    }
                }
            }
        }
        return workshopMap
    } catch (error) {
        console.log('workshopMap error',error);
        return new Map()
    }
}

const Mod = ({modoverrides}) => {

    const [modList, setModList] = useState([])
    const [root, setRoot] = useState({})

    useEffect(() => {
        getMyModInfoList()
            .then(data => {
                const object = {}
                const workshopMap = getWorkShopConfigMap(modoverrides)
                data.data.forEach(mod => {
                    const {modid} = mod
                    const options = mod.mod_config.configuration_options
                    if(options !== undefined && options !== null) {
                        options.forEach(item=>{
                            if(item.default !== '') {
                                _.set(object, `${modid}.${item.name}`, item.default)
                            }
                        })
                    }
                    if(workshopMap.has(modid)) {
                        mod.enable = true
                    } 
                });
                setModList(data.data || [])
                setRoot(object)
            }).catch(error => {
                console.log(error);
            })
    }, [])

    useEffect(()=>{
        console.log('root', root);
        
    },[root])

    const items = [
        {
            key: '1',
            label: `配置模组`,
            children: <ModSelect
                modList={modList}
                setModList={setModList}
                root={root}
                setRoot={setRoot}
                // chooseModList={chooseModList}
                // add={setChooseModList} 
                defaultValuesMap={getWorkShopConfigMap(modoverrides)}
                />,
        },
        {
            key: '2',
            label: `订阅模组`,
            children: <ModSearch addModList={setModList} />,
        },
    ];



    return (<Container maxWidth="xl">
        <Box sx={{ p: 0, pb: 1 }} dir="ltr">
            <Tabs defaultActiveKey="1" items={items} />
        </Box>
    </Container>)
}

export default Mod