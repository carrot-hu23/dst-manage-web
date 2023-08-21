import {parse} from "lua-json";
import {Form} from "antd";
import Forest from "../../../ClusterView/forest";
import Cave from "../../../ClusterView/cave";

export default ({levelForm,dstWorldSetting})=>{
    console.log("dstWorldSetting",dstWorldSetting)
    const value = getValue(levelForm)
    function setValue(value) {
        levelForm.setFieldsValue({
            leveldataoverride: value,
        });
    }

    function getValue(levelForm) {
        const value = levelForm.getFieldValue().leveldataoverride
        if (value === undefined || value === null ||value === '') {
            return 'return {}'
        }
        return value
    }

    function getLevelObject(value) {
        try {
            return parse(value)
        } catch (erorr) {
            console.log(erorr)
            return {}
        }
    }
    const levelObject = getLevelObject(value)
    console.log(levelObject)

    const levelType = levelObject.location
    const leveldataoverrideObject = levelObject.overrides

    const [formLevel] = Form.useForm()

    return(
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
        可视化
        </>
    )
}