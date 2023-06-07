import {Space, Typography} from 'antd';

const { Paragraph } = Typography;

// eslint-disable-next-line react/prop-types
const HomeOverView = ({home}) => (
        <>
        <div>
            <h3>{home.name}</h3>
            <span>{home.desc}</span>
            <br/>
            <br/>
            <div>
                <Space size={120}>
                    <span/>
                    <Paragraph style={{
                        color:'red'
                    }} copyable>{`c_connect("${home.__addr}", ${home.port})`}</Paragraph>
                    <span/>
                </Space>
            </div>
            <Space size={20}>
                <span>版本: {home.v}</span>
                <span>{home.mode}</span>
                <span>第{home.data.day}天</span>
                <span>{home.season}{`(${home.data.dayselapsedinseason+1}/${home.data.dayselapsedinseason + home.data.daysleftinseason})`}</span>
            </Space>
            <br/>
            <Space size={20}>
                <span>服主: {home.host}</span>
                <span>{home.intent}</span>
                <span>{home.allownewplayers?<span>允许加入</span>:<span>不允许加入</span>}</span>
                <span>{home.lanonly ?<span>lan</span>:<span>位与公网</span>}</span>
            </Space>

        </div>
        </>
    )
export default HomeOverView;