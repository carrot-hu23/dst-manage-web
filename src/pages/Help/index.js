import {Container} from '@mui/material';
import {useEffect, useState} from "react";

const Help = () => {

    const [config, setConfig] = useState({
        version: "0"
    })
    useEffect(() => {
        fetch('config.json')
            .then(response => response.json())
            .then(data => {
                setConfig(data)
            })
            .catch(error => {
                console.error('无法加载config配置文件', error);
            });
    }, [])

    return (
        <Container maxWidth="xl">
            <h1>帮助文档</h1>
            {config.version}
        </Container>
    )
}

export default Help