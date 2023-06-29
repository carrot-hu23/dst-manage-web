/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Form, Select } from 'antd';

function checkDefault(defaultValue1, defaultValue2) {
    if (defaultValue1 === undefined || defaultValue2 === null) {
        return true
    }
    return defaultValue1 === defaultValue2
}

function Select2({ item,defaultValue }) {
    // console.log("label: ", item.label, "name: ", item.name,"defaultValue: ", defaultValue)
    const [isDefault, setIsDefault] = useState(checkDefault(defaultValue, item.default))
    useEffect(() => {
        
    }, [])
    return <Form.Item
        key={item.label + item.name}
        label={item.label}
        name={item.name}>
        <Select
            className={isDefault ? '' : 'selected'}
            defaultValue={defaultValue === undefined?item.default: defaultValue}
            style={{
                width: 120,
            }}
            onChange={(value) => {
                setIsDefault(value === item.default)
            }}
            options={item.options.map(option => ({
                value: option.data,
                label: option.description,
            }))}
        />
    </Form.Item>
}

export default Select2