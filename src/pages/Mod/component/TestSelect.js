/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Form, Select } from 'antd';

function TestSelect({ item }) {
    const [isDefault, setIsDefault] = useState(true)

    useEffect(() => {
        
    }, [])

    return <Form.Item
        key={item.label + item.name}
        label={item.label}
        name={item.name}>
        <Select
            className={isDefault ? '' : 'selected'}
            defaultValue={item.default}
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

export default TestSelect