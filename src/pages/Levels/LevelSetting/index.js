import {Tabs} from "antd";

import Leveldataoverride from "./Leveldataoverride";
import Modoverrides from "./Modoverrides";
import ServerIni from "../../Levels/ServerIni";

export default ({levelForm, dstWorldSetting})=>{

    const items = [
        {
            key: '1',
            label: `世界配置`,
            children: <Leveldataoverride levelForm={levelForm}  dstWorldSetting={dstWorldSetting}/>
        },
        {
            key: '2',
            label: `模组配置`,
            children: <Modoverrides levelForm={levelForm} />
        },
        {
            key: '3',
            label: `端口配置`,
            children: <ServerIni form={levelForm} />
        },
    ]

    return(
        <>
            <Tabs type="card" defaultActiveKey="1" items={items} />
        </>
    )
}