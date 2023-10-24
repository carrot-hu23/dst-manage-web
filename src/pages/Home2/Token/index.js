import React, {useRef} from 'react';
import {Button, Input} from 'antd';
import {Grid, Typography} from "@mui/material";

const {TextArea} = Input;

export default () => {

    const tokenRef = useRef("")

    return (
        <>
            <Typography variant="h6" sx={{mb: 4}}>
                令牌
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={8}>
                    <TextArea ref={tokenRef} rows={4} allowClear/>
                    <br/><br/>
                    <Button type={'primary'}>保存</Button>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                <span>
                服务器令牌
                    <br/><br/>
                维持服务器独立运行的凭证，符合要求的令牌才可以开启服务器。
                     <br/><br/>
                创建令牌的玩家将自动成为使用该令牌开启的服务器的管理员。
                     <br/><br/>
                获取方法可自行百度。
                </span>
                </Grid>
            </Grid>
        </>
    )
}