// src/components/EChartComponent.jsx
import React, { useRef, useEffect } from 'react';

import * as echarts from 'echarts';

const EChartComponent = ({ options, title, width, height }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);
        chartInstance.setOption(options);

        // Resize chart on window resize
        const handleResize = () => {
            chartInstance.resize();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chartInstance.dispose();
        };
    }, [options]);

    return (
        <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    );
};

export default EChartComponent;
