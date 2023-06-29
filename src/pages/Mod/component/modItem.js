/* eslint-disable react/prop-types */
import { useState } from 'react';
import {Card, Checkbox, Switch, Popconfirm, Row, Col, Button, message} from 'antd';

import './mod.css';
import {useParams} from "react-router-dom";
import { deleteModInfo } from '../../../api/modApi';


const ModItem = (props) => {
    const {removeMod} = props
    const [mod, setMod] = useState({})
    const {cluster} = useParams()
    
    return <Card className='mod' style={{ margin: ' 0 0 16px' }}>
        <Row onClick={() => { props.changeMod(props.mod) }}>
            <Col flex="64px">
                <img
                    alt="example"
                    src={props.mod.img}
                />
            </Col>
            <Col flex="auto" style={{ paddingLeft: '16px' }}>
                <Row>
                    <Col span={24}><span style={{
                        fontSize: '16px'
                    }}>{props.mod.name}</span></Col>
                </Row>
                <Row style={{
                    marginTop: '12px'
                }}>
                    <Col span={12} />
                    <Col span={24}>
                        {/* <Checkbox
                            checked={props.mod.enable}
                            onChange={() => { props.changeEnable(props.mod.modid) }}>
                            {props.mod.enable && <span>启用</span>}
                            {!props.mod.enable && <span>禁用</span>}
                        </Checkbox> */}
                        <Switch checkedChildren="开启" unCheckedChildren="关闭"
                            defaultChecked={props.mod.enable}
                            onChange={() => { props.changeEnable(props.mod.modid) }}
                        />
                        <Popconfirm
                            title="是否取消该mod订阅"
                            // description="是否取消该mod订阅"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                                deleteModInfo(cluster,mod.modid)
                                    .then(resp=>{
                                        if (resp.code === 200) {
                                            message.success("删除模组成功")
                                            removeMod(mod.modid)
                                        }
                                    })
                            }}
                        >
                            <Button type="text" danger onClick={() => { setMod(props.mod) }}>
                                删除
                            </Button>
                        </Popconfirm>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Card>
}

export default ModItem