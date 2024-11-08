import {Box, Card, CardHeader} from "@mui/material";

import EChartComponent from "@/pages/Chart/EChartComponent";
import {useTheme} from "@/hooks/useTheme";

export default ({chartData, title}) => {

    const t = useTheme()

    const data = chartData.map(item => ({
        name: item.label,
        value: item.value
    }))
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '2%',
            left: 'left',
            color: t.theme === 'dark' ? '#141414' : '#fff'
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: t.theme === 'dark' ? '#141414' : '#fff',
                    borderWidth: 2,
                },
                label: {
                    show: true,
                    position: 'center',
                    color: t.theme !== 'dark' ? '#141414' : '#fff'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold',
                    }
                },
                // labelLine: {
                //     show: false
                // },
                data: data
            }
        ]
    };


    return (<div>
        <Card>
            <CardHeader title={title}/>
            <Box sx={{p: 0.6}} dir="ltr">
                <EChartComponent options={option} />
            </Box>
        </Card>
    </div>)
}