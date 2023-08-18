import {Button, Image, List, message, Tooltip} from 'antd';
import {useState} from "react";
import {getModInfo} from "../../../api/modApi";

const data = [
    [
        "workshop-1595631294",
        "Smart Minisign",
        "1.1.5",
        "1.1.5",
        true
    ]
]

// eslint-disable-next-line react/prop-types
const HomeModInfo = ({mods, subscribedModList, setSubscribedModList}) => {

    const [messageApi, contextHolder] = message.useMessage();

    // eslint-disable-next-line react/prop-types
    const SubScribeBTN = ({item, subscribedModList, setSubscribedModList}) => {

        const [loading, setLoading] = useState(false)

        const subscribe = (modId, modName) => {
            console.log(modId, modName)
            messageApi.open({
                type: 'loading',
                content: `正在订阅 ${modName}`,
                duration: 0,
            });
            setLoading(true)
            // message.info(`正在订阅 ${modName}`)
            getModInfo("", modId).then(resp => {
                if (resp.code === 200) {
                    resp.data.installed = true
                    // Dismiss manually and asynchronously
                    setSubscribedModList(current => [...current, resp.code])
                    setTimeout(messageApi.destroy, 1);
                    message.success(`订阅 ${modName} 成功`)
                    setLoading(false)

                }

            }).catch(error => {
                setTimeout(messageApi.destroy, 1);
                message.success(`获取 ${modName} 失败`)
                setLoading(false)
                console.log(error)
            })
        }

        const isSubscribed = (modid) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const mod of subscribedModList) {
                if (mod.modid === modid) {
                    return true
                }
            }
            return false
        }

        return (
            <>
                {isSubscribed(item[0].replace("workshop-", "")) && (<div>
                    <Button size={'small'}>已订阅</Button>
                </div>)}
                {!isSubscribed(item[0].replace("workshop-", "")) && (<div>
                    <Button
                        loading={loading}
                        type="primary"
                        size={'small'}
                        onClick={() => {
                            subscribe(item[0].replace("workshop-", ""), item[1])
                        }}>
                        订阅
                    </Button>
                </div>)}

            </>
        )
    }

    return (
        <>
            {contextHolder}
            <div style={{
                height: 450,
                overflowY: 'auto',
            }}>
                <List
                    itemLayout="horizontal"
                    dataSource={mods || data}
                    renderItem={(item) => (
                        <List.Item
                            actions={
                                [<a
                                    target={'_blank'}
                                    href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${item[0].substr(9)}`}
                                    key="list-loadmore-edit"
                                    style={{
                                        background: 'url(https://dst.liuyh.com/static/img/dstui/icon_button_normal.png)'
                                    }} rel="noreferrer">
                                    <Tooltip title="点击进入订阅页">
                                        <Image preview={false} width={22}
                                               src={'https://dst.liuyh.com/static/img/dstui/icon/update.png'}/>
                                    </Tooltip>
                                </a>,
                                    // eslint-disable-next-line react/jsx-key
                                    <div>{item[4] ?
                                        <Tooltip title="必须安装才能进入">
                                            <Image preview={false} width={22}
                                                   src={'https://dst.liuyh.com/static/img/dstui/icon/apply_skins.png'}/>
                                        </Tooltip> : ''}</div>,

                                    <SubScribeBTN item={item}
                                                  subscribedModList={subscribedModList}
                                                  setSubscribedModList={setSubscribedModList}
                                    />
                                ]}>

                            <List.Item.Meta
                                // avatar={<Image preview={false} width={36.8} src={dstRoles[item.prefab] || dstRoles['mod']} />}
                                description={<div style={{
                                    color: `#${item.colour}`,
                                    marginTop: '4px',
                                    fontSize: 16
                                }}>{item[1]}</div>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </>)
}
export default HomeModInfo;