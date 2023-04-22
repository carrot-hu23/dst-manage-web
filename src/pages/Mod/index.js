import { useEffect, useState } from 'react';

import { Container, Box } from '@mui/material';
import { Tabs, Form } from 'antd';
import ModSelect from './modSelect';
import ModSearch from './modSearch';
import { getMyModInfoList } from '../../api/modApi';


const Mod = () => {

    const [modList, setModList] = useState([])

    const [chooseModList, setChooseModList] = useState([])

    const [forms, setForms] = useState({})

    const initForms = () => {
        const m = {}
        modList.forEach(mod => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const newForm = Form.useForm()[0];
            m[mod.modid] = newForm
        });
        setForms(m)
    }

    

    useEffect(() => {
        getMyModInfoList()
            .then(data => {
                setModList(data.data)
                const m = {}
                data.data.forEach(mod => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const newForm = Form.useForm()[0];
                    m[mod.modid] = newForm
                });
                setForms(m)
            }).catch(error => {
                console.log(error);
            })
        // initForms()
    }, [])

    const items = [
        {
            key: '1',
            label: `配置模组`,
            children: <ModSelect
                modList={modList}
                forms={forms}
                setModList={setModList}
                chooseModList={chooseModList}
                add={setChooseModList} />,
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