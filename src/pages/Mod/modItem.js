import { Card, Checkbox, Row, Col } from 'antd';

import './mod.css';

const ModItem = (props) => <Card style={{margin: ' 0 0 16px' }}>
    <Row onClick={()=>{props.changeMod(props.mod)}}>
        <Col flex="72px">
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
                marginTop: '16px'
            }}>
                <Col span={12} />
                <Col span={12}>
                    <Checkbox 
                        checked={props.mod.enable}
                        onChange={()=> {props.changeEnable(props.mod.modid)}}>
                        {props.mod.enable && <span>启用</span>}
                        {!props.mod.enable && <span>禁用</span>}
                    </Checkbox>
                </Col>
            </Row>
        </Col>
    </Row>
</Card>

export default ModItem