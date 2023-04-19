import { Card, Modal, Button, Space, Row, Col, Form, Select } from 'antd';
import { useState } from 'react';

const Option = (props) => {
    
    function isDefault(value, defaultValue) {
        if (value !== defaultValue) {
            return {
                backgroundColor: '#5793dc'
            }
        }
        return {}
    }

    function init(props) {
        const m = {}
        const name = props.data.name
        const value = props.data.default
        m[name] = value
        return m
    }

    return (<>
        <Form
            form={props.form}
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={
                init(props)
            }
        >
            <Form.Item
                label={props.data.label}
                name={props.data.name}>
                <Select
                    defaultValue={props.data.default}
                    style={{
                        width: 120,
                    }}
                    // onChange={handleChange}
                    options={props.data.options.map(option => ({
                        value: option.data,
                        label: option.description,
                    }))}
                />
            </Form.Item>

        </Form>

    </>)
}

const ModDetail = (props) => {

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    
    return <Card style={{ padding: '24px', height: '500px' }}>

        <Row>
            <Col flex={'100px'}>
                <img
                    alt="example"
                    src={props.mod.img}
                />
            </Col>
            <Col flex="auto" style={{ paddingLeft: '16px' }}>
                <span>{props.mod.name}</span><br />
                <span>作者: {props.mod.mod_config.author}</span><br />
                <span>版本: {props.mod.v}</span><br />
                <span>与《饥荒联机版兼容》</span><br />
            </Col>
        </Row>
        <div>
            <br />
            {props.mod.description}
            <br />
            <br />
        </div>
        <Space >
            <Button type="primary" onClick={() => setOpen(true)} >配置</Button>
            <Button >
                <a
                    target={'_blank'}
                    href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${props.mod.modId}`} rel="noreferrer" >创意工坊</a>
            </Button>
        </Space>

        <Modal
            title={`${props.mod.name} 配置`}
            // centered
            open={open}
            onOk={() => {
                setOpen(false)
                console.log(form.getFieldsValue())
                
            }}
            onCancel={() => setOpen(false)}
            width={640}
        >
            {props.mod.mod_config.configuration_options !== undefined && props.mod.mod_config.configuration_options.map(config =>
                (<Option key={config.name} data={config} form={form} />)
            )}
        </Modal>

    </Card>
}

export default ModDetail