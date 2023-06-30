/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react';
import _ from 'lodash';
import {Card, Modal, Button, Space, Row, Col, Form, Typography} from 'antd';
import Select2 from './Select2';

const {Paragraph} = Typography;

const OptionSelect = ({mod, root, setRoot, defaultValues, defaultValuesMap, setDefaultValuesMap}) => {

    const [form] = Form.useForm();
    useEffect(() => {
        const options = mod.mod_config.configuration_options;
        if (options !== undefined && options !== null) {
            const object = {};
            options.forEach((item) => {
                const {name} = item;
                const value = item.default;
                object[name] = value;
            });
            const newDefault = {};
            options.forEach((o) => {
                newDefault[o.name] = o.default;
            });
            // setDefaultValue(newDefault);
            //   console.log('init', options,object);
        }
    }, []);

    // eslint-disable-next-line no-unused-vars
    const handleFormChange = (changedValues, allValues) => {
        // console.log('Changed values:', changedValues);
        // eslint-disable-next-line no-restricted-syntax
        for (const fieldName in changedValues) {
            // eslint-disable-next-line no-prototype-builtins
            if (changedValues.hasOwnProperty(fieldName)) {
                const fieldValue = changedValues[fieldName];
                // console.log(`Field ${fieldName} changed to ${fieldValue}`);
                _.set(root, `${mod.modid}.${fieldName}`, fieldValue);

                // 同时把 默认的配置 也更新下
                const newDefaultValue = _.cloneDeep(defaultValuesMap)
                // _.set(newDefaultValue, `"${mod.modid}".${fieldName}`, fieldValue)
                console.log("newDefaultValue.get(mod.modid): ", newDefaultValue.get(mod.modid))
                if (newDefaultValue.get(mod.modid) === undefined || newDefaultValue.get(mod.modid) === null) {
                    const obj = {
                        fieldName: fieldValue
                    }
                    newDefaultValue.set(mod.modid, obj)
                } else {
                    newDefaultValue.get(mod.modid)[`${fieldName}`] = fieldValue
                }
                setDefaultValuesMap(newDefaultValue)

                console.log("defaultValuesMap: ", defaultValuesMap)
                console.log("newDefaultValue: ", newDefaultValue)
            }
        }
        const _root = _.cloneDeep(root);
        setRoot(_root);
    };

    return (
        <>
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
            >
                {mod.mod_config.configuration_options !== undefined &&
                    mod.mod_config.configuration_options
                        .filter((item) => item.options !== undefined)
                        .map((item) =>
                                // eslint-disable-next-line react/jsx-key
                            {
                                if (item.name === 'Title' || item.name === '') {
                                    return <h4 key={item.label}>{item.label} 配置</h4>;
                                }
                                if (item.label === undefined || item.label === '') {
                                    return <h4 key={item.name}>{item.name}</h4>;
                                }
                                let defaultValue
                                if (defaultValuesMap.get(`${mod.modid}`) !== undefined) {
                                    defaultValue = defaultValuesMap.get(`${mod.modid}`)[`${item.name}`]
                                } else {
                                    defaultValue = undefined
                                }
                                // console.log("1111111: ",defaultValuesMap, mod.modid, defaultValuesMap.get(`${mod.modid}`), item.name)
                                return <Select2 key={item.name} item={item}
                                                defaultValue={defaultValue}/>;
                            }
                        )}
            </Form>
        </>
    );
};

// eslint-disable-next-line react/prop-types
const ModDetail = ({mod, root, setRoot, defaultValues, defaultValuesMap, setDefaultValuesMap}) => {

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [ellipsis, setEllipsis] = useState(true);

    return (
        <Card
            style={{
                height: '360px',
                overflowY: 'auto',
                overflowX: 'auto',
            }}
        >
            <Row>
                <Col flex={'100px'}>
                    <img alt="example" src={mod.img}/>
                </Col>
                <Col flex="auto" style={{paddingLeft: '16px'}}>
                    <span>{mod.name}</span>
                    <br/>
                    <span>{mod.modid}</span>
                    <br/>
                    <span>作者: {mod.mod_config.author}</span>
                    <br/>
                    <span>版本: {mod.v}</span>
                    <br/>
                    <span>与《饥荒联机版兼容》</span>
                    <br/>
                </Col>
            </Row>
            <div>
                <br/>
                <Paragraph
                    ellipsis={
                        ellipsis
                            ? {
                                rows: 2,
                                expandable: true,
                                symbol: 'more',
                            }
                            : false
                    }
                >
                    {mod.description}
                </Paragraph>

                <br/>
                <br/>
            </div>
            <Space>
                <Button type="primary" onClick={() => setOpen(true)}>
                    配置
                </Button>
                <Button>
                    <a
                        target={'_blank'}
                        href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.modid}`}
                        rel="noreferrer"
                    >
                        创意工坊
                    </a>
                </Button>
            </Space>

            <Modal
                title={`${mod.name} 配置`}
                // centered
                open={open}
                onOk={() => {
                    setOpen(false);
                }}
                onCancel={() => setOpen(false)}
                width={640}
                destroyOnClose
            >
                {mod.mod_config.configuration_options !== undefined && (
                    <OptionSelect mod={mod} root={root} setRoot={setRoot} defaultValues={defaultValues}
                                  defaultValuesMap={defaultValuesMap}
                                  setDefaultValuesMap={setDefaultValuesMap}
                    />
                )}
            </Modal>
        </Card>
    );
};

export default ModDetail;
