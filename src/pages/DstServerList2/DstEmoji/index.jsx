import {Space, Typography} from "antd";

import style from '../index.module.css'

const {Paragraph} = Typography;
const EmojiList = [
    {name: "faketeeth", code: "󰀆"},
    {name: "farm", code: "󰀇"},
    {name: "chester", code: "󰀃"},
    {name: "grave", code: "󰀊"},
    {name: "trophy", code: "󰀭"},
    {name: "ghost", code: "󰀉"},
    {name: "flex", code: "󰀙"},
    {name: "heart", code: "󰀍"},
    {name: "battle", code: "󰀘"},
    {name: "alchemy", code: "󰀝"},
    {name: "lightbulb", code: "󰀏"},
    {name: "hambat", code: "󰀋"},
    {name: "torch", code: "󰀛"},
    {name: "firepit", code: "󰀤"},
    {name: "fire", code: "󰀈"},
    {name: "shadow", code: "󰀩"},
    {name: "berry", code: "󰀠"},
    {name: "wave", code: "󰀮"},
    {name: "horn", code: "󰀥"},
    {name: "eyeball", code: "󰀅"},
    {name: "pig", code: "󰀐"},
    {name: "sanity", code: "󰀓"},
    {name: "beefalo", code: "󰀁"},
    {name: "salt", code: "󰀨"},
    {name: "eyeplant", code: "󰀣"},
    {name: "tophat", code: "󰀖"},
    {name: "carrot", code: "󰀡"},
    {name: "backpack", code: "󰀞"},
    {name: "redgem", code: "󰀒"},
    {name: "refine", code: "󰀧"},
    {name: "poop", code: "󰀑"},
    {name: "chest", code: "󰀂"},
    {name: "thumbsup", code: "󰀫"},
    {name: "sciencemachine", code: "󰀔"},
    {name: "beehive", code: "󰀟"},
    {name: "web", code: "󰀗"},
    {name: "gold", code: "󰀚"},
    {name: "meat", code: "󰀦"},
    {name: "shovel", code: "󰀪"},
    {name: "hammer", code: "󰀌"},
    {name: "abigail", code: "󰀜"},
    {name: "trap", code: "󰀬"},
    {name: "hunger", code: "󰀎"},
    {name: "egg", code: "󰀢"},
    {name: "arcane", code: "󰀀"},
    {name: "skull", code: "󰀕"},
    {name: "wormhole", code: "󰀯"}
];

export default () => {
    return (
        <>
            <div>
                <Space size={16} wrap>
                    {EmojiList.map(item => (
                        <>
                            <Paragraph key={item.name} className={style.icon} copyable style={{
                                fontSize: 24
                            }}>{item.code}</Paragraph>
                        </>
                    ))}
                </Space>
            </div>
        </>
    )
}