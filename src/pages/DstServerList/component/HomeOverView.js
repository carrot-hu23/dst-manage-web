// import { Image, List } from 'antd';

// eslint-disable-next-line react/prop-types
const HomeOverView = ({home}) => (
        <>
        <div>
            {home.name}
            <br/>
            {home.desc}
            <br/>
            当前天数: {home.data.day} 天
        </div>
        </>
    )
export default HomeOverView;