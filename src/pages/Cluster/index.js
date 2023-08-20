import {Tabs} from "antd";
import {Box, Card, Container} from "@mui/material";

import Token from "./Token";
import ClusterIni from "./ClusterIni";
import useResponsive from "../../hooks/useResponsive";
import NameList from "./NameList";
import {
    getAdminlistApi,
    getBlacklistApi,
    getWhitelistApi,
    saveAdminlistApi,
    saveBlacklistApi,
    saveWhitelistApi
} from "../../api/8level";

export default () => {

    const isDesktop = useResponsive('up', 'lg')
    const mod = isDesktop ? "top" : "top"
    const tabs = [
        {
            key: '1',
            label: `房间信息`,
            children: <ClusterIni/>
        },
        // {
        //     key: '2',
        //     label: `令 __ 牌`,
        //     children: <Token/>
        // },
        {
            key: '3',
            label: `管 理 员`,
            children: <NameList
                title={"管理员"}
                getApi={getAdminlistApi}
                saveApi={saveAdminlistApi}
                tips={`管理员KleilD列表\n
                管理员可以在游戏内拥有管理权限，包括踢出玩家、封禁玩家、回档、使用控制台执行指令等。\n
                支持KleilD (KU_xXXXXXXx) 。
                `}/>
        },
        {
            key: '4',
            label: `白 名 单`,
            children: <NameList
                title={"白名单"}
                getApi={getWhitelistApi}
                saveApi={saveWhitelistApi}
                tips={`白名单KleilD列表\n
加入白名单的玩家将可以使用保留栏位的位置,避免其他玩家过多导致不能进入服务器。`}/>
        },
        {
            key: '5',
            label: `黑 名 单`,
            children: <NameList
                title={"黑 名 单"}
                getApi={getBlacklistApi}
                saveApi={saveBlacklistApi}
                tips={`被封禁玩家列表\n
保存在该文件内的ID对应的玩家将不能加入该房间。\n
支持KleilD ( KU_xxxxxxxx )和SteamlD
(7656xXXxxXXXxxxxx)。`}/>
        },
    ]

    return (
        <>
            <Container maxWidth="xl">
                <Card >
                    <Box sx={{p: 3}} dir="ltr">
                        <Tabs
                            defaultActiveKey="1"
                            tabPosition={mod}
                            items={tabs}
                        />
                    </Box>
                </Card>
            </Container>
        </>
    )
}