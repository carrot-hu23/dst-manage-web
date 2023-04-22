import { useEffect, useState } from 'react';
import { Card, Modal, Button, Space, Row, Col, Form, Select, Typography } from 'antd';

const { Paragraph, Text } = Typography;

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
            {props.data.name !== 'Title' && <Form.Item
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
            </Form.Item>}
            {/* { (props.data.options.length < 1 || props.data.options[0].data === '') &&<span>{props.data.label}</span>} */}

        </Form>

    </>)
}

// eslint-disable-next-line react/prop-types
const ModDetail = ({ mod, form }) => {

    const [open, setOpen] = useState(false);
    // const [form] = Form.useForm()
    const [ellipsis, setEllipsis] = useState(true);

    return <Card style={{ padding: '24px', height: '400px' }}>

        <Row>
            <Col flex={'100px'}>
                <img
                    alt="example"
                    src={mod.img}
                />
            </Col>
            <Col flex="auto" style={{ paddingLeft: '16px' }}>
                <span>{mod.name}</span><br />
                <span>作者: {mod.mod_config.author}</span><br />
                <span>版本: {mod.v}</span><br />
                <span>与《饥荒联机版兼容》</span><br />
            </Col>
        </Row>
        <div>
            <br />
            <Paragraph
                ellipsis={
                    ellipsis
                        ? {
                            rows: 5,
                            expandable: true,
                            symbol: 'more',
                        }
                        : false
                }
            >
                {mod.description}
            </Paragraph>

            <br />
            <br />
        </div>
        <Space >
            <Button type="primary" onClick={() => setOpen(true)} >配置</Button>
            <Button >
                <a
                    target={'_blank'}
                    href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.modid}`} rel="noreferrer" >创意工坊</a>
            </Button>
        </Space>

        <Modal
            title={`${mod.name} 配置`}
            // centered
            open={open}
            onOk={() => {
                setOpen(false)
                console.log(form.getFieldsValue())

            }}
            onCancel={() => setOpen(false)}
            width={640}
        >
            {mod.mod_config.configuration_options !== undefined && mod.mod_config.configuration_options.map(config =>
                (<Option key={config.label} data={config} form={form} />)
            )}
        </Modal>

    </Card>
}

export default ModDetail