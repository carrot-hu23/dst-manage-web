/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Space, Form } from 'antd';
import MySelect from '../mySelect2';
import { configItem2Object, parseOverridesObject } from '../helper/dstHelper';


function getLevelDefaultValues(config,leveldataoverride) {
    return {...configItem2Object(config), ...parseOverridesObject(leveldataoverride)}
}

const LevelItem = ({ form, config, image, leveldataoverride }) => {

    const defaultValues = getLevelDefaultValues(config, leveldataoverride)

    const sortedKeys = Object.keys(config).sort((a, b) => config[a].order - config[b].order);
    useEffect(() => {
        console.log('更新了');
        
    }, [form, leveldataoverride])
    return (<>
        <div style={{
            height: '400px',
            overflowY: 'auto',
        }}>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 18,
                }}
                layout="vertical"
                initialValues={defaultValues}
            >
                {sortedKeys.map(key => (
                    <div key={key}>
                        <h3>{config[key].text}</h3>
                        <Space size={[64, 8]} wrap>
                            {
                                Object.entries(config[key].items)
                                    .map(([key2, value]) =>
                                        // 可以在回调函数内对 value 进行操作
                                        <Space key={key2} align="center" size={'middle'}>
                                            <div style={{
                                                width: '64px',
                                                height: '64px',
                                                backgroundImage: `url(${image})`,
                                                backgroundPosition: `-${Math.round(value.image.x * config[key].atlas.width / config[key].atlas.item_size) * 100}% -${Math.round(value.image.y * config[key].atlas.height / config[key].atlas.item_size) * 100}%`
                                            }} > </div>
                                            <Form.Item
                                                key={key2}
                                                label={value.text}
                                                name={key2}>
                                                <MySelect
                                                    value={defaultValues[key2]}
                                                    object={defaultValues}
                                                    onChange={(d) => d}
                                                    name={key2}
                                                    defaultValue={value.value}
                                                    options={((value.desc !== undefined &&
                                                        value.desc !== null) &&
                                                        Object.entries(value.desc).map(([k, v]) => ({
                                                            value: k,
                                                            label: v,
                                                        }))) || (config[key].desc !== undefined &&
                                                            config[key].desc !== null) &&
                                                        Object.entries(config[key].desc).map(([k, v]) => ({
                                                            value: k,
                                                            label: v,
                                                        }))
                                                    }
                                                />
                                            </Form.Item>
                                        </Space>
                                    )
                            }
                        </Space>
                    </div>

                ))}
            </Form>
        </div>
    </>)
}

export default LevelItem