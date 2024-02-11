import {Button, Divider, Form, Space} from "antd";
import {useEffect} from "react";
import _ from "lodash";
import { FixedSizeList as List } from 'react-window';

import Select2 from "../../../Mod/component/Select2";
import {generateUUID} from "../../../../utils/dateUitls";

const OptionSelect = ({mod, defaultConfigOptionsRef, modConfigOptionsRef}) => {

    const defaultConfigOptions = defaultConfigOptionsRef.current

    useEffect(() => {

    }, []);

    // eslint-disable-next-line no-unused-vars
    const handleFormChange = (changedValues, allValues) => {
        const root = modConfigOptionsRef.current
        // eslint-disable-next-line no-restricted-syntax
        for (const fieldName in changedValues) {
            // eslint-disable-next-line no-prototype-builtins
            if (changedValues.hasOwnProperty(fieldName)) {
                const fieldValue = changedValues[fieldName];
                // console.log(`Field ${fieldName} changed to ${fieldValue}`);

                _.set(root, `${mod.modid}.${fieldName}`, fieldValue);
                // 同时把 默认的配置 也更新下
                const newDefaultValue = _.cloneDeep(defaultConfigOptionsRef.current)
                // _.set(newDefaultValue, `"${mod.modid}".${fieldName}`, fieldValue)
                console.log("newDefaultValue.get(mod.modid): ", newDefaultValue.get(mod.modid))
                if (newDefaultValue.get(mod.modid) === undefined || newDefaultValue.get(mod.modid) === null) {
                    const obj = {
                        fieldName: fieldValue
                    }
                    newDefaultValue.set(mod.modid, obj)
                } else {
                    newDefaultValue.get(mod.modid)[`${fieldName}`] = fieldValue
                }
                console.log("defaultValuesMap: ", defaultConfigOptionsRef.current)
                defaultConfigOptionsRef.current = newDefaultValue
                console.log("newDefaultValue: ", newDefaultValue)
            }
        }
        modConfigOptionsRef.current = root
        console.log("new modConfigOptionsRef", modConfigOptionsRef.current)
    };

    const configurationOptions = mod?.mod_config?.configuration_options !== undefined? mod?.mod_config?.configuration_options.map(item=>item):[]
    console.log("configurationOptions", configurationOptions.length)


    return (
        <>
            <Form
                onValuesChange={handleFormChange}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
            >
                {mod?.mod_config?.configuration_options !== undefined && configurationOptions.length > 30 && (
                    <List
                        height={350}
                        itemCount={configurationOptions.length}
                        itemSize={60}
                        // width={500}
                    >
                        {({index, style })=>{
                            const item = configurationOptions[index]
                            if (item?.options?.length === 1 && item?.options[0]?.data === item?.default && !item?.options[0]?.description) {
                                // 在DST中,如果label为空字符串,就直接是显示空白行,这里用||会导致label为空也显示name,为了跟DST保持一样使用了??
                                return <div style={style}>
                                    <Divider key={generateUUID()}>
                                        <span style={{fontSize: "14px", fontWeight: "600"}}>
                                        {item.label || item.name}</span>
                                    </Divider>
                                </div>
                            }
                            // TODO 还不知道哪些mod是这样的作为标题的,我目前没有发现
                            if (item.name === 'Title' || item.name === '') {
                                if (item.label === '') {
                                    return ""
                                }
                                return  <div style={style}>
                                    <Divider key={generateUUID()}>
                                        <span style={{fontSize: "14px", fontWeight: "600"}}>{item.label} 配置</span>
                                    </Divider>
                                </div>
                            }

                            let defaultValue
                            if (defaultConfigOptions.get(`${mod.modid}`) !== undefined) {
                                defaultValue = defaultConfigOptions.get(`${mod.modid}`)[`${item.name}`]
                            } else {
                                defaultValue = undefined
                            }
                            return <div style={style}>
                                <Select2 key={generateUUID()} item={item} defaultValue={defaultValue}/>
                            </div>
                        }}
                    </List>
                )}
                {mod?.mod_config?.configuration_options !== undefined && configurationOptions.length <= 30 &&(
                    mod.mod_config.configuration_options
                        .filter((item) => item.options !== undefined)
                        .map((item) =>
                                // eslint-disable-next-line react/jsx-key
                            {
                                // 例如2928810007,2334209327都是这样的,options只有一个,而且就只是默认值,并且该项的description没有内容
                                console.log(1)
                                if (item?.options?.length === 1 && item?.options[0]?.data === item?.default && !item?.options[0]?.description) {
                                    // 在DST中,如果label为空字符串,就直接是显示空白行,这里用||会导致label为空也显示name,为了跟DST保持一样使用了??
                                    return <Divider key={generateUUID()}><span style={{
                                        fontSize: "14px",
                                        fontWeight: "600"
                                    }}>{item.label || item.name}</span></Divider>
                                }
                                // TODO 还不知道哪些mod是这样的作为标题的,我目前没有发现
                                if (item.name === 'Title' || item.name === '') {
                                    if (item.label === '') {
                                        return ""
                                    }
                                    return <Divider key={generateUUID()}><span
                                        style={{fontSize: "14px", fontWeight: "600"}}>{item.label} 配置</span></Divider>
                                }

                                let defaultValue
                                if (defaultConfigOptions.get(`${mod.modid}`) !== undefined) {
                                    defaultValue = defaultConfigOptions.get(`${mod.modid}`)[`${item.name}`]
                                } else {
                                    defaultValue = undefined
                                }
                                return <Select2 key={generateUUID()} item={item} defaultValue={defaultValue}/>;
                            }
                        )
                )}
            </Form>
        </>
    );
};

export default OptionSelect