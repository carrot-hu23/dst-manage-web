import { Image, List } from 'antd';

import { dstRoles } from '../../../utils/dst';

const data = [
    {
        "eventlevel": 0,
        "name": "wanda",
        "netid": "",
        "prefab": "wanda",
        "colour": "FFA54F"
    },
]

// eslint-disable-next-line react/prop-types
const Players = ({ players }) => (
    <>
        <div style={{
            height: 400,
            overflowY: 'auto',
        }}>
            <List
                itemLayout="horizontal"
                dataSource={players || data}
                renderItem={(item) => (
                    <List.Item
                        actions={
                            [<a
                                target={'_blank'}
                                href={`https://steamcommunity.com/profiles/${item.netid}`} key="list-loadmore-edit"
                                style={{
                                    background: 'url(https://dst.liuyh.com/static/img/dstui/icon_button_normal.png)'
                                }} rel="noreferrer">
                                <Image preview={false} width={22} src={'https://dst.liuyh.com/static/img/dstui/icon/steam_btn.png'} />
                            </a>]}>

                        <List.Item.Meta
                            avatar={<Image preview={false} width={36.8} src={dstRoles[item.prefab] || dstRoles.mod} />}
                            description={<div style={{
                                color: `#${item.colour}`,
                                marginTop: '4px',
                                fontSize: 16
                            }}>{item.name}</div>}
                        />
                    </List.Item>
                )}
            />
        </div>
    </>
)
export default Players;