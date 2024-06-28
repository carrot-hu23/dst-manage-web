import {Box, Card, Container} from "@mui/material";
import React, {useEffect, useState} from "react";
import CollapseWithMarkdown from "./CollapseWithMarkdown";

export default ()=>{

    const [markdownContent, setMarkdownContent] = useState("")
    useEffect(()=>{
        fetch('misc/FQA.md')
            .then(response => response.text())
            .then(data => {
                console.log(data)
                setMarkdownContent(data)
            })
            .catch(error => {
                console.error('无法加载config配置文件', error);
            });
    },[])

    return<>
        <Container maxWidth="xxl">
            <Card>
                <Box sx={{p: 3}} dir="ltr">
                    <h4>帮助文档</h4>

                    <div>
                        <CollapseWithMarkdown markdownContent={markdownContent} />
                    </div>
                </Box>
            </Card>
        </Container>
    </>
}