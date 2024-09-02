/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react';
import {Form, Input, Select} from 'antd';

const {TextArea} = Input;

function checkDefault(defaultValue1, defaultValue2) {
    if (defaultValue1 === undefined || defaultValue2 === null) {
        return true
    }
    return defaultValue1 === defaultValue2
}

function Select2({item, defaultValue}) {
    // console.log("label: ", item.label, "name: ", item.name, "defaultValue: ", defaultValue, "typeof", typeof defaultValue, item)
    const [isDefault, setIsDefault] = useState(checkDefault(defaultValue, item.default))
    useEffect(() => {
        
    }, [])
    return <>
        {typeof item.default === 'object' && (
            <>
                <Form.Item
                    key={item.label + item.name}
                    label={item.label}
                    name={item.name}>
                    {/*
                    // TODO 是否允许用户自己可以直接修改
                    <TextArea
                        style={{
                            width: 360,
                        }} defaultValue={JSON.stringify(defaultValue)} rows={4} showCount/>
                    */}
                    <span style={{width: 360}}>
                        {JSON.stringify(defaultValue)}
                    </span>
                </Form.Item>
            </>
        )}
        {typeof item.default !== 'object' && (
            <Form.Item
                key={item.label + item.name}
                label={item.label}
                name={item.name}>
                <Select
                    className={isDefault ? '' : 'selected'}
                    defaultValue={defaultValue === undefined ? item.default : defaultValue}
                    style={{
                        width: 160,
                    }}
                    onChange={(value) => {
                        setIsDefault(value === item.default)
                    }}
                    options={Array.isArray(item?.options) && item?.options.map(option => ({
                        value: option.data,
                        label: option.description,
                    }))}
                />
            </Form.Item>
        )}
    </>
}

export default Select2