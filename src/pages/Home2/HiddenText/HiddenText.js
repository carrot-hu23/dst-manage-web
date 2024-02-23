import React, { useState } from 'react';
import {Space, Typography} from 'antd';
import { EyeTwoTone, EyeInvisibleTwoTone } from '@ant-design/icons';

const { Paragraph } = Typography;

function HiddenText({ text }) {
    const [hidden, setHidden] = useState(true);

    const handleToggle = () => {
        setHidden(!hidden);
    };

    return (
        <div className={'dst'}>
            <Space size={8}>
                <Paragraph copyable={!hidden}>
                    {hidden ? '******' : text}
                </Paragraph>
                {hidden ? <EyeInvisibleTwoTone  onClick={handleToggle} /> : <EyeTwoTone  onClick={handleToggle} />}
            </Space>
        </div>
    );
}

export default HiddenText;