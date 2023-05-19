import React from 'react';
import { Form } from 'antd';
import Item from '../../ClusterView/setting/Item';

const Leveldataoverride = ({ worlds, currWorld, setCurrWorld, index, dstWorldSetting }) => {
    const WORLDGEN_GROUP = dstWorldSetting.zh.cave.WORLDGEN_GROUP;
    const WORLDSETTINGS_GROUP = dstWorldSetting.zh.cave.WORLDSETTINGS_GROUP;

    console.log("WORLDGEN_GROUP", WORLDGEN_GROUP);
    console.log("WORLDSETTINGS_GROUP", WORLDSETTINGS_GROUP);

    const [form] = Form.useForm();

    //     // const [form] = Form.useForm()
    // const items = [
    //         {
    //             key: '1',
    //             label: `世界选项`,
    //             children: <Item  data={WORLDSETTINGS_GROUP} url={'./misc/worldsettings_customization.webp'} />
    //         },
    //         {
    //             key: '2',
    //             label: `世界生成`,
    //             children: <Item  data={WORLDGEN_GROUP} url={'./misc/worldgen_customization.webp'} />,
    //         },
    // ];

    // return <Tabs defaultActiveKey="1" items={items} />

    // return {currWorld.is_master?(<Item form={form}  data={WORLDSETTINGS_GROUP} url={'./misc/worldsettings_customization.webp'} object={{}}):()  />)}
    
    // return <div>eee</div>
};

export default Leveldataoverride;
