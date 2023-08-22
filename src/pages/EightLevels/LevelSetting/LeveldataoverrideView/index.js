import {useEffect, useState} from "react";

import {format, parse} from "lua-json";
import {Button, Form, Space} from "antd";
import Forest from "../../../ClusterView/forest";
import Cave from "../../../ClusterView/cave";
import {translateJsonObject} from "../../../../utils/dstUtils";



export default ({dstWorldSetting, leveldataoverride, setLeveldataoverride}) => {

    const [value, setValue] = useState(leveldataoverride)
    // const value = getValue(levelForm)
    // function setValue(value) {
    //     levelForm.setFieldsValue({
    //         leveldataoverride: value,
    //     });
    // }

    // function getValue(levelForm) {
    //     const value = levelForm.getFieldValue().leveldataoverride
    //     if (value === undefined || value === null || value === '') {
    //         return 'return {}'
    //     }
    //     return value
    // }

    function getLevelObject(value) {
        try {
            return parse(value)
        } catch (error) {
            console.log(error)
            return {}
        }
    }

    const levelObject = getLevelObject(leveldataoverride)

    const levelType = levelObject.location
    const [leveldataoverrideObject, setLeveldataoverrideObject] = useState(levelObject.overrides)

    const [formLevel] = Form.useForm()

    function forestDefaultValues() {
        return { ...translateJsonObject(dstWorldSetting.zh.forest.WORLDGEN_GROUP), ...translateJsonObject(dstWorldSetting.zh.forest.WORLDSETTINGS_GROUP) }
    }

    function caveDefaultValues() {
        return { ...translateJsonObject(dstWorldSetting.zh.cave.WORLDGEN_GROUP), ...translateJsonObject(dstWorldSetting.zh.cave.WORLDSETTINGS_GROUP) }
    }

    function resetting() {
        formLevel.resetFields()
        if (levelType === 'forest') {
            console.log("111",forestDefaultValues())
            setLeveldataoverrideObject({ ...forestDefaultValues() })
        }
        if (levelType === 'cave') {
            console.log(caveDefaultValues())
            setLeveldataoverrideObject({ ...caveDefaultValues() })
        }
    }

    function saveSetting() {
        const overrides = formLevel.getFieldValue()
        levelObject.overrides = overrides
        const leveldataoverride =  format(levelObject)
        setLeveldataoverride(leveldataoverride)
        setValue(leveldataoverride)
    }

    useEffect(()=>{
        console.log("重新刷新  updateValue")
        setLeveldataoverrideObject({...getLevelObject(leveldataoverride).overrides})
        console.log(getLevelObject(leveldataoverride).overrides)
        // formLevel.resetFields()
    }, [leveldataoverride])
    return (
        <>
            {levelType === 'forest' && (<>
                <Forest form={formLevel} object={leveldataoverrideObject}
                        forest={dstWorldSetting.zh.forest}/>
            </>)}
            {levelType === 'cave' && (<>
                <Cave form={formLevel} object={leveldataoverrideObject}
                      cave={dstWorldSetting.zh.cave}/>
            </>)}
            {(levelType !== 'forest' && levelType !== 'cave') && (<>
                <span>暂不支持此类型世界配置文件可视化 {levelType}</span>
            </>)}
            <br/>
            <Space size={8}>
                <Button type={'default'} onClick={() => {resetting()}}>重置</Button>
                <Button type={'primary'} onClick={() => {saveSetting()}}>保存</Button>
            </Space>
        </>
    )
}