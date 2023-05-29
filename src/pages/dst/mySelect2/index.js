import React, { useEffect, useState } from "react";
import { Select } from "antd";
import "./MySelect.css"; // 引入自定义样式

const { Option } = Select;

// eslint-disable-next-line react/prop-types
function MySelect2({ name = "Select", options = [], value, defaultValue = "default", className = "", onChange }) {

    const [isDefault, setIsDefault] = useState(true);

    useEffect(()=>{
        if(value !== defaultValue) {
            setIsDefault(false)
        }
    },[value, defaultValue])

    function handleChange(value) {
        setIsDefault(value === defaultValue);
        onChange(value)
    }

    const selectClassName = isDefault ? "" : "selected";

    return (
        <Select
            name={name}
            style={{
                width: 120,
            }}
            value={value}
            // defaultValue={defaultValue} 
            onChange={(value) => { handleChange(value) }} 
            className={selectClassName}
            >
            {options.map((option) => (
                <Option key={option.value} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
}

export default MySelect2;