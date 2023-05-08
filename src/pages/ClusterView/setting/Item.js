/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Space, Form } from 'antd';
import MySelect from '../mySelect';

const Item = ({ form, data, url, object }) => {

    const sortedKeys = Object.keys(data).sort((a, b) => data[a].order - data[b].order);
    useEffect(()=>{},[form,object])
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
                initialValues={object}
            >
                {sortedKeys.map(key => (
                    <div key={key}>
                        <h3>{data[key].text}</h3>
                        <Space size={[64, 8]} wrap>
                            {
                                Object.entries(data[key].items)
                                    .map(([key2, value]) =>
                                        // 可以在回调函数内对 value 进行操作
                                        <Space key={key2} align="center" size={'middle'}>
                                            <div style={{
                                                width: '64px',
                                                height: '64px',
                                                backgroundImage: `url(${url})`,
                                                backgroundPosition: `-${Math.round(value.image.x * data[key].atlas.width / data[key].atlas.item_size) * 100}% -${Math.round(value.image.y * data[key].atlas.height / data[key].atlas.item_size) * 100}%`
                                            }} > </div>
                                            <Form.Item
                                                key={key2}
                                                label={value.text}
                                                name={key2}>
                                                <MySelect
                                                    value={object[key2]}
                                                    object={object}
                                                    onChange={(d) => d}
                                                    name={key2}
                                                    defaultValue={value.value}
                                                    options={((value.desc !== undefined &&
                                                        value.desc !== null) &&
                                                        Object.entries(value.desc).map(([k, v]) => ({
                                                            value: k,
                                                            label: v,
                                                        }))) || (data[key].desc !== undefined &&
                                                            data[key].desc !== null) &&
                                                        Object.entries(data[key].desc).map(([k, v]) => ({
                                                            value: k,
                                                            label: v,
                                                        }))
                                                    }
                                                />
                                                {/* <Select
                                                    // defaultValue={value.value}
                                                    style={{
                                                        width: 120,
                                                    }}
                                                    // onChange={handleChange}
                                                    options={((value.desc !== undefined &&
                                                        value.desc !== null) &&
                                                        Object.entries(value.desc).map(([k, v]) => ({
                                                            value: k,
                                                            label: v,
                                                        }))) || (data[key].desc !== undefined &&
                                                            data[key].desc !== null) &&
                                                        Object.entries(data[key].desc).map(([k, v]) => ({
                                                            value: k,
                                                            label: v,
                                                        }))
                                                    }
                                                /> */}
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

export default Item