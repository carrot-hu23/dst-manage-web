import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {message, Skeleton} from "antd";
import { Container, Card, Box } from '@mui/material';

import Mod from "../Mod";
import {getHomeConfigApi} from "../../api/gameApi";

export default () => {
    const {cluster} = useParams()
    const [clusterData, setClusterData] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        getHomeConfigApi(cluster)
            .then(data => {
                if (data.data === null) {
                    message.error('获取房间配置失败')
                } else {
                    setClusterData(data.data)
                    console.log(data.data.modData)
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.error('无法加载配置文件', error);
            });

    }, [])

    return (
        <>
            <Skeleton loading={loading} active avatar>
                <Container maxWidth="xl">
                    <Card>
                        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                            <Mod modoverrides={clusterData.modData}/>
                        </Box>
                    </Card>
                </Container>
            </Skeleton>
        </>
    )
}