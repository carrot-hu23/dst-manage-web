/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import _ from 'lodash'
import { Card, Modal, Button, Space, Row, Col, Form, Select, Typography } from 'antd';

const { Paragraph } = Typography;

// const Option = (props) => {
//     function init(props) {
//         const m = {}
//         const name = props.data.name
//         const value = props.data.default
//         m[name] = value
//         return m
//     }
//     const handleFormChange = (changedValues, allValues) => {
//         console.log('Changed values:', changedValues, changedValues);
//         console.log('All values:', allValues);
//     };
//     return (<>
//         <Form
//             form={props.form}
//             onValuesChange={handleFormChange}
//             name="basic"
//             labelCol={{
//                 span: 8,
//             }}
//             wrapperCol={{
//                 span: 16,
//             }}
//             initialValues={
//                 init(props)
//             }
//         >
//             {props.data.name !== 'Title' && <Form.Item
//                 label={props.data.label}
//                 name={props.data.name}>
//                 <Select
//                     defaultValue={props.data.default}
//                     style={{
//                         width: 120,
//                     }}
//                     // onChange={handleChange}
//                     options={props.data.options.map(option => ({
//                         value: option.data,
//                         label: option.description,
//                     }))}
//                 />
//             </Form.Item>}
//             {/* { (props.data.options.length < 1 || props.data.options[0].data === '') &&<span>{props.data.label}</span>} */}

//         </Form>

//     </>)
// }

const OptionSelect = ({ mod, root, setRoot }) => {
    const [form] = Form.useForm()

    useEffect(() => {
        const options = mod.mod_config.configuration_options
        if (options !== undefined && options !== null) {
            const object = {}
            options.forEach(item => {
                const { name } = item
                const value = item.default
                object[name] = value
            })
            console.log('init', object);

        }
    }, [])

    // eslint-disable-next-line no-unused-vars
    const handleFormChange = (changedValues, allValues) => {
        console.log('Changed values:', changedValues);
        // eslint-disable-next-line no-restricted-syntax
        for (const fieldName in changedValues) {
            // eslint-disable-next-line no-prototype-builtins
            if (changedValues.hasOwnProperty(fieldName)) {
                const fieldValue = changedValues[fieldName];
                console.log(`Field ${fieldName} changed to ${fieldValue}`);
                _.set(root, `${mod.modid}.${fieldName}`, fieldValue)
            }
        }
        const _root = _.cloneDeep(root)
        setRoot(_root)
    };

    return (<>
        <Form
            form={form}
            onValuesChange={handleFormChange}
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
        // initialValues={defaultValues}
        >
            {mod.mod_config.configuration_options !== undefined && mod.mod_config.configuration_options
                .filter(item => item.options !== undefined)
                .map(
                    item =>
                    // eslint-disable-next-line react/jsx-key
                    {
                        if (item.name === 'Title' || item.name === '') {
                            return <h4 key={item.label}>{item.label} 配置</h4>
                        }
                        return <Form.Item
                            key={item.label + item.name}
                            label={item.label}
                            name={item.name}>
                            <Select
                                defaultValue={item.default}
                                style={{
                                    width: 120,
                                }}
                                // onChange={handleChange}
                                options={item.options.map(option => ({
                                    value: option.data,
                                    label: option.description,
                                }))}
                            />
                        </Form.Item>
                    }
                )}
        </Form>

    </>)
}


// eslint-disable-next-line react/prop-types
const ModDetail = ({ mod, root, setRoot }) => {

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm()
    const [ellipsis, setEllipsis] = useState(true);

    return <Card style={{
        padding: '24px',
        height: '360px',
        overflowY: 'auto',
        overflowX: 'auto'
    }}>

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
                            rows: 4,
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
            {/* {mod.mod_config.configuration_options !== undefined && mod.mod_config.configuration_options.map(config =>
                (<Option key={config.label} data={config} form={form} />)
            )} */}
            {mod.mod_config.configuration_options !== undefined &&
                <OptionSelect mod={mod} root={root} setRoot={setRoot} />}
        </Modal>

    </Card>
}

export default ModDetail