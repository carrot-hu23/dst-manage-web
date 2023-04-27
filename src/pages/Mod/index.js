import { useEffect, useState } from 'react';
import _ from 'lodash'

import { Container, Box } from '@mui/material';
import { Tabs } from 'antd';
import ModSelect from './modSelect';
import ModSearch from './modSearch';
import { getMyModInfoList } from '../../api/modApi';


const Mod = () => {

    const [modList, setModList] = useState([])
    const [chooseModList, setChooseModList] = useState([])
    const [root, setRoot] = useState({})

    useEffect(() => {
        getMyModInfoList()
            .then(data => {
                setModList(data.data)
                const object = {}
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
                });
                setRoot(object)
                console.log('root', object);
                
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
                />,
        },
        {
            key: '2',
            label: `订阅模组`,
            children: <ModSearch addModList={setModList} />,
        },
    ];



    return (<Container maxWidth="xl">
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <Tabs defaultActiveKey="1" items={items} />
        </Box>
    </Container>)
}

export default Mod