import {useEffect, useState} from "react";
import {Button, Space, Switch} from "antd";

import Editor from "../../../Home/Editor";
import LeveldataoverrideView from "../LeveldataoverrideView";
import Forest from "../Forest";


export default ({levelForm, dstWorldSetting}) => {

    function setValue(value) {
        levelForm.setFieldsValue({
            leveldataoverride: value,
        });
    }

    function getValue(levelForm) {
        const value = levelForm.getFieldValue().leveldataoverride
        if (value === undefined || value === null || value === '') {
            return 'return {}'
        }
        return value
    }

    useEffect(() => {
    }, [])
    return (
        <>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Forest changeValue={setValue} leveldataoverride={getValue(levelForm)} dstWorldSetting={dstWorldSetting} />
        </>
    )
}