import {Box, Card} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {Alert, Button, Input, message, Skeleton, Space, Spin, Switch} from "antd";
import {enableKeyCerApi, getKeyCerApi, importClusterApi, reflushKeyCerApi} from "../../../api/shareApi";
import HiddenText from "../../../components2/HiddenText/HiddenText";


export default ()=>{

    const [keyCer, setKeyCer] = useState({})
    const inputRef = useRef(null);

    const [spin, setSpin] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        getKeyCerApi()
            .then(resp=>{
                if (resp.code === 200) {
                    setKeyCer(resp.data)
                }
                setLoading(false)
            })
    }, [])


    return(
        <>
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Skeleton loading={loading} >
                        <Spin spinning={spin}>
                            <Space.Compact
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Input ref={inputRef} placeholder="请输入他人分享的链接"/>
                                <Button type="primary" onClick={()=>{
                                    importClusterApi(inputRef.current.input.value)
                                        .then(resp=>{
                                            if (resp.code === 200) {
                                                message.success("导入成功")
                                            } else {
                                                message.error("导入失败")
                                            }
                                        })
                                }}>导入存档</Button>
                            </Space.Compact>

                            <br/><br/>
                            <h4>我的分享链接</h4>
                            <Space size={8} wrap>
                                <Switch checked={keyCer.enable === "1"} checkedChildren="开启" unCheckedChildren="关闭"
                                        onChange={(checked)=>{
                                            setSpin(true)
                                            enableKeyCerApi(checked)
                                                .then(resp=>{
                                                    if (resp.code === 200) {
                                                        setKeyCer(resp.data)
                                                    }
                                                    setSpin(false)
                                                })
                                        }}
                                />
                                <Button size={'small'} type={"primary"} onClick={()=>{
                                    setSpin(true)
                                    reflushKeyCerApi()
                                        .then(resp=>{
                                            if (resp.code === 200) {
                                                setKeyCer(resp.data)
                                            }
                                            setSpin(false)
                                        })
                                }}>刷新链接</Button>
                            </Space>
                            <br/><br/>
                            <HiddenText text={`http://${keyCer.ip}:${keyCer.port}/share/cluster?key=${keyCer.key}`} />
                            <br/>
                            <Alert message="请勿随意暴露，可能存在安全问题" type="warning" showIcon closeIcon/>
                        </Spin>
                    </Skeleton>
                </Box>
            </Card>
        </>
    )
}