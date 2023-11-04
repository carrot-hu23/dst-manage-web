import {Form, Space, Typography} from 'antd';

import style from "../index.module.css"

const {Paragraph} = Typography;

// eslint-disable-next-line react/prop-types
const HomeOverView = ({home}) => {
    console.log("==========",home.home)
    if (home.DaysInfo === undefined || home.DaysInfo === null) {
        home.DaysInfo = {}
    }
    return (
        <>
            <div style={{
                height: 450,
                overflowY: 'auto',
            }}>
                <h3 className={style.icon}>{home.Name}</h3>
                <span>{home.Desc}</span>
                <br/>
                <br/>
                <Form>
                    <Space>
                        <div>
                            <Form.Item label="世界直连">
                                <Paragraph style={{
                                    color: '#4096ff'
                                }} copyable>{`c_connect("${home.Address}", ${home.Port})`}</Paragraph>
                            </Form.Item>

                            <Form.Item label="版本">
                                <span>{home.Version}</span>
                            </Form.Item>

                            <Form.Item label="天数">
                                <span>{home.DaysInfo.Day}</span>
                            </Form.Item>

                            <Form.Item label="季节">
                                <span>{home.Season}{`(${home.DaysInfo.DaysElapsedInSeason + 1}/${home.DaysInfo.DaysElapsedInSeason + home.DaysInfo.DaysLeftInSeason})`}</span>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item label="服主">
                                <span>{home.Host}</span>
                            </Form.Item>
                            <Form.Item label="模式">
                                <span>{home.Intent}</span>
                            </Form.Item>
                            <Form.Item label="加入">
                                <span>{home.Allownewplayers ? <span>允许加入</span> : <span>不允许加入</span>}</span>
                            </Form.Item>
                            <Form.Item label="公网">
                                <span>{home.Lanonly ? <span>lan</span> : <span>位与公网</span>}</span>
                            </Form.Item>
                        </div>
                    </Space>
                </Form>

            </div>
        </>
    )
}
export default HomeOverView;