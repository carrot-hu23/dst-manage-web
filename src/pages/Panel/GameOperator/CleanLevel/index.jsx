import {Button, Spin, Space, message, Popconfirm} from "antd";
import React, {useEffect, useState} from "react";

import SelectLevel from "../../../Levels8/SelectLevel";
import {cleanLevelApi} from "../../../../api/8level";


export default () => {

    const [open, setOpen] = useState(false);
    const [spinLoading, setSpinLoading] = useState(false)
    const [levelList, setLevelList] = useState(["Master"])

    useEffect(() => {
    }, [])

    function cleanLevels () {
        setSpinLoading(true)
        cleanLevelApi("", levelList)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success("清理成功")
                } else {
                    message.error("清理失败")
                }
                setSpinLoading(false)
            })
            .catch(error=>{
                console.log(error)
                setSpinLoading(false)
                message.error("清理失败")
            })
    }

    return <>
        <Spin spinning={spinLoading} description={"正在清理世界"}>
            <Space size={8}>
                <span>世界</span>
                <SelectLevel defaultValue={"Master"} mode={"multiple"} handleChange={(value)=>{setLevelList(value)}} />
                <Popconfirm
                    title="是否清除世界存档"
                    description={(
                        <span>
                        点击确认将删除 save，session 等文件
                        </span>
                    )}
                    open={open}
                    onConfirm={()=>cleanLevels()}
                    onCancel={()=>setOpen(false)}
                >
                <Button type={'primary'} onClick={() => setOpen(true)}>清理世界</Button>
                </Popconfirm>
            </Space>
        </Spin>
    </>
}