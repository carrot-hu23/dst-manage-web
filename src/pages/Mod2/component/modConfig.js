/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import _ from 'lodash';
import {Modal, Button, Space, Form, Typography, Divider, message, Popconfirm, Spin, Badge} from 'antd';
import Select2 from './Select2';
import {timestampToString} from "../../../utils/dateUitls";
import {updateModApi} from "../../../api/modApi";

const {Paragraph} = Typography;

function generateUUID() {
    const cryptoObj = window.crypto || window.msCrypto;
    if (!cryptoObj) {
        console.error('Crypto API not supported.');
        return;
    }

    const buffer = new Uint8Array(16);
    cryptoObj.getRandomValues(buffer);

    // Set version (4) and variant (8, 9, a, or b) bits
    // eslint-disable-next-line no-bitwise
    buffer[6] = (buffer[6] & 0x0f) | 0x40;
    // eslint-disable-next-line no-bitwise
    buffer[8] = (buffer[8] & 0x3f) | 0x80;

    const hexCodes = Array.from(buffer)
        .map(byte => byte.toString(16).padStart(2, '0'));

    const uuid = hexCodes.join('');
    // eslint-disable-next-line consistent-return
    return `${uuid.substr(0, 8)}-${uuid.substr(8, 4)}-${uuid.substr(12, 4)}-${uuid.substr(16, 4)}-${uuid.substr(20)}`;
}

const OptionSelect = ({mod, root, setRoot, defaultValues, defaultValuesMap, setDefaultValuesMap}) => {

    const [form] = Form.useForm();
    useEffect(() => {
        const options = mod.mod_config.configuration_options;
        if (options !== undefined && options !== null) {
            const object = {};
            options.forEach((item) => {
                const {name} = item;
                const value = item.default;
                object[name] = value;
            });
            const newDefault = {};
            options.forEach((o) => {
                newDefault[o.name] = o.default;
            });
            // setDefaultValue(newDefault);
            //   console.log('init', options,object);
        }
    }, []);

    // eslint-disable-next-line no-unused-vars
    const handleFormChange = (changedValues, allValues) => {
        // console.log('Changed values:', changedValues);
        // eslint-disable-next-line no-restricted-syntax
        for (const fieldName in changedValues) {
            // eslint-disable-next-line no-prototype-builtins
            if (changedValues.hasOwnProperty(fieldName)) {
                const fieldValue = changedValues[fieldName];
                // console.log(`Field ${fieldName} changed to ${fieldValue}`);
                _.set(root, `${mod.modid}.${fieldName}`, fieldValue);

                // 同时把 默认的配置 也更新下
                const newDefaultValue = _.cloneDeep(defaultValuesMap)
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
                setDefaultValuesMap(newDefaultValue)

                console.log("defaultValuesMap: ", defaultValuesMap)
                console.log("newDefaultValue: ", newDefaultValue)
            }
        }
        const _root = _.cloneDeep(root);
        setRoot(_root);
    };

    return (
        <>
            <Form
                form={form}
                onValuesChange={handleFormChange}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
            >
                {mod.mod_config.configuration_options !== undefined &&
                    mod.mod_config.configuration_options
                        .filter((item) => item.options !== undefined)
                        .map((item,index) =>
                                // eslint-disable-next-line react/jsx-key
                            {
                                // 例如2928810007,2334209327都是这样的,options只有一个,而且就只是默认值,并且该项的description没有内容
                                if (item.options.length === 1 && item.options[0].data === item.default && !item.options[0].description) {
                                    /*                           在DST中,如果label为空字符串,就直接是显示空白行,这里用||会导致label为空也显示name,为了跟DST保持一样使用了??
                                                                                                                                     ↓                     */
                                    return <Divider key={generateUUID()}><span style={{fontSize: "14px", fontWeight: "600"}}>{item.label ?? item.name}</span></Divider>
                                }
                                // TODO 还不知道哪些mod是这样的作为标题的,我目前没有发现
                                if (item.name === 'Title' || item.name === '') {
                                    if (item.label === '') {
                                        return ""
                                    }
                                    return <Divider key={generateUUID()} ><span style={{fontSize: "14px", fontWeight: "600"}}>{item.label} 配置</span></Divider>
                                    // return <h4 key={item.label}>{item.label} 配置</h4>;
                                }

                                let defaultValue
                                if (defaultValuesMap.get(`${mod.modid}`) !== undefined) {
                                    defaultValue = defaultValuesMap.get(`${mod.modid}`)[`${item.name}`]
                                } else {
                                    defaultValue = undefined
                                }
                                // console.log("1111111: ",defaultValuesMap, mod.modid, defaultValuesMap.get(`${mod.modid}`), item.name)

                                return <Select2 key={generateUUID()} item={item}
                                                defaultValue={defaultValue}/>;
                            }
                        )}
            </Form>
        </>
    );
};

// eslint-disable-next-line react/prop-types
const ModDetail = ({mod, setMod, setModList, root, setRoot, defaultValues, defaultValuesMap, setDefaultValuesMap}) => {
    const { t } = useTranslation()

    const [open, setOpen] = useState(false);
    const [ellipsis, setEllipsis] = useState(true);
    const [spinning,setSpinning] = useState(false)

    function updateMod() {
        setSpinning(true)
        updateModApi("", mod.modid)
            .then(resp=>{
                if (resp.code === 200) {
                    const newMod = resp.data
                    newMod.installed = true
                    setModList(current=>{
                        let index = 0;
                        // eslint-disable-next-line no-plusplus
                        for (let i = 0; i < current.length; i++) {
                            if (current[i].modid === newMod.modid) {
                                index = i
                                if (current.enable) {
                                    newMod.enable = true
                                }
                            }
                        }
                        current[index] = newMod
                        console.log(current)
                        return [...current]
                    })
                    setMod(newMod)
                    setSpinning(false)
                    message.success("更新成功")
                }
            })
    }

    return (
        <>
        <div
            style={{
                height: '335px',
                overflowY: 'auto',
                overflowX: 'auto',
            }}
        >
            {mod?.installed && mod?.mod_config !== undefined && mod?.mod_config !== null && <>
                <Spin spinning={spinning} tip={"正在更新模组"} >
                <Space size={16} wrap>
                    <img alt="example" src={mod?.img}/>
                    <div>
                            <span style={{
                                fontSize: '16px',
                                fontWeight: 500
                            }}>{mod?.name.slice(0, 20)}</span>
                        <br/>
                        <span>{t('modid')}:{mod?.modid}</span>
                        <br/>
                        <span>{t('author')}: { mod?.mod_config?.author !== undefined ? mod?.mod_config?.author.slice(0, 20) : ""}</span>
                    </div>
                    <div>
                        <span>{t('version')}: {mod?.mod_config?.version}</span>
                        <div>{t('last time')}: {timestampToString(mod.last_time* 1000)}</div>
                        <span>{mod?.mod_config?.dont_starve_compatible === true && <span>饥荒联机版兼容</span>}</span>
                        <span>{mod?.mod_config?.dont_starve_compatible === false && <span>-</span>}</span>
                    </div>
                </Space>
                <div>
                    <br/>
                    <Paragraph
                        getContainer={false}
                        ellipsis={
                            ellipsis
                                ? {
                                    rows: 4,
                                    expandable: true,
                                    symbol: 'more',
                                }
                                : false
                        }
                    >
                        {mod?.mod_config?.description}
                    </Paragraph>

                    <br/>

                </div>

                <Modal
                    getContainer={document.body}
                    title={`${mod?.name} 配置`}
                    // centered
                    open={open}
                    onOk={() => {
                        setOpen(false);
                    }}
                    onCancel={() => setOpen(false)}
                    width={640}
                    destroyOnClose
                    footer={null}
                >
                    <div className={'scrollbar'} style={{
                        height: '386px',
                        overflowY: 'auto',
                        overflowX: 'auto'
                    }}>
                        {mod?.mod_config?.configuration_options !== undefined && (
                            <OptionSelect mod={mod} root={root} setRoot={setRoot} defaultValues={defaultValues}
                                          defaultValuesMap={defaultValuesMap}
                                          setDefaultValuesMap={setDefaultValuesMap}
                            />
                        )}
                        {mod?.mod_config?.configuration_options === undefined && mod?.mod_config?.author === undefined &&<>
                            <br/>
                            <br/>
                            <span>网络问题!!! 下模组失败</span>
                            <br/>
                            <span>点击 更新 按钮重新下载</span>
                            <br/>
                            <span>如果多次更新依旧没有配置，请先加此mod加入到你的模组配置文件里面</span>
                            <br/>
                            <span>然后在启动房间，等待房间mod下载完成后，在点击 更新 按钮就会有配置选项</span>
                        </>}
                        {mod?.mod_config?.configuration_options === undefined && mod?.mod_config?.author !== undefined &&<>
                            <br/>
                            <br/>
                            <span>{t('this mod dont have configuration options')}</span>
                        </>}
                    </div>

                </Modal>
                </Spin>
            </>}
            {!mod.installed && <>
                <span>{t('none mod')}</span>
            </>}

        </div>
            <Space size={16}>
                <Button type="primary" onClick={() => setOpen(true)}>
                    {t('options')}
                </Button>
                <Popconfirm
                    title={t('update mode configuration options')}
                    okText="Yes"
                    cancelText="No"
                    onConfirm={()=>updateMod()}
                >
                    {mod.update && <Badge dot>
                        <Button style={{
                            backgroundColor: "#149b6e"
                        }} type="primary" >
                            {t('Update Configuration')}
                        </Button>
                    </Badge>}
                    {!mod.update && <Button type="primary" >
                        {t('Update Configuration')}
                    </Button>}
                </Popconfirm>
                <Button>
                    <a
                        target={'_blank'}
                        href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.modid}`}
                        rel="noreferrer"
                    >
                        {t('workshop')}
                    </a>
                </Button>
            </Space>
        </>
    );
};

export default ModDetail;
