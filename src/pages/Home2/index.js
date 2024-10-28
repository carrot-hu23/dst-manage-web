import {Tabs} from "antd";
import {Box, Card, Container} from "@mui/material";
import {useTranslation} from "react-i18next";

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
    const { t } = useTranslation()
    const isDesktop = useResponsive('up', 'lg')
    const mod = isDesktop ? "top" : "top"
    const tabs = [
        {
            key: '1',
            label: t('ClusterIni'),
            children: <ClusterIni/>
        },
        {
            key: '3',
            label: t('Adminlist'),
            children: <NameList
                title={t('Adminlist')}
                getApi={getAdminlistApi}
                saveApi={saveAdminlistApi}
                tips={`管理员KleilD列表\n
                管理员可以在游戏内拥有管理权限，包括踢出玩家、封禁玩家、回档、使用控制台执行指令等。\n
                支持KleilD (KU_xXXXXXXx) 。
                `}/>
        },
        {
            key: '4',
            label: t('Whitelist'),
            children: <NameList
                title={t('Whitelist')}
                getApi={getWhitelistApi}
                saveApi={saveWhitelistApi}
                tips={`白名单KleilD列表\n
加入白名单的玩家将可以使用保留栏位的位置,避免其他玩家过多导致不能进入服务器。`}/>
        },
        {
            key: '5',
            label: t('Blacklist'),
            children: <NameList
                title={t('Blacklist')}
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
            <Container maxWidth="xxl">
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