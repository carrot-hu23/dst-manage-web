import {useEffect, useState} from "react";
import {Button, Space, Spin, Switch} from "antd";

import Editor from "../../../Home/Editor";
import LeveldataoverrideView from "../LeveldataoverrideView";


export default ({levelForm, dstWorldSetting}) => {

    const [choose, setChoose] = useState(true)
    const [leveldataoverride, setLeveldataoverride] = useState(getValue(levelForm))

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
        console.log("更新了 leveldataoverride")
    }, [leveldataoverride])
    return (
        <>
            <Switch
                checkedChildren={"编辑"} unCheckedChildren={"可视化"}
                onClick={(checked, event) => setChoose(checked)}
                checked={choose}
                defaultChecked={choose}/>
            {choose && (
                <>
                    <Editor
                        // value={getValue(levelForm)}
                        value={leveldataoverride}
                        // eslint-disable-next-line react/jsx-no-bind
                        setValue={setValue}
                        styleData={{
                            height: '370px',
                            language: 'lua',
                        }}
                    />
                    <br/>
                    <Space size={8}>
                        <Button type={'primary'} onClick={() => {
                            setLeveldataoverride(getValue(levelForm))
                        }}>更新</Button>
                    </Space>
                </>

            )}
            {!choose && (
                <LeveldataoverrideView leveldataoverride={leveldataoverride} setLeveldataoverride={setLeveldataoverride}
                                       dstWorldSetting={dstWorldSetting}/>)}

        </>
    )
}