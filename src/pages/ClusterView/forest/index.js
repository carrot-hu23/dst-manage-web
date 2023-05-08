/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React from 'react'
import {Tabs } from 'antd';
import Item from '../setting/Item';


const Forest = ({ form, forest,object }) => {

    const WORLDGEN_GROUP = forest.WORLDGEN_GROUP
    const WORLDSETTINGS_GROUP = forest.WORLDSETTINGS_GROUP

    // const [form] = Form.useForm()
    const items = [
        {
            key: '1',
            label: `世界选项`,
            children: <Item  object={object} form={form} data={WORLDSETTINGS_GROUP} url={'./misc/worldsettings_customization.webp'} />
        },
        {
            key: '2',
            label: `世界生成`,
            children: <Item object={object} form={form} data={WORLDGEN_GROUP} url={'./misc/worldgen_customization.webp'} />,
        },
    ];

    return <Tabs defaultActiveKey="1" items={items} />
}



export default Forest