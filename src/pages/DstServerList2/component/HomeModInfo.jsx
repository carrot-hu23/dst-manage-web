import {Image, List, Tooltip} from 'antd';

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
const HomeModInfo = ({mods}) => {

    return (
        <>
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
                                [<span>
                                    v:{item.NewVersion}
                                </span>,
                                    <a
                                    target={'_blank'}
                                    href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${item.Id}`}
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
                                    <div>{item.IsClientDownload ?
                                        <Tooltip title="必须安装才能进入">
                                            <Image preview={false} width={22}
                                                   src={'https://dst.liuyh.com/static/img/dstui/icon/apply_skins.png'}/>
                                        </Tooltip> : ''}</div>,
                                ]}>

                            <List.Item.Meta
                                // avatar={<Image preview={false} width={36.8} src={dstRoles[item.prefab] || dstRoles['mod']} />}
                                description={<div style={{
                                    color: `#${item.colour}`,
                                    marginTop: '4px',
                                    fontSize: 16
                                }}>{item.Name}</div>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </>)
}
export default HomeModInfo;