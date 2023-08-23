import {Button, Drawer, Space, message, Divider} from "antd";
import {useState} from "react";
import SelectLevel, {levelMap} from "../SelectLevel";

export default ({syncModConfig, syncLeveldataConfig,syncAllSlaveLevelModConfig})=>{

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return(
        <>
            <Button type="primary" onClick={showDrawer}>
                配置共享
            </Button>
            <Drawer
                title="配置共享"
                placement="right"
                width={480}
                onClose={onClose}
                open={open}
                // extra={
                //     <Button onClick={onClose} type="primary">
                //         Submit
                //     </Button>
                // }
            >
                <Divider orientation="left">模组配置同步</Divider>
                <SyncModConfig title={'模组配置'} syncConfig={syncModConfig} />
                <br/>
                <Divider orientation="left">世界配置同步</Divider>
                <SyncModConfig title={'世界配置'} syncConfig={syncLeveldataConfig} />
            </Drawer>

        </>
    )
}

const SyncModConfig = ({title, syncConfig})=>{

    const [level, setLevel] = useState("Master")
    const [levelList, setLevelList] = useState([])

    const handleChange1 = (value) => {
        console.log(value)
        setLevel(level)
    }

    const handleChange2 = (value) => {
        // setLevelName(value)
        console.log(value)
        setLevelList(value)
    }

    function syncConfig2() {
        syncConfig(level, levelList)
        message.success(`同步配置成功`)
    }

    return(
        <>
            <div>
                <Space size={4} wrap>
                    <SelectLevel handleChange={handleChange1} />
                    <span>{`  同步到`}</span>
                    <SelectLevel defaultValue={"Slave1"} mode={"multiple"} handleChange={handleChange2} />
                    <span>{title}</span>
                    <Button onClick={()=>syncConfig2()}>应用</Button>
                </Space>
            </div>
        </>
    )
}