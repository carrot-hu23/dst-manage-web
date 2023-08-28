import React, {useState} from "react";

import {Box, Card, Container} from "@mui/material";
import {Button, Skeleton, Steps, Segmented} from "antd";
import ClusterIni from "../Cluster/ClusterIni";
import {getAdminlistApi, saveAdminlistApi} from "../../api/8level";
import NameList from "../Cluster/NameList";

export default () => {

    const [activeSegment, setActiveSegment] = useState('设置'); // 用于存储当前选中的分段索引

    const handleSegmentChange = (value) => {
        console.log(value)
        setActiveSegment(value); // 更新选中的分段索引
    };

    return (
        <>
            <Container maxWidth="xl">
                <Card>
                    <Box sx={{p: 2}} dir="ltr">
                        <Segmented
                            onChange={handleSegmentChange} // 分段切换时的回调函数
                            block options={["设置", "森林", '洞穴', '模组', '黑白名单', '其他']}/>
                        <br/>
                        <div style={{
                            height: 400,
                            overflowY: 'auto',
                            overflowX: 'auto',
                        }}>
                            {/* 根据选中的分段索引显示对应的内容 */}
                            {activeSegment === '设置' && <div>
                                <ClusterIni/>
                            </div>}
                            {activeSegment === '森林' && <div>Content for Segment 2</div>}
                            {activeSegment === '洞穴' && <div>Content for Segment 3</div>}
                            {activeSegment === '黑白名单' && <div>
                                <NameList
                                    title={"管理员"}
                                    getApi={getAdminlistApi}
                                    saveApi={saveAdminlistApi}
                                    tips={`管理员KleilD列表\n
                管理员可以在游戏内拥有管理权限，包括踢出玩家、封禁玩家、回档、使用控制台执行指令等。\n
                支持KleilD (KU_xXXXXXXx) 。
                `}/>
                            </div>}
                        </div>
                    </Box>
                </Card>
                <br/>
                <Card>
                    <Box sx={{p: 1}} dir="ltr">
                        <Button type={'primary'} >保存</Button>
                    </Box>
                </Card>

            </Container>
        </>
    )
}