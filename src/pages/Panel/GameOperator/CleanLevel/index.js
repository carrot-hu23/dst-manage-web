import {Box, Card} from "@mui/material";
import {Button, Spin, Space, Select, message} from "antd";
import React, {useEffect, useRef, useState} from "react";

import {useParams} from "react-router-dom";
import SelectLevel from "../../../EightLevels/SelectLevel";
import {cleanLevelApi} from "../../../../api/8level";


export default () => {

    const {cluster} = useParams()
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
                <Button type={'primary'} onClick={() => {
                    cleanLevels()
                }}>清理世界</Button>
            </Space>
        </Spin>
    </>
}