import { Space, Tag, Typography } from 'antd';
import {Box, Card} from "@mui/material";
import React from "react";
import RemoteControl from "../GameOperator/RemoteControl";

const { Paragraph, Link } = Typography;

const ControlPanel = ({levels}) => {

    return (
        <Card>
            <Box sx={{p: 3}} dir="ltr">
                <RemoteControl levels={levels} />
                <br/>
                <div>
                    <Space size={[4, 16]} wrap >
                        <span>tips: 在发送带有""指令时，请加上\反斜杠。例如：UserToPlayer("Ku-xx") 需要写成 UserToPlayer(\"Ku-xx\")</span>
                        <Tag color="magenta">强制存档<Paragraph className='copy' copyable>c_save()</Paragraph></Tag>
                        <Tag color="red">重新加载世界<Paragraph className='copy' copyable>c_reset()</Paragraph></Tag>
                        <Tag color="red">回档天数<Paragraph className='copy' copyable>c_rollback(count)</Paragraph></Tag>
                        <Tag color="green">宣告<Paragraph className='copy' copyable> c_announce(\" \")</Paragraph></Tag>

                        <Link href="https://dontstarve.fandom.com/zh/wiki/%E6%8E%A7%E5%88%B6%E5%8F%B0/%E9%A5%A5%E8%8D%92%E8%81%94%E6%9C%BA%E7%89%88%E4%B8%AD%E7%9A%84%E5%91%BD%E4%BB%A4?variant=zh" target="_blank">
                            更多指令参考
                        </Link>
                    </Space>
                </div>
            </Box>
        </Card>
    );
};
export default ControlPanel;