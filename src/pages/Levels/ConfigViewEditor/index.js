/* eslint-disable react/prop-types */
import React, {useEffect, useState} from "react";
import {Alert, message, Select, Skeleton, Space, Tabs} from "antd";
import {parse,format} from "lua-json";

import './index.css'

function getLevelObject(value) {
    value = value.replace(/\n/g, "")
    try {
        return parse(value)
    } catch (error) {
        message.warning("lua配置解析错误")
        console.log(error)
        return {}
    }
}

export default ({valueRef, dstWorldSetting, changeValue}) => {

    const levelObject = getLevelObject(valueRef.current)
    const levelType = levelObject.location
    // 获取用户默认值
    const [leveldataoverrideObject, setLeveldataoverrideObject] = useState(levelObject.overrides)

    // 获取世界默认值
    const forestWorldGenGroup = dstWorldSetting.zh.forest.WORLDGEN_GROUP
    const forestWorldSettingsGroup = dstWorldSetting.zh.forest.WORLDSETTINGS_GROUP
    const cavesWorldGenGroup = dstWorldSetting.zh.cave.WORLDGEN_GROUP
    const cavesWorldSettingsGroup = dstWorldSetting.zh.cave.WORLDSETTINGS_GROUP

    useEffect(()=>{
        const levelObject = getLevelObject(valueRef.current)
        setLeveldataoverrideObject(levelObject.overrides)
    }, [valueRef.current])

    const [loading, setLoading] = useState(true)
    const [porklandSetting, setPorklandSetting] = useState()

    useEffect(()=>{
        if (getLevelObject(valueRef.current).location === 'porkland') {
            setLoading(true)
            // 获取 哈姆雷特的配置项
            fetch('./misc/porkland_setting.json')
                .then(response => response.json())
                .then(data => {
                    setPorklandSetting(data)
                })
                .catch(error => {
                    console.error('无法加载配置文件', error);
                }).finally(()=>{
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [])

    const porklandItems = [
        {
            label: '世界配置',
            children: <div>
                <h2>世界设置</h2>
                <Group
                    valueRef={valueRef}
                    data={porklandSetting?.WORLDSETTINGS_GROUP}
                    url={"./misc/customization_porkland.webp"}
                    leveldataoverrideObject={leveldataoverrideObject}
                    onStateChange={(name, newValue) => {
                        setLeveldataoverrideObject(current=> {
                            current[name]=newValue
                            return {...current}
                        })
                    }}
                    changeValue={changeValue}
                    type={'porkland'}
                />
            </div>,
            key: '1'
        },
        {
            label: '世界生成',
            children: <div>
                <h2>世界生成</h2>
                <Group
                    valueRef={valueRef}
                    data={porklandSetting?.WORLDGEN_GROUP}
                    url={"./misc/customization_porkland.webp"}
                    leveldataoverrideObject={leveldataoverrideObject}
                    onStateChange={(name, newValue) => {
                        setLeveldataoverrideObject(current=> {
                            current[name]=newValue
                            return {...current}
                        })
                    }}
                    changeValue={changeValue}
                    type={'porkland'}
                />
            </div>,
            key: '2'
        }
    ]

    const forestItems = [
        {
            label: '世界配置',
            children: <div>
                <h2>世界设置</h2>
                <Group
                    valueRef={valueRef}
                    data={forestWorldSettingsGroup}
                    url={"./misc/worldsettings_customization.webp"}
                    leveldataoverrideObject={leveldataoverrideObject}
                    onStateChange={(name, newValue) => {
                        setLeveldataoverrideObject(current=> {
                            current[name]=newValue
                            return {...current}
                        })
                    }}
                    changeValue={changeValue}
                />
            </div>,
            key: '1'
        },
        {
            label: '世界生成',
            children: <div>
                <h2>世界生成</h2>
                <Group
                    valueRef={valueRef}
                    data={forestWorldGenGroup}
                    url={"./misc/worldgen_customization.webp"}
                    leveldataoverrideObject={leveldataoverrideObject}
                    onStateChange={(name, newValue) => {
                        setLeveldataoverrideObject(current=> {
                            current[name]=newValue
                            return {...current}
                        })
                    }}
                    changeValue={changeValue}
                />
            </div>,
            key: '2'
        }
    ]

    const caveItems = [
        {
            label: '世界配置',
            children: <div>
                <h2>世界设置</h2>
                <Group
                    valueRef={valueRef}
                    data={cavesWorldSettingsGroup}
                    url={"./misc/worldsettings_customization.webp"}
                    leveldataoverrideObject={leveldataoverrideObject}
                    onStateChange={(name, newValue) => {
                        setLeveldataoverrideObject(current=> {
                            current[name]=newValue
                            return {...current}
                        })
                    }}
                    changeValue={changeValue}
                />
            </div>,
            key: 3,
        },
        {
            label: '世界生成',
            children: <div>
                <h2>世界生成</h2>
                <Group
                    valueRef={valueRef}
                    data={cavesWorldGenGroup}
                    url={"./misc/worldgen_customization.webp"}
                    leveldataoverrideObject={leveldataoverrideObject}
                    onStateChange={(name, newValue) => {
                        setLeveldataoverrideObject(current=> {
                            current[name]=newValue
                            return {...current}
                        })
                    }}
                    changeValue={changeValue}
                />
            </div>,
            key: 4,
        },
    ]

    return (
        <>
            <div className={'scrollbar'} style={{
                "height": "40vh",
                overflowY: 'auto',
            }}>
                {levelType === 'forest' && (<>
                        <Tabs items={forestItems} />
                    </>
                )}
                {levelType === 'cave' && (<>
                        <Tabs items={caveItems} />
                    </>
                )}
                {levelType === 'porkland' &&(<>
                   <Skeleton loading={loading}>
                       <Tabs items={porklandItems} />
                   </Skeleton>
                </>)}
                {(levelType !== 'forest' && levelType !== 'cave' && levelType !== 'porkland') && (<>
                    <Alert style={{
                        marginBottom: '4px'
                    }} message={`暂不支持此类型世界配置文件可视化 ${levelType}`} type="info" showIcon closable />
                    <br/>
                    <Alert style={{
                        marginBottom: '4px'
                    }} message={`或者世界配置为空，请先填写世界配置`} type="info" showIcon closable />
                </>)}

            </div>
        </>
    )
}

const Group = ({valueRef, data, url, leveldataoverrideObject, onStateChange, changeValue, type}) => {

    function getWebp(key, key2) {
        if (type === 'porkland' && (key === 'survivors' || key === 'global'))  {
            return './misc/worldsettings_customization.webp'
        }
        const list = [
            'task_set','boons','rock',  'mushroom', 'weather',
        ]
        if (type === 'porkland' && list.includes(key2))  {
            return './misc/worldgen_customization.webp'
        }
        return url
    }


    return (<>
        {Object.keys(data)
            .sort((a, b) => data[a].order - data[b].order)
            .map(key =>
                <div key={key}>
                    <h3>{data[key].text}</h3>
                    <Space size={[32, 8]} wrap>
                        {Object.entries(data[key].items)
                            .map(([key2, value]) =>
                                // 可以在回调函数内对 value 进行操作
                                <Space key={key2} align="center" size={'middle'}>
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        backgroundImage: `url(${getWebp(key, key2)})`,
                                        backgroundPosition: `-${Math.round(value.image.x * data[key].atlas.width / data[key].atlas.item_size) * 100}% -${Math.round(value.image.y * data[key].atlas.height / data[key].atlas.item_size) * 100}%`
                                    }}/>
                                    <div>
                                        <span>{value.text}</span>
                                        <Item
                                            options={
                                                ((value.desc !== undefined &&
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
                                            currentValue={leveldataoverrideObject[key2]}
                                            defaultValue={value.value}
                                            name={key2}
                                            valueRef={valueRef}
                                            onStateChange={onStateChange}
                                            changeValue={changeValue}
                                        />
                                    </div>
                                </Space>)
                        }
                    </Space>
                </div>
            )}
    </>)
}

const Item = ({currentValue, defaultValue, options, name, valueRef,onStateChange, changeValue}) => {
    const [isDefault, setIsDefault] = useState(true);

    useEffect(() => {
        if (currentValue !== defaultValue) {
            setIsDefault(false)
        }
    }, [])

    function handleChange(value) {
        try {
            setIsDefault(value === defaultValue);
            console.log("value: ", value, "name: ", name)

            const data = parse(valueRef.current.replace(/\n/g, ""))
            data.overrides[name] = value

            onStateChange(name, value)
            // valueRef.current = format(data)
            changeValue(format(data))
        } catch (error) {
            message.warning("lua配置解析错误")
        }
    }

    const selectClassName = isDefault ? "" : "selected";
    return (
        <>
            <div>
                <Select
                    style={{
                        width: 120,
                    }}
                    value={currentValue}
                    defaultValue={defaultValue}
                    onChange={(value) => {
                        handleChange(value)
                    }}
                    className={selectClassName}
                    options={options}
                />
            </div>
        </>
    )
}