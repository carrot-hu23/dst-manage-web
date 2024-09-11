import {Col, Row, Statistic} from "antd";
import {Card, Box} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";

import {countActivePlayers} from "../../api/statisticsApi";

export default () => {
    const {cluster} = useParams()

    const [thisDayUsers, setThisDayUsers] = useState(0);
    const [thisMonthUsers, setThisMonthUsers] = useState(0);

    useEffect(()=>{

        countActivePlayers(cluster, "DAY", dayjs().startOf('day').valueOf(), dayjs().endOf('day').valueOf())
            .then(response => {
                const {data} = response
                if (data.data.y1 !== null && data.data.y1 !== undefined) {
                    const sum = data.data.y1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                    setThisDayUsers(sum)
                }

            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    useEffect(()=>{
        countActivePlayers(cluster, "DAY", dayjs().startOf('month').valueOf(), dayjs().endOf('month').valueOf())
            .then(response => {
                const {data} = response
                if (data.data.y1 !== null && data.data.y1 !== undefined) {
                    const sum = data.data.y1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                    setThisMonthUsers(sum)
                }

            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Card>
                        <Box sx={{p: 2}} dir="ltr">
                            <Statistic
                                title="今日在线人数"
                                value={thisDayUsers}
                                precision={0}
                                valueStyle={{
                                    color: '#2784ff',
                                }}
                            />
                        </Box>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Box sx={{p: 2}} dir="ltr">
                            <Statistic
                                title="本月在线人数"
                                value={thisMonthUsers}
                                precision={0}
                                valueStyle={{
                                    color: '#edc82d',
                                }}
                            />
                        </Box>
                    </Card>
                </Col>
            </Row>
        </>
    )
}