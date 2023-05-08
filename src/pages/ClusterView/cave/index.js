/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
import React from 'react'
import { Tabs } from 'antd';
import Item from '../setting/Item';


const Cave = ({ form, cave,object }) => {

    const WORLDGEN_GROUP = cave.WORLDGEN_GROUP
    const WORLDSETTINGS_GROUP = cave.WORLDSETTINGS_GROUP

    // const [form] = Form.useForm()

    const items = [

        {
            key: '1',
            label: `世界选项`,
            children: <Item object={object} form={form} data={WORLDSETTINGS_GROUP} url={'./misc/worldsettings_customization.webp'} />
        },
        {
            key: '2',
            label: `世界生成`,
            children: <Item object={object} form={form} data={WORLDGEN_GROUP} url={'./misc/worldgen_customization.webp'}/>,
        },
    ];
    return (<Tabs defaultActiveKey="1" items={items} />)
}

export default Cave