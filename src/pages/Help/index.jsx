import {Box, Card, Container} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Tabs} from "antd";
import CollapseWithMarkdown from "./CollapseWithMarkdown";
import MarkdownRender from "./MarkdownRender";


export default ()=>{

    const [markdownContent, setMarkdownContent] = useState("")
    useEffect(()=>{
        fetch('misc/FQA.md')
            .then(response => response.text())
            .then(data => {
                setMarkdownContent(data)
            })
            .catch(error => {
                console.error('无法加载config配置文件', error);
            });
    },[])

    const items = [
        {
            key: '1',
            label: "常见问题",
            children: <CollapseWithMarkdown markdownContent={markdownContent} />,
        },
        {
            key: '2',
            label: "多层世界教程",
            children: <MarkdownRender url={'misc/DontStarveMultiWorldTotorial.md'}/>,
        },
        {
            key: '3',
            label: "多台服务器串联",
            children: <MarkdownRender url={'misc/DontStarveServerMultipleMachinesSeriesTutorial.md'}/>,
        },
        {
            key: '4',
            label: "docker-compose.yml 参考",
            children: <MarkdownRender url={'misc/Docker-compose.md'}/>,
        },
    ];

    return<>
        <Container maxWidth="xxl">
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <Tabs defaultActiveKey="1" items={items}/>
                </Box>
            </Card>
        </Container>
    </>
}