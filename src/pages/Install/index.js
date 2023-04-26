import { Button, message, Steps,Card } from 'antd';
import { useState } from 'react';

const steps = [
    {
        title: '检测系统',
        content: <div>
            <h1>检测系统</h1>
        </div>,
    },
    {
        title: '安装饥荒',
        content: '安装饥荒',
    },
    {
        title: '额外依赖',
        content: '额外依赖',
    },
];
const App = () => {

    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    return (
        <>
        <Card>
            <Steps current={current} items={items} />
            <br/>
            <div >{steps[current].content}</div>
            <div
                style={{
                    marginTop: 24,
                }}
            >
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Previous
                    </Button>
                )}
            </div>
            </Card>
        </>
    );
};
export default App;